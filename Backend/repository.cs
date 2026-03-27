using MySql.Data.MySqlClient;

public class Repositorio
{
    // talvez cause problema ? usuário padrão ? senha padrão ? 
    // database sendo eventsdb para todos
    string connectionString = "server=localhost;database=eventsdb;user=root;password=123456";

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
                Description = reader.IsDBNull("Description") ? null : reader.GetString("Description"),
                Score = reader.GetInt32("Score")
            });
        }

        return lista;
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
                Description = reader.IsDBNull("Description") ? null : reader.GetString("Description"),
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

}
