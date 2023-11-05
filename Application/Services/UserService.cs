using face_space.Application.Dtos;
using face_space.Application.Interfaces;
using face_space.Persistance.Interfaces;
using face_space.Persistance.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace face_space.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IRoleRepository _roleRepository;
        private readonly SymmetricSecurityKey _key;
        public UserService(IUserRepository repository, IRoleRepository roleRepository, IConfiguration config) 
        {
            _repository = repository;
            _roleRepository = roleRepository;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Key"]));
        }

        public async Task<UserDto> createUser(RegisterDto registerDto)
        {
            User user = await _repository.createUser(registerDto);
            return new UserDto
            {
                Username = user.Username,
                Token = await CreateToken(user)
            };
        }

        public async Task<List<UserDto>> getUsers()
        {
            return (await _repository.getUsers()).Select(x => new UserDto { 
                Username = x.Username,
            }).ToList();
        }

        public async Task<UserDto> loginUser(LoginDto login)
        {
            User user = await _repository.loginUser(login);
            return new UserDto
            {
                Username = user.Username,
                Token = await CreateToken(user)
            };
        }

        private async Task<string> CreateToken(User appUser)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, appUser.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, appUser.Username)
            };

            var roles = (await _roleRepository.getRoles(appUser.Id)).Select(x => x.Name);

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
