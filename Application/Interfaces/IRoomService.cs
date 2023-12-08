using face_space.Application.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace face_space.Application.Interfaces
{
    public interface IRoomService
    {
        Task<RoomDTO> CreateRoom(RoomDTO room, string user);
        Task DeleteRoom(int roomId, string user);
        Task<List<RoomDTO>> GetRooms(string user);
    }
}
