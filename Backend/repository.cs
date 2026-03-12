using Backend.Models;
using MySql.Data.MySqlClient;

namespace Backend.Repositories
{
    public class Repository
    {
        private string connectionString = "server=localhost;database=eventsdb;user=root;password=123456";

        public void InsertEvent(Event ev)
        {
            using var conn = new MySqlConnection(connectionString);
            conn.Open();

            var query = @"INSERT INTO Events (Name, Address, Description, Score)
                          VALUES (@name, @address, @description, @score)";

            using var cmd = new MySqlCommand(query, conn);

            cmd.Parameters.AddWithValue("@name", ev.Name);
            cmd.Parameters.AddWithValue("@address", ev.Address);
            cmd.Parameters.AddWithValue("@description", ev.Description);
            cmd.Parameters.AddWithValue("@score", ev.Score);

            cmd.ExecuteNonQuery();
        }
    }
}