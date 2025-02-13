public interface ITransactionService
{
    Transaction CreateTransaction(Transaction transaction, int userId);
    Transaction? GetTransactionById(int id);
    List<Transaction> GetAllTransactions(); 
}