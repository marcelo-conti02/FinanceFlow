using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/transactions")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionService service;

    public TransactionController(ITransactionService service)
    {
        this.service = service;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var transaction = service.GetTransactionById(id);

        if (transaction == null)
            return NotFound();
        else
            return Ok(transaction);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var transactions = service.GetAllTransactions();
        return Ok(transactions);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Transaction transaction)
    {
        if (transaction == null)
            return BadRequest("Transaction data is required");

        var newTransaction = service.CreateTransaction(transaction, transaction.UserId);

        return CreatedAtAction(nameof(GetById), new { id = newTransaction.Id }, newTransaction);
    }
}