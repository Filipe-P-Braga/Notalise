using Microsoft.AspNetCore.Mvc;

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

    // TODO: Estrutura dos métodos GET e DELETE a serem feitas
    [HttpGet]
    public IActionResult GetEvents()
    {
        return Ok("TODO: Implementar GET");
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEvent(int id)
    {
        return Ok("TODO: Implementar DELETE");
    }
}
