public class UserService : IUserService
{
    private readonly IUserRepository userRepository;

    public UserService(IUserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public User CreateUser(User user)
    {
        if (string.IsNullOrWhiteSpace(user.Name))
            throw new ArgumentException("User name is required.");
        if (user.Age <= 0 || user.Age >= 110)
            throw new ArgumentException("Age must be greater than 0 and lower than 110");

        userRepository.Insert(user);
        return user;
    }

    public User? GetUserById(int id)
    {
        return userRepository.GetById(id);
    }

    public List<User> GetAllUsers()
    {
        return userRepository.GetAll();
    }

    public void DeleteUser(int id)
    {
        User? user = userRepository.GetById(id);

        if (user == null)
        {
            throw new KeyNotFoundException($"User not found.");
        }

        userRepository.Delete(user);

    }
}