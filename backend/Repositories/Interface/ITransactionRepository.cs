public interface ITransactionRepository
{
    Transaction? GetById(int id);
    Task Insert(Transaction transaction);
    List<Transaction> GetAll();
    List<Transaction> GetByUserId(int userId);
    Task Delete(Transaction transaction);
}