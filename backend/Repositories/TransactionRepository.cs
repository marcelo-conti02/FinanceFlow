public class TransactionRepository : ITransactionRepository
{
    private readonly AppDbContext appDbContext;

    public TransactionRepository(AppDbContext appDbContext)
    {
        this.appDbContext = appDbContext;
    }

    public async Task Insert(Transaction transaction)
    {
        await appDbContext.Transactions.AddAsync(transaction);
        await appDbContext.SaveChangesAsync();
    }

    public List<Transaction> GetAll()
    {
        return appDbContext.Transactions.ToList();
    }
}