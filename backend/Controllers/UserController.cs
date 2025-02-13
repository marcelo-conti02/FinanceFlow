using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserService service;

    public UserController(IUserService service)
    {
        this.service = service;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = service.GetUserById(id);

        if (user == null)
            return NotFound();
        else
            return Ok(user);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var users = service.GetAllUsers();
        return Ok(users);
    }

    [HttpPost]
    public IActionResult Post([FromBody] User user)
    {
        if (user == null)
            return BadRequest("User data is required.");

        var newUser = new User(user.Name, user.Age);

        service.CreateUser(newUser);

        return CreatedAtAction(nameof(GetById), new { id = newUser.Id }, newUser);
    }
}