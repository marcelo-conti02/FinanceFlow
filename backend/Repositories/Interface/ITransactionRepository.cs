public interface ITransactionRepository
{
    Transaction? GetById(int id);
    Task Insert(Transaction transaction);
    List<Transaction> GetAll();
}