public class Stand
{
    public int Id { get; set; }

    public int EventId { get; set; } // FK

    public string Name { get; set; }

    public string? Local { get; set; }

    public string? Description { get; set; }

    public int Score { get; set; }
}