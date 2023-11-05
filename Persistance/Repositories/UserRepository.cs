using face_space.Application.Dtos;
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

        public async Task<User> createUser(RegisterDto registerDto)
        {
            var user = _context.Users.Add(new User
            {
                Username = registerDto.Username,
                Password = registerDto.Password,
                createdAt = DateTime.Now
            });

            await _context.SaveChangesAsync();

            return user.Entity;
        }

        public async Task<List<User>> getUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> loginUser(LoginDto loginDto)
        {
            return await _context.Users.FirstAsync(x => x.Username.Equals(loginDto.Username) && x.Password.Equals(loginDto.Password));
        }
    }
}
