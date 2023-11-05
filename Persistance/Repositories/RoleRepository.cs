using face_space.Persistance.Interfaces;
using face_space.Persistance.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace face_space.Persistance.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Role> createRole(string name)
        {
            var role = new Role() { 
                Name = name
            };
            role = _context.Roles.Add(role).Entity;
            await _context.SaveChangesAsync();

            return role;
        }

        public async Task<List<Role>> getRoles(int userId)
        {
            return await _context.UserRoles
                .Include(x => x.Role)
                .Where(x => x.UserId == userId)
                .Select(x => x.Role)
                .ToListAsync();
        }
    }
}
