public class Comment
{
    public int Id { get; set; }

    public int StandId { get; set; } // FK referencia Stands

    public string Text { get; set; }

    public int Score { get; set; } // 1 a 5 estrelas

    public int? UserId { get; set; } // Opcional - usuário que fez o comentário

    public string? Type { get; set; } // Tipo de comentário

    public DateTime Date { get; set; } = DateTime.UtcNow;
}
