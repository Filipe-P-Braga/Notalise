using Microsoft.AspNetCore.Mvc;
using NotaliseAPI.Repository;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly Repositorio _repo;

    public UserController(Repositorio repo)
    {
        _repo = repo;
    }

    [HttpPost("/login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var user = _repo.GetUserByEmailAndPassword(request.Email, request.Password);

        if (user == null)
            return Unauthorized(new { message = "Email ou senha incorretos" });

        return Ok(new { id = user.Id, name = user.Name, email = user.Email, role = user.Role });
    }
}

public record LoginRequest(string Email, string Password);