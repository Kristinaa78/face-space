using face_space.Application.Dtos;
using face_space.Persistance.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace face_space.Application.Interfaces
{
    public interface IUserService
    {
        public Task<UserDTO> CreateUser(RegisterDTO registerDto);
        public Task<List<UserDTO>> GetUsers();
        public Task<UserDTO> LoginUser(LoginDTO login);
        public Task<bool> ResetPassword(RegisterDTO userDTO);
    }
}
