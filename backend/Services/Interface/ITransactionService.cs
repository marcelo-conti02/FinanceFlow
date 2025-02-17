public interface ITransactionService
{
    Transaction CreateTransaction(Transaction transaction, int userId);
    Transaction? GetTransactionById(int id);
    List<Transaction> GetAllTransactions();
    List<Transaction>? GetTransactionsByUserId(int userId);
    void DeleteTransaction(int id);
}