using face_space.Application.Dtos;
using face_space.Persistance.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace face_space.Persistance.Model
{
    public class SeedData
    {
        public static async Task SeedUsers(IUserRepository repository, IRoleRepository roleRepository)
        {
            if ((await repository.getUsers()).Count != 0) 
                return;

            await repository.createUser(new RegisterDto { 
                Username = "jano",
                Password = "feri",
            });
            await repository.createUser(new RegisterDto { 
                Username = "feri",
                Password = "jano",
            });

            await roleRepository.createRole("Admin");
            await roleRepository.createRole("User");
        }
    }
}
