using face_space.Application.Dtos;
using face_space.Exceptions;
using face_space.Persistance.Interfaces;
using face_space.Persistance.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace face_space.Persistance.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context) 
        {
            _context = context;
        }

        public async Task<User> CreateUser(RegisterDTO registerDTO)
        {
            List<User> users = await GetUsers();
            if (users.Select(x => x.Username).ToList().Contains(registerDTO.Username))
                throw new UsernameAlreadyInUseException(registerDTO.Username);

            var user = _context.Users.Add(new User
            {
                Username = registerDTO.Username,
                Password = registerDTO.Password,
                createdAt = DateTime.Now
            });

            await _context.SaveChangesAsync();

            return user.Entity;
        }

        public async Task<List<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> LoginUser(LoginDTO loginDTO)
        {
            User result = await _context
                .Users
                .FirstOrDefaultAsync(x =>
                    x.Username.Equals(loginDTO.Username)
                 );

            if (result == null)
                throw new UserNotFoundException(loginDTO.Username);

            if (!result.Password.Equals(loginDTO.Password))
                throw new IncorrectLoginDataException();

            return result;
        }

        public async Task<bool> ResetPassword(RegisterDTO userDTO)
        {
            User user = await _context
                .Users
                .FirstOrDefaultAsync(x =>
                    x.Username.Equals(userDTO.Username)
                );

            if (user == null)
                throw new UserNotFoundException(userDTO.Username);

            user.Password = userDTO.Password;

            await _context.SaveChangesAsync();
            return true; // success
        }
    }
}
