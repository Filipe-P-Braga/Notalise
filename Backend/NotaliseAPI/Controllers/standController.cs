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

}