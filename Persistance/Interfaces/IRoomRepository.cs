using face_space.Application.Dtos;
using face_space.Persistance.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace face_space.Persistance.Interfaces
{
    public interface IRoomRepository
    {
        public Task<Room> CreateRoom(RoomDTO room, string username);
        public Task DeleteRoom(int roomId, string username);
        public Task JoinRoom(int roomId, string username, string connectionId, string password);
        public Task LeaveRoom(int roomId, string username);
        public Task<List<Room>> GetRooms(string user);
        public Task<Room> GetRoomById(int id);
    }
}
