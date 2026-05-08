namespace NotaliseAPI.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Subtitle { get; set; }
        public string Address { get; set; } 
        public int Manager { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public float Score { get; set; }
        public string[] Genres { get; set; }
        public string[] Format { get; set; }
        public string ContentRating { get; set; }
        public string Copyright { get; set; }
        public int DaysID { get; set; }
    }
}