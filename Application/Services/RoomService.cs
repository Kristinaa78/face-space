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

        public async Task<RoomDTO> CreateRoom(string roomName, string user)
        {
            var room = await _roomRepository.CreateRoom(roomName, user);
            return new RoomDTO
            { 
                Name = room.Name,
                Count = room.Count,
                Id = room.Id,
            };
        }

        public async Task DeleteRoom(int roomId, string user)
        {
            await _roomRepository.DeleteRoom(roomId, user);
        }

        public async Task<List<RoomDTO>> GetRooms()
        {
            return (await _roomRepository.GetRooms()).Select(room => new RoomDTO
            {
                Name = room.Name,
                Count = room.Count,
                Id = room.Id,
            }).ToList();
        }
    }
}
