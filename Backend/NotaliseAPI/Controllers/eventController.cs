using Microsoft.AspNetCore.Mvc;
using NotaliseAPI.Models;

[ApiController]
[Route("event")]
public class EventController : ControllerBase
{
    private EventService service = new EventService();

    [HttpPost("create")]
    public IActionResult CreateEvent([FromBody] Event ev)
    {
        service.CreateEvent(ev);
        return Ok("Evento criado");
    }

    [HttpPut("update")]
    public IActionResult UpdateEvent([FromBody] Event ev)
    {
        service.UpdateEvent(ev);
        return Ok("Evento atualizado");
    }

    // Estrutura modificada para GET e DELETE
    [HttpGet]
    public IActionResult GetEvents()
    {
        var events = service.GetEvents();
        return Ok(events);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEvent(int id)
    {
        service.DeleteEvent(id);
        return Ok("Evento deletado");
    }
}