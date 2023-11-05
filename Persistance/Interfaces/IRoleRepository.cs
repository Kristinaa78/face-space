using face_space.Persistance.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace face_space.Persistance.Interfaces
{
    public interface IRoleRepository
    {
        public Task<Role> createRole(string name);
        public Task<List<Role>> getRoles(int userId);
    }
}
