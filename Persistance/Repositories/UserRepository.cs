using face_space.Persistance.Interfaces;
using face_space.Persistance.Model;
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

        public async Task<User> createUser(string username, string password)
        {
            var user = _context.Users.Add(new User
            {
                Username = username,
                Password = password,
                createdAt = DateTime.Now
            });

            await _context.SaveChangesAsync();

            return user.Entity;
        }

        public async Task<List<User>> getUsers()
        {
            return _context.Users.ToList();
        }
    }
}
