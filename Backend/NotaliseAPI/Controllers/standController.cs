using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("stand")]

public class StandController : ControllerBase
{
private StandService service = new StandService();

[HttpPost("create")]
public IActionResult CreateStand([FromBody] Stand stand)
{
    service.CreateStand(stand);
    return Ok("Stand criado");
}

[HttpPut("update")]
public IActionResult UpdateStand([FromBody] Stand stand)
{
    service.UpdateStand(stand);
    return Ok("Stand atualizado");
}

[HttpGet("all")]
public IActionResult GetAllStands()
{
    var stands = service.GetStands();
    return Ok(stands);
}

[HttpGet("{id}")]
public IActionResult GetStandById(int id)
{
    var stand = service.GetStandById(id);
    if (stand == null)
        return NotFound("Stand não encontrado");
    
    return Ok(stand);
}

    [HttpGet("event/{eventId}")]
    public IActionResult GetStandsByEventId(int eventId)
    {
        var stands = service.GetStandsByEventId(eventId);

        return Ok(stands);
    }

[HttpDelete("{id}")]
public IActionResult DeleteStand(int id)
{
    service.DeleteStand(id);
    return Ok("Stand deletado");
}

}