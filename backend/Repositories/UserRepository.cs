public class UserRepository : IUserRepository
{
    private readonly AppDbContext appDbContext;

    public UserRepository(AppDbContext appDbContext)
    {
        this.appDbContext = appDbContext;
    }
    
    public List<User> GetAll()
    {
        return appDbContext.Users.ToList();
    }

    public User? GetById(int id)
    {
        return appDbContext.Users.Find(id);
    }

    public async Task Insert(User user)
    {
        await appDbContext.Users.AddAsync(user);
        await appDbContext.SaveChangesAsync();
    }
    
    public async Task Delete(User user)
    {
        appDbContext.Users.Remove(user);
        await appDbContext.SaveChangesAsync();
    }
}