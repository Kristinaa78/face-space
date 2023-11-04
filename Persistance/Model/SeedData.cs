using face_space.Persistance.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace face_space.Persistance.Model
{
    public class SeedData
    {
        public static async Task SeedUsers(IUserRepository repository)
        {
            if ((await repository.getUsers()).Count != 0) 
                return;

            repository.createUser("jano", "feri");
            repository.createUser("feri", "jano");
        }
    }
}
