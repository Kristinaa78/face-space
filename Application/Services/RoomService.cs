using face_space.Application.Dtos;
using face_space.Application.Interfaces;
using face_space.Persistance.Interfaces;
using face_space.Persistance.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace face_space.Application.Services
{
    public class RoomService : IRoomService
    {
        private readonly IUserRepository _repository;
        private readonly IRoleRepository _roleRepository;
        private readonly IRoomRepository _roomRepository;
        public RoomService(IUserRepository repository, IRoleRepository roleRepository, IRoomRepository roomRepository)
        {
            _repository = repository;
            _roleRepository = roleRepository;
            _roomRepository = roomRepository;
        }

        public async Task<RoomDTO> CreateRoom(RoomDTO room, string user)
        {
            var newRoom = await _roomRepository.CreateRoom(room, user);
            return new RoomDTO
            {
                Id = room.Id,
                RoomName = newRoom.RoomName,
                RoomPassword = newRoom.Password,
                Participants = newRoom.Participants,
                EnableChat = newRoom.EnableChat,
                EnableVideo = newRoom.EnableVideo,
            };
        }

        public async Task DeleteRoom(int roomId, string user)
        {
            await _roomRepository.DeleteRoom(roomId, user);
        }

        public async Task<List<RoomDTO>> GetRooms(string user)
        {
            return (await _roomRepository.GetRooms(user)).Select(room => new RoomDTO
            {
                Id = room.Id,
                RoomName = room.RoomName,
                RoomPassword = room.Password,
                Participants = room.Participants,
                EnableChat = room.EnableChat,
                EnableVideo = room.EnableVideo,
            }).ToList();
        }
    }
}
