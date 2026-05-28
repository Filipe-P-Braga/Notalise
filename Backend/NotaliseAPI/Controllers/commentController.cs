using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("comment")]

public class CommentController : ControllerBase
{
    private CommentService service = new CommentService();

    [HttpPost("create")]
    public IActionResult CreateComment([FromBody] Comment comment)
    {
        try
        {
            // Validação: ao menos um ID (stand ou evento) deve estar preenchido
            if (!comment.StandId.HasValue && !comment.EventId.HasValue)
            {
                return BadRequest(new { error = "Comentário deve estar vinculado a um stand ou evento" });
            }

            service.CreateComment(comment);
            return Ok(new { message = "Comentário criado com sucesso", comment });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("update")]
    public IActionResult UpdateComment([FromBody] Comment comment)
    {
        try
        {
            service.UpdateComment(comment);
            return Ok(new { message = "Comentário atualizado com sucesso", comment });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("all")]
    public IActionResult GetAllComments()
    {
        try
        {
            var comments = service.GetComments();
            return Ok(comments);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetCommentById(int id)
    {
        try
        {
            var comment = service.GetCommentById(id);
            if (comment == null)
                return NotFound(new { error = "Comentário não encontrado" });
            
            return Ok(comment);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("stand/{standId}")]
    public IActionResult GetCommentsByStand(int standId)
    {
        try
        {
            var comments = service.GetCommentsByStandId(standId);
            return Ok(comments);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("event/{eventId}")]
    public IActionResult GetCommentsByEvent(int eventId)
    {
        try
        {
            var comments = service.GetCommentsByEventId(eventId);
            return Ok(comments);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteComment(int id)
    {
        try
        {
            service.DeleteComment(id);
            return Ok(new { message = "Comentário deletado com sucesso" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
