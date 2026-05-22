namespace NotaliseAPI.Models;

public class UserActivity
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    public int? EventId { get; set; }
    public string TipoUsuario { get; set; } = "Anonimo";
    public DateTime DataHora { get; set; }
    public bool Avaliou { get; set; }
    public string EventName { get; set; } = "Sem Evento";
}
