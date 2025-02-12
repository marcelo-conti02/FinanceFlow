using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserRepository repository;

    public UserController(IUserRepository repository)
    {
        this.repository = repository;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = repository.GetById(id);

        if (user == null)
            return NotFound();
        else
            return Ok(user);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var users = repository.GetAll();
        return Ok(users);
    }

    [HttpPost]
    public IActionResult Post([FromBody] User user)
    {
        if (user == null)
            return BadRequest("User data is required.");

        var newUser = new User(user.Name, user.Age);

        repository.Insert(newUser);

        return CreatedAtAction(nameof(GetById), new { id = newUser.Id }, newUser);
    }
}