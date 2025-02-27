using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Transaction
{
    // ensures it's a unique, sequential integer
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string Description { get; set; }
    public decimal Value { get; set; }
    public TransactionType Type { get; set; }
    public int UserId { get; set; }

    public Transaction(string description, decimal value, TransactionType type, int userId)
    {
        Description = description;
        Value = value;
        Type = type;
        UserId = userId;
    }
}