using MySql.Data.MySqlClient;
using NotaliseAPI.Models;

namespace NotaliseAPI.Repository;

public interface IRepositorio
{
    User? GetUserByEmailAndPassword(string email, string password);
}

public class Repositorio : IRepositorio
{
    // talvez cause problema ? usuário padrão ? senha padrão ? 
    // database sendo eventsdb para todos

string connectionString = "server=localhost;database=notalise;user=root;password=JohnGalt24!";

    private bool HasColumn(MySqlDataReader reader, string columnName)
    {
        try
        {
            return reader.GetOrdinal(columnName) >= 0;
        }
        catch (IndexOutOfRangeException)
        {
            return false;
        }
    }

    //parte referente ao evento criado tipo inovaweek
    public void CreateEvent(Event ev)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = @"INSERT INTO Event (Name, Subtitle, Address, Manager, Description, Score, Image, Genres, Format, ContentRating, Copyright, DaysID)
                         VALUES (@name, @subtitle, @address, @manager, @description, @score, @image, @genres, @format, @contentRating, @copyright, @daysID)";

        using var cmd = new MySqlCommand(query, conn);

        cmd.Parameters.AddWithValue("@name", ev.Name ?? "");
        cmd.Parameters.AddWithValue("@subtitle", ev.Subtitle ?? "");
        cmd.Parameters.AddWithValue("@address", ev.Address ?? "");
        cmd.Parameters.AddWithValue("@manager", ev.Manager > 0 ? ev.Manager : 1);
        cmd.Parameters.AddWithValue("@description", ev.Description);
        cmd.Parameters.AddWithValue("@score", ev.Score);
        cmd.Parameters.AddWithValue("@image", ev.Image);
        cmd.Parameters.AddWithValue("@genres", System.Text.Json.JsonSerializer.Serialize(ev.Genres ?? Array.Empty<string>()));
        cmd.Parameters.AddWithValue("@format", System.Text.Json.JsonSerializer.Serialize(ev.Format ?? Array.Empty<string>()));
        cmd.Parameters.AddWithValue("@contentRating", ev.ContentRating ?? "Livre para todos os públicos");
        cmd.Parameters.AddWithValue("@copyright", ev.Copyright ?? "");
        cmd.Parameters.AddWithValue("@daysID", ev.DaysID > 0 ? ev.DaysID : 1);

        cmd.ExecuteNonQuery();
    }

    public void UpdateEvent(Event ev)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = @"UPDATE Event 
                         SET Name=@name, Subtitle=@subtitle, Address=@address, Manager=@manager, Description=@description, Score=@score, Image=@image, Genres=@genres, Format=@format, ContentRating=@contentRating, Copyright=@copyright, DaysID=@daysID
                         WHERE Id=@id";

        using var cmd = new MySqlCommand(query, conn);

        cmd.Parameters.AddWithValue("@id", ev.Id);
        cmd.Parameters.AddWithValue("@name", ev.Name ?? "");
        cmd.Parameters.AddWithValue("@subtitle", ev.Subtitle ?? "");
        cmd.Parameters.AddWithValue("@address", ev.Address ?? "");
        cmd.Parameters.AddWithValue("@manager", ev.Manager > 0 ? ev.Manager : 1);
        cmd.Parameters.AddWithValue("@description", ev.Description);
        cmd.Parameters.AddWithValue("@score", ev.Score);
        cmd.Parameters.AddWithValue("@image", ev.Image);
        cmd.Parameters.AddWithValue("@genres", System.Text.Json.JsonSerializer.Serialize(ev.Genres ?? Array.Empty<string>()));
        cmd.Parameters.AddWithValue("@format", System.Text.Json.JsonSerializer.Serialize(ev.Format ?? Array.Empty<string>()));
        cmd.Parameters.AddWithValue("@contentRating", ev.ContentRating ?? "Livre para todos os públicos");
        cmd.Parameters.AddWithValue("@copyright", ev.Copyright ?? "");
        cmd.Parameters.AddWithValue("@daysID", ev.DaysID > 0 ? ev.DaysID : 1);

        cmd.ExecuteNonQuery();
    }

    // feito o método DELETE
    public List<Event> GetEvents()
    {
        var lista = new List<Event>();

        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "SELECT * FROM Event";

        using var cmd = new MySqlCommand(query, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            lista.Add(new Event
            {
                Id = reader.GetInt32("Id"),
                Name = reader.GetString("Name"),
                Subtitle = HasColumn(reader, "Subtitle") && !reader.IsDBNull(reader.GetOrdinal("Subtitle")) ? reader.GetString("Subtitle") : "",
                Address = reader.IsDBNull(reader.GetOrdinal("Address")) ? "" : reader.GetString("Address"),
                Manager = reader.IsDBNull(reader.GetOrdinal("Manager")) ? 0 : reader.GetInt32("Manager"),
                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString("Description"),
                Image = reader.IsDBNull(reader.GetOrdinal("Image")) ? null : reader.GetString("Image"),
                Score = reader.IsDBNull(reader.GetOrdinal("Score")) ? 0 : Convert.ToSingle(reader["Score"]),
                Genres = reader.IsDBNull(reader.GetOrdinal("Genres")) ? Array.Empty<string>() : System.Text.Json.JsonSerializer.Deserialize<string[]>(reader.GetString("Genres")),
                Format = reader.IsDBNull(reader.GetOrdinal("Format")) ? Array.Empty<string>() : System.Text.Json.JsonSerializer.Deserialize<string[]>(reader.GetString("Format")),
                ContentRating = reader.IsDBNull(reader.GetOrdinal("ContentRating")) ? "" : reader.GetString("ContentRating"),
                Copyright = reader.IsDBNull(reader.GetOrdinal("Copyright")) ? "" : reader.GetString("Copyright"),
                DaysID = reader.IsDBNull(reader.GetOrdinal("DaysID")) ? 0 : reader.GetInt32("DaysID")
            });
        }

        return lista;
    }


    public void DeleteEvent(int id)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "DELETE FROM Event WHERE Id = @id";

        using var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@id", id);

        cmd.ExecuteNonQuery();
    }

    // feito o método READ
    public Event? GetEventById(int id)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "SELECT * FROM Event WHERE Id=@id";

        using var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Event
            {
                Id = reader.GetInt32("Id"),
                Name = reader.GetString("Name"),
                Subtitle = HasColumn(reader, "Subtitle") && !reader.IsDBNull(reader.GetOrdinal("Subtitle")) ? reader.GetString("Subtitle") : "",
                Address = reader.IsDBNull(reader.GetOrdinal("Address")) ? "" : reader.GetString("Address"),
                Manager = reader.IsDBNull(reader.GetOrdinal("Manager")) ? 0 : reader.GetInt32("Manager"),
                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString("Description"),
                Image = reader.IsDBNull(reader.GetOrdinal("Image")) ? null : reader.GetString("Image"),
                Score = reader.IsDBNull(reader.GetOrdinal("Score")) ? 0 : Convert.ToSingle(reader["Score"]),
                Genres = reader.IsDBNull(reader.GetOrdinal("Genres")) ? Array.Empty<string>() : System.Text.Json.JsonSerializer.Deserialize<string[]>(reader.GetString("Genres")),
                Format = reader.IsDBNull(reader.GetOrdinal("Format")) ? Array.Empty<string>() : System.Text.Json.JsonSerializer.Deserialize<string[]>(reader.GetString("Format")),
                ContentRating = reader.IsDBNull(reader.GetOrdinal("ContentRating")) ? "" : reader.GetString("ContentRating"),
                Copyright = reader.IsDBNull(reader.GetOrdinal("Copyright")) ? "" : reader.GetString("Copyright"),
                DaysID = reader.IsDBNull(reader.GetOrdinal("DaysID")) ? 0 : reader.GetInt32("DaysID")
            };
        }

        return null;
    }

    //Parte referente ao Stand tipo o que é oferecido no inovaweek
    //Mexe com stand no event.cs
    public void CreateStand(Stand stand)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = @"INSERT INTO Stands (ID_Event, Name, Subtitle, Local, Description, Score, Image, Genres, Format, ContentRating, Copyright, DaysID)
                        VALUES (@eventId, @name, @subtitle, @local, @description, @score, @image, @genres, @format, @contentRating, @copyright, @daysID)";

        using var cmd = new MySqlCommand(query, conn);

        cmd.Parameters.AddWithValue("@eventId", stand.EventId);
        cmd.Parameters.AddWithValue("@name", stand.Name ?? "");
        cmd.Parameters.AddWithValue("@subtitle", stand.Subtitle ?? "");
        cmd.Parameters.AddWithValue("@local", stand.Local ?? "");
        cmd.Parameters.AddWithValue("@description", stand.Description);
        cmd.Parameters.AddWithValue("@score", stand.Score);
        cmd.Parameters.AddWithValue("@image", stand.Image);
        cmd.Parameters.AddWithValue("@genres", System.Text.Json.JsonSerializer.Serialize(stand.Genres ?? Array.Empty<string>()));
        cmd.Parameters.AddWithValue("@format", System.Text.Json.JsonSerializer.Serialize(stand.Format ?? Array.Empty<string>()));
        cmd.Parameters.AddWithValue("@contentRating", stand.ContentRating ?? "Livre para todos os públicos");
        cmd.Parameters.AddWithValue("@copyright", stand.Copyright ?? "");
        cmd.Parameters.AddWithValue("@daysID", stand.DaysID > 0 ? stand.DaysID : 1);

        cmd.ExecuteNonQuery();
    }

    public void UpdateStand(Stand stand)
{
    using var conn = new MySqlConnection(connectionString);
    conn.Open();

    string query = @"UPDATE Stands 
                     SET Name=@name, Subtitle=@subtitle, Local=@local, Description=@description, Score=@score, Image=@image, Genres=@genres, Format=@format, ContentRating=@contentRating, Copyright=@copyright, DaysID=@daysID
                     WHERE Id=@id";

    using var cmd = new MySqlCommand(query, conn);

    cmd.Parameters.AddWithValue("@id", stand.Id);
    cmd.Parameters.AddWithValue("@name", stand.Name ?? "");
    cmd.Parameters.AddWithValue("@subtitle", stand.Subtitle ?? "");
    cmd.Parameters.AddWithValue("@local", stand.Local ?? "");
    cmd.Parameters.AddWithValue("@description", stand.Description);
    cmd.Parameters.AddWithValue("@score", stand.Score);
    cmd.Parameters.AddWithValue("@image", stand.Image);
    cmd.Parameters.AddWithValue("@genres", System.Text.Json.JsonSerializer.Serialize(stand.Genres ?? Array.Empty<string>()));
    cmd.Parameters.AddWithValue("@format", System.Text.Json.JsonSerializer.Serialize(stand.Format ?? Array.Empty<string>()));
    cmd.Parameters.AddWithValue("@contentRating", stand.ContentRating ?? "Livre para todos os públicos");
    cmd.Parameters.AddWithValue("@copyright", stand.Copyright ?? "");
    cmd.Parameters.AddWithValue("@daysID", stand.DaysID > 0 ? stand.DaysID : 1);

    cmd.ExecuteNonQuery();
}

    public List<Stand> GetStands()
    {
        var lista = new List<Stand>();

        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "SELECT * FROM Stands";

        using var cmd = new MySqlCommand(query, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            lista.Add(new Stand
            {
                Id = reader.GetInt32("Id"),
                EventId = reader.GetInt32("ID_Event"),
                Name = reader.GetString("Name"),
                Subtitle = reader.IsDBNull(reader.GetOrdinal("Subtitle")) ? "" : reader.GetString("Subtitle"),
                Local = reader.IsDBNull(reader.GetOrdinal("Local")) ? null : reader.GetString("Local"),
                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString("Description"),
                Image = reader.IsDBNull(reader.GetOrdinal("Image")) ? null : reader.GetString("Image"),
                Score = reader.IsDBNull(reader.GetOrdinal("Score")) ? 0 : Convert.ToInt32(reader["Score"]),
                Genres = reader.IsDBNull(reader.GetOrdinal("Genres")) ? Array.Empty<string>() : System.Text.Json.JsonSerializer.Deserialize<string[]>(reader.GetString("Genres")),
                Format = reader.IsDBNull(reader.GetOrdinal("Format")) ? Array.Empty<string>() : System.Text.Json.JsonSerializer.Deserialize<string[]>(reader.GetString("Format")),
                ContentRating = reader.IsDBNull(reader.GetOrdinal("ContentRating")) ? "" : reader.GetString("ContentRating"),
                Copyright = reader.IsDBNull(reader.GetOrdinal("Copyright")) ? "" : reader.GetString("Copyright"),
                DaysID = reader.IsDBNull(reader.GetOrdinal("DaysID")) ? 0 : reader.GetInt32("DaysID")
            });
        }

        return lista;
    }

    public Stand? GetStandById(int id)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "SELECT * FROM Stands WHERE Id=@id";

        using var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Stand
            {
                Id = reader.GetInt32("ID"),
                EventId = reader.GetInt32("ID_Event"),
                Name = reader.GetString("Name"),
                Subtitle = reader.IsDBNull(reader.GetOrdinal("Subtitle")) ? "" : reader.GetString("Subtitle"),
                Local = reader.IsDBNull(reader.GetOrdinal("Local")) ? null : reader.GetString("Local"),
                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString("Description"),
                Image = reader.IsDBNull(reader.GetOrdinal("Image")) ? null : reader.GetString("Image"),
                Score = reader.IsDBNull(reader.GetOrdinal("Score")) ? 0 : Convert.ToInt32(reader["Score"]),
                Genres = reader.IsDBNull(reader.GetOrdinal("Genres")) ? Array.Empty<string>() : System.Text.Json.JsonSerializer.Deserialize<string[]>(reader.GetString("Genres")),
                Format = reader.IsDBNull(reader.GetOrdinal("Format")) ? Array.Empty<string>() : System.Text.Json.JsonSerializer.Deserialize<string[]>(reader.GetString("Format")),
                ContentRating = reader.IsDBNull(reader.GetOrdinal("ContentRating")) ? "" : reader.GetString("ContentRating"),
                Copyright = reader.IsDBNull(reader.GetOrdinal("Copyright")) ? "" : reader.GetString("Copyright"),
                DaysID = reader.IsDBNull(reader.GetOrdinal("DaysID")) ? 0 : reader.GetInt32("DaysID")
            };
        }

        return null;
    }

    public void DeleteStand(int id)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "DELETE FROM Stands WHERE Id = @id";

        using var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@id", id);

        cmd.ExecuteNonQuery();
    }

        //método para calcular a média de avaliação dos eventos a partir
        // dos comentários feitos nos stands relacionados a ele
public double GetAverageScoreByEvent(int eventId)
{
    using var conn = new MySqlConnection(connectionString);
    conn.Open();

    string query = @"
        SELECT AVG(c.Score)
        FROM Comments c
        INNER JOIN Stands s ON c.StandsID = s.ID
        WHERE s.ID_Event = @eventId
    ";

    using var cmd = new MySqlCommand(query, conn);
    cmd.Parameters.AddWithValue("@eventId", eventId);

    var result = cmd.ExecuteScalar();

    return result != DBNull.Value ? Convert.ToDouble(result) : 0;
}

    //Parte referente a Comments - comentários nos stands
    public void CreateComment(Comment comment)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = @"INSERT INTO Comments (Date, StandsID, Score, UserID, Type, Text)
                        VALUES (@date, @standsId, @score, @userId, @type, @text)";

        using var cmd = new MySqlCommand(query, conn);

        cmd.Parameters.AddWithValue("@date", comment.Date);
        cmd.Parameters.AddWithValue("@standsId", comment.StandId);
        cmd.Parameters.AddWithValue("@score", comment.Score);
        cmd.Parameters.AddWithValue("@userId", comment.UserId ?? (object)DBNull.Value);
        cmd.Parameters.AddWithValue("@type", comment.Type ?? (object)DBNull.Value);
        cmd.Parameters.AddWithValue("@text", comment.Text);

        cmd.ExecuteNonQuery();
    }

    public void UpdateComment(Comment comment)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = @"UPDATE Comments 
                         SET Date=@date, Score=@score, UserID=@userId, Type=@type, Text=@text
                         WHERE ID=@id";

        using var cmd = new MySqlCommand(query, conn);

        cmd.Parameters.AddWithValue("@id", comment.Id);
        cmd.Parameters.AddWithValue("@date", comment.Date);
        cmd.Parameters.AddWithValue("@score", comment.Score);
        cmd.Parameters.AddWithValue("@userId", comment.UserId ?? (object)DBNull.Value);
        cmd.Parameters.AddWithValue("@type", comment.Type ?? (object)DBNull.Value);
        cmd.Parameters.AddWithValue("@text", comment.Text);

        cmd.ExecuteNonQuery();
    }

    public List<Comment> GetComments()
    {
        var lista = new List<Comment>();

        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "SELECT * FROM Comments";

        using var cmd = new MySqlCommand(query, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            lista.Add(new Comment
            {
                Id = reader.GetInt32("ID"),
                StandId = reader.GetInt32("StandsID"),
                Text = reader.GetString("Text"),
                Score = reader.GetInt32("Score"),

                UserId = reader.IsDBNull(reader.GetOrdinal("UserID")) ? null : reader.GetInt32("UserID"),

                Date = reader.GetDateTime("Date"),
                Type = reader.IsDBNull(reader.GetOrdinal("Type")) ? null : reader.GetString("Type")
            });
        }

        return lista;
    }

    public List<Comment> GetCommentsByStandId(int standId)
    {
        var lista = new List<Comment>();

        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "SELECT * FROM Comments WHERE StandsID=@standId ORDER BY Date DESC";

        using var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@standId", standId);

        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            lista.Add(new Comment
            {
                Id = reader.GetInt32("ID"),
                StandId = reader.GetInt32("StandsID"),
                Text = reader.GetString("Text"),
                Score = reader.GetInt32("Score"),

                UserId = reader.IsDBNull(reader.GetOrdinal("UserID")) ? null : reader.GetInt32("UserID"),

                Date = reader.GetDateTime("Date"),
                Type = reader.IsDBNull(reader.GetOrdinal("Type")) ? null : reader.GetString("Type")
            });
        }

        return lista;
    }

    public List<Comment> GetCommentsByEventId(int eventId)
    {
        var lista = new List<Comment>();

        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = @"
            SELECT c.*
            FROM Comments c
            LEFT JOIN Stands s ON c.StandsID = s.ID
            WHERE c.EventID = @eventId OR s.ID_Event = @eventId
            ORDER BY c.Date DESC";

        using var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@eventId", eventId);

        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            lista.Add(new Comment
            {
                Id = reader.GetInt32("ID"),
                StandId = reader.GetInt32("StandsID"),
                Text = reader.GetString("Text"),
                Score = reader.GetInt32("Score"),

                UserId = reader.IsDBNull(reader.GetOrdinal("UserID")) ? null : reader.GetInt32("UserID"),

                Date = reader.GetDateTime("Date"),
                Type = reader.IsDBNull(reader.GetOrdinal("Type")) ? null : reader.GetString("Type")
            });
        }

        return lista;
    }


public double GetAverageScoreByStand(int standId)
{
    using var conn = new MySqlConnection(connectionString);
    conn.Open();

    string query = "SELECT AVG(Score) FROM Comments WHERE StandsID = @standId";

    using var cmd = new MySqlCommand(query, conn);
    cmd.Parameters.AddWithValue("@standId", standId);

    var result = cmd.ExecuteScalar();

    return result != DBNull.Value ? Convert.ToDouble(result) : 0;
}
    public Comment? GetCommentById(int id)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "SELECT * FROM Comments WHERE ID=@id";

        using var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Comment
            {
                Id = reader.GetInt32("ID"),
                StandId = reader.GetInt32("StandsID"),
                Text = reader.GetString("Text"),
                Score = reader.GetInt32("Score"),

                UserId = reader.IsDBNull(reader.GetOrdinal("UserID")) ? null : reader.GetInt32("UserID"),

                Date = reader.GetDateTime("Date"),
                Type = reader.IsDBNull(reader.GetOrdinal("Type")) ? null : reader.GetString("Type")
            };
        }

        return null;
    }

    public void DeleteComment(int id)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "DELETE FROM Comments WHERE ID = @id";

        using var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@id", id);

        cmd.ExecuteNonQuery();
    }

        public User? GetUserByEmailAndPassword(string email, string password)
    {
        // sua lógica de consulta MySQL aqui
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "SELECT * FROM User WHERE email = @email AND password = @password";

        using var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@email", email);
        cmd.Parameters.AddWithValue("@password", password);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new User
            {
                Id = reader.GetInt32("ID"),
                Email = reader.GetString("email"),
                Password = reader.GetString("password"),
                Role = reader.GetString("Tipo").ToLower()
            };
        }

        return null;
    }

    // Parte referente a UserActivity
    public List<UserActivity> GetUserActivities()
    {
        var lista = new List<UserActivity>();

        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = @"SELECT UA.ID, UA.UserID, UA.eventID, UA.TipoUsuario, UA.DataHora, UA.Avaliou, E.Name AS EventName
                         FROM UserActivity UA
                         LEFT JOIN Event E ON UA.eventID = E.ID
                         ORDER BY UA.DataHora DESC";

        using var cmd = new MySqlCommand(query, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            lista.Add(new UserActivity
            {
                Id = reader.GetInt32("ID"),
                UserId = reader.IsDBNull(reader.GetOrdinal("UserID")) ? null : reader.GetInt32("UserID"),
                EventId = reader.IsDBNull(reader.GetOrdinal("eventID")) ? null : reader.GetInt32("eventID"),
                TipoUsuario = reader.IsDBNull(reader.GetOrdinal("TipoUsuario")) ? "Anonimo" : reader.GetString("TipoUsuario"),
                DataHora = reader.GetDateTime("DataHora"),
                Avaliou = reader.GetBoolean("Avaliou"),
                EventName = reader.IsDBNull(reader.GetOrdinal("EventName")) ? "Sem Evento" : reader.GetString("EventName")
            });
        }

        return lista;
    }
}
