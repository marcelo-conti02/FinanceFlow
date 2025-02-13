public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository transactionRepository;
    private readonly IUserRepository userRepository;

    public TransactionService(IUserRepository userRepository, ITransactionRepository transactionRepository)
    {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }

    // ensures that users under 18 years old can only make expenses and passes the userId for the transaction
    public Transaction CreateTransaction(Transaction transaction, int userId)
    {
        var user = userRepository.GetById(userId);
        if (user == null)
            throw new ArgumentException("User not found");

        if (user.Age < 18 && transaction.Type == TransactionType.Income)
            throw new ArgumentException("Users under 18 years old can only register expanses!");

        var newTransaction = new Transaction(transaction.Description, transaction.Value, transaction.Type, userId);

        transactionRepository.Insert(newTransaction);

        return newTransaction;
    }

    public Transaction? GetTransactionById(int id)
    {
        return transactionRepository.GetById(id);
    }

    public List<Transaction> GetAllTransactions()
    {
        return transactionRepository.GetAll();
    }
}