using face_space.Application.Dtos;
using face_space.Persistance.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace face_space.Persistance.Interfaces
{
    public interface IUserRepository
    {
        public Task<User> createUser(RegisterDto registerDto);
        public Task<List<User>> getUsers();
        Task<User> loginUser(LoginDto loginDto);
    }
}
