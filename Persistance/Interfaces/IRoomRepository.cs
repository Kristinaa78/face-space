using face_space.Persistance.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace face_space.Persistance.Interfaces
{
    public interface IRoomRepository
    {
        public Task<Room> CreateRoom(string name, string username);
        public Task DeleteRoom(int roomId, string username);
        public Task JoinRoom(int roomId, string username, string connectionId);
        public Task LeaveRoom(int roomId, string username);
        public Task<List<Room>> GetRooms();
    }
}
