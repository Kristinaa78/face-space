using face_space.Persistance.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace face_space.Persistance.Interfaces
{
    public interface IUserRepository
    {
        public Task<User> createUser(string username, string password);
        public Task<List<User>> getUsers();
    }
}
