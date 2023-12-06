using face_space.Persistance.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace face_space.Persistance.Interfaces
{
    public interface IRoleRepository
    {
        public Task<Role> CreateRole(string name);
        public Task<List<Role>> GetRoles(int userId);
    }
}
