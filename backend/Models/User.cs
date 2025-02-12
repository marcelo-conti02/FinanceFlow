using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User
{
    // ensures it's a unique, sequential integer
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id {get; set;}

    public string Name {get; set;}
    public int Age {get; set;}

    public User(string name, int age)
    {
        Name = name;
        Age = age;
    }
}