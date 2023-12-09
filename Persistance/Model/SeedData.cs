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
            if ((await repository.GetUsers()).Count != 0) 
                return;

            await repository.CreateUser(new RegisterDTO { 
                Username = "jano",
                Password = "feri",
            });
            await repository.CreateUser(new RegisterDTO { 
                Username = "feri",
                Password = "jano",
            });
            await repository.CreateUser(new RegisterDTO
            {
                Username = "tinka",
                Password = "minka",
            });

            for (int i = 0; i < 10; i++)
            {
                await repository.CreateUser(new RegisterDTO
                {
                    Username = i.ToString(),
                    Password = i.ToString(),
                });
            }
  
            await roleRepository.CreateRole("Admin");
            await roleRepository.CreateRole("User");
        }
    }
}
