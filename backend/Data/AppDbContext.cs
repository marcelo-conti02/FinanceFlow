using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

    public DbSet<User> Users {get; set;}
    public DbSet<Transaction> Transactions {get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // ensures User.Id is auto-incremented
        modelBuilder.Entity<User>()
            .Property(u => u.Id)
            .ValueGeneratedOnAdd(); 

        // ensures Transaction.id is auto-incremented
        modelBuilder.Entity<Transaction>()
            .Property(t => t.Id)
            .ValueGeneratedOnAdd();
    }
}