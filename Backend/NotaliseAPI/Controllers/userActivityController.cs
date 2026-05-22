using Microsoft.AspNetCore.Mvc;
using NotaliseAPI.Models;

[ApiController]
[Route("useractivity")]
public class UserActivityController : ControllerBase
{
    private UserActivityService service = new UserActivityService();

    [HttpGet]
    public IActionResult GetUserActivities()
    {
        var activities = service.GetUserActivities();
        return Ok(activities);
    }
}
