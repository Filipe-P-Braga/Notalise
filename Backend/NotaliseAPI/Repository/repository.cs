using MySql.Data.MySqlClient;
using NotaliseAPI.Models;

public class Repositorio
{
    // talvez cause problema ? usuário padrão ? senha padrão ? 
    // database sendo eventsdb para todos
    string connectionString = "server=localhost;database=notalise;user=lucas;password=3237";

    //parte referente ao evento criado tipo inovaweek
    public void CreateEvent(Event ev)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = @"INSERT INTO Events (Name, Address, Description, Score)
                         VALUES (@name, @address, @description, @score)";

        using var cmd = new MySqlCommand(query, conn);

        cmd.Parameters.AddWithValue("@name", ev.Name);
        cmd.Parameters.AddWithValue("@address", ev.Address);
        cmd.Parameters.AddWithValue("@description", ev.Description);
        cmd.Parameters.AddWithValue("@score", ev.Score);

        cmd.ExecuteNonQuery();
    }

    public void UpdateEvent(Event ev)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = @"UPDATE Events 
                         SET Name=@name, Address=@address, Description=@description, Score=@score
                         WHERE Id=@id";

        using var cmd = new MySqlCommand(query, conn);

        cmd.Parameters.AddWithValue("@id", ev.Id);
        cmd.Parameters.AddWithValue("@name", ev.Name);
        cmd.Parameters.AddWithValue("@address", ev.Address);
        cmd.Parameters.AddWithValue("@description", ev.Description);
        cmd.Parameters.AddWithValue("@score", ev.Score);

        cmd.ExecuteNonQuery();
    }

    // feito o método DELETE
    public List<Event> GetEvents()
    {
        var lista = new List<Event>();

        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "SELECT * FROM Events";

        using var cmd = new MySqlCommand(query, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            lista.Add(new Event
            {
                Id = reader.GetInt32("Id"),
                Name = reader.GetString("Name"),
                Address = reader.GetString("Address"),
                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString("Description"),
                Score = reader.GetInt32("Score")
            });
        }

        return lista;
    }


    public void DeleteEvent(int id)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "DELETE FROM Events WHERE Id = @id";

        using var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@id", id);

        cmd.ExecuteNonQuery();
    }

    // feito o método READ
    public Event? GetEventById(int id)
    {
        using var conn = new MySqlConnection(connectionString);
        conn.Open();

        string query = "SELECT * FROM Events WHERE Id=@id";

        using var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Event
            {
                Id = reader.GetInt32("Id"),
                Name = reader.GetString("Name"),
                Address = reader.GetString("Address"),
                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString("Description"),
                Score = reader.GetInt32("Score")
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

        string query = @"INSERT INTO Stands (EventId, Name, Local, Description, Score)
                        VALUES (@eventId, @name, @local, @description, @score)";

        using var cmd = new MySqlCommand(query, conn);

        cmd.Parameters.AddWithValue("@eventId", stand.EventId);
        cmd.Parameters.AddWithValue("@name", stand.Name);
        cmd.Parameters.AddWithValue("@local", stand.Local);
        cmd.Parameters.AddWithValue("@description", stand.Description);
        cmd.Parameters.AddWithValue("@score", stand.Score);

        cmd.ExecuteNonQuery();
    }

    public void UpdateStand(Stand stand)
{
    using var conn = new MySqlConnection(connectionString);
    conn.Open();

    string query = @"UPDATE Stands 
                     SET Name=@name, Local=@local, Description=@description, Score=@score
                     WHERE Id=@id";

    using var cmd = new MySqlCommand(query, conn);

    cmd.Parameters.AddWithValue("@id", stand.Id);
    cmd.Parameters.AddWithValue("@name", stand.Name);
    cmd.Parameters.AddWithValue("@local", stand.Local);
    cmd.Parameters.AddWithValue("@description", stand.Description);
    cmd.Parameters.AddWithValue("@score", stand.Score);

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
                EventId = reader.GetInt32("EventId"),
                Name = reader.GetString("Name"),
                Local = reader.IsDBNull(reader.GetOrdinal("Local")) ? null : reader.GetString("Local"),
                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString("Description"),
                Score = reader.GetInt32("Score")
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
                Id = reader.GetInt32("Id"),
                EventId = reader.GetInt32("EventId"),
                Name = reader.GetString("Name"),
                Local = reader.IsDBNull(reader.GetOrdinal("Local")) ? null : reader.GetString("Local"),
                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString("Description"),
                Score = reader.GetInt32("Score")
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
                UserId = reader.IsDBNull(reader.GetOrdinal("UserID")) ? null : reader.GetString("UserID"),
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
                UserId = reader.IsDBNull(reader.GetOrdinal("UserID")) ? null : reader.GetString("UserID"),
                Date = reader.GetDateTime("Date"),
                Type = reader.IsDBNull(reader.GetOrdinal("Type")) ? null : reader.GetString("Type")
            });
        }

        return lista;
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
                UserId = reader.IsDBNull(reader.GetOrdinal("UserID")) ? null : reader.GetString("UserID"),
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

}