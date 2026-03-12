using MySql.Data.MySqlClient;

public class Repositorio
{
    // talvez cause problema ? usuário padrão ? senha padrão ?
    string connectionString = "server=localhost;database=eventsdb;user=root;password=123456";

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

    // Próximos passos a serem criados
    public void DeleteEvent(int id)
    {
        // TODO: implementar DELETE
    }

    public List<Event> GetEvents()
    {
        // TODO: implementar READ
        return new List<Event>();
    }
}
