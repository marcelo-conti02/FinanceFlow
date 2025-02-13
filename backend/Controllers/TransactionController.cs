using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/transactions")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionRepository repository;

    public TransactionController(ITransactionRepository repository)
    {
        this.repository = repository;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var transaction = repository.GetById(id);

        if (transaction == null)
            return NotFound();
        else
            return Ok(transaction);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var transactions = repository.GetAll();
        return Ok(transactions);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Transaction transaction)
    {
        if (transaction == null)
            return BadRequest("Transaction data is required");

        var newTransaction = new Transaction(transaction.Description, transaction.Value, transaction.Type, transaction.UserId);

        repository.Insert(newTransaction);

        return CreatedAtAction(nameof(GetById), new { id = newTransaction.Id }, newTransaction);
    }
}