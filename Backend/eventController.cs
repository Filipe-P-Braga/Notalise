using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/event")]
    public class EventController : ControllerBase
    {
        private readonly EventService _service;

        public EventController(EventService service)
        {
            _service = service;
        }

        [HttpPost("CreateEvent")]
        public IActionResult CreateEvent([FromBody] Event ev)
        {
            _service.CreateEvent(ev);
            return Ok("Event created");
        }
    }
}