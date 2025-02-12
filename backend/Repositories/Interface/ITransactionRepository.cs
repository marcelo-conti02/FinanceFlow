public interface ITransactionRepository
{
    Task Insert(Transaction transaction);
    List<Transaction> GetAll();
}