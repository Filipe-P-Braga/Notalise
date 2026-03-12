namespace Backend.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string? Description { get; set; }
        public float Score { get; set; }
    }
}
