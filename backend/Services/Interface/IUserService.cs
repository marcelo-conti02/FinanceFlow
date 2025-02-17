using Microsoft.AspNetCore.Routing.Constraints;

public interface IUserService
{
    User CreateUser(User user);
    User? GetUserById(int id);
    List<User> GetAllUsers();
    void DeleteUser(int id);
}