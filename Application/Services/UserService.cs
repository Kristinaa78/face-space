using face_space.Application.Interfaces;
using face_space.Persistance.Interfaces;
using face_space.Persistance.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace face_space.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        public UserService(IUserRepository repository) 
        {
            _repository = repository;
        }

        public async Task<User> createUser(string username, string password)
        {
            return await _repository.createUser(username, password);
        }
        public async Task<List<User>> getUsers()
        {
            return await _repository.getUsers();
        }
    }
}
