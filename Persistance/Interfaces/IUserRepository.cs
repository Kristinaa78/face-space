using face_space.Application.Dtos;
using face_space.Persistance.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace face_space.Persistance.Interfaces
{
    public interface IUserRepository
    {
        public Task<User> CreateUser(RegisterDTO registerDto);
        public Task<List<User>> GetUsers();
        public Task<User> LoginUser(LoginDTO loginDto);
        public Task<bool> ResetPassword(RegisterDTO userDTO);
    }
}
