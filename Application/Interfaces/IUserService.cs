using face_space.Persistance.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace face_space.Application.Interfaces
{
    public interface IUserService
    {
        public Task<User> createUser(string username, string password);
        public Task<List<User>> getUsers();
    }
}
