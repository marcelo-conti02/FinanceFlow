using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserService userService;
    private readonly ITransactionService transactionService;

    public UserController(IUserService userService, ITransactionService transactionService)
    {
        this.userService = userService;
        this.transactionService = transactionService;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = userService.GetUserById(id);

        if (user == null)
            return NotFound();
        else
            return Ok(user);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var users = userService.GetAllUsers();
        return Ok(users);
    }

    [HttpPost]
    public IActionResult Post([FromBody] User user)
    {
        if (user == null)
            return BadRequest("User data is required.");

        var newUser = new User(user.Name, user.Age);

        userService.CreateUser(newUser);

        return CreatedAtAction(nameof(GetById), new { id = newUser.Id }, newUser);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        Console.WriteLine($"DELETE request received for user ID: {id}");

        List<Transaction>? transactions = transactionService.GetTransactionsByUserId(id);

        // deletes all transactions related to the user
        if (transactions != null)
        {
            foreach (Transaction transaction in transactions)
            {
                transactionService.DeleteTransaction(transaction.Id);
            }
        }

        userService.DeleteUser(id);
        return NoContent();
    }
}