public interface IUserRepository
{
    List<User> GetAll();
    User? GetById(int id);
    Task Insert(User user);
    Task Delete(User user);
}