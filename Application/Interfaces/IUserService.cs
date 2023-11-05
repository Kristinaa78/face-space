using face_space.Application.Dtos;
using face_space.Persistance.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace face_space.Application.Interfaces
{
    public interface IUserService
    {
        public Task<UserDto> createUser(RegisterDto registerDto);
        public Task<List<UserDto>> getUsers();
        public Task<UserDto> loginUser(LoginDto login);
    }
}
