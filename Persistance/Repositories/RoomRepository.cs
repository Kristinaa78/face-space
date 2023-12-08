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
    public class RoomRepository : IRoomRepository
    {
        private readonly DataContext _context;
        public RoomRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Room> CreateRoom(RoomDTO room, string username)
        {
            var user = _context.Users.First(x => x.Username.Equals(username));

            if (_context.Rooms.Any(x => x.RoomName.Equals(room.RoomName)))
                throw new System.Exception("Duplicit room name.");

            var res = _context.Rooms.Add(new Room
            {
                RoomName = room.RoomName,
                Password = room.RoomPassword,
                Participants = room.Participants,
                EnableChat = room.EnableChat,
                EnableVideo = room.EnableVideo,
                AdminId = user.Id
            });

            await _context.SaveChangesAsync();
            return res.Entity;
        }

        public async Task DeleteRoom(int roomId, string username)
        {
            var user = _context.Users.First(x => x.Username.Equals(username));

            if (_context.Rooms.First(x => x.Id == roomId).AdminId != user.Id)
                throw new System.Exception("User is not room admin.");

            _context.Rooms.Remove(_context.Rooms.First(x => x.Id == roomId));
            await _context.SaveChangesAsync();
        }

        public async Task<List<Room>> GetRooms(string user)
        {
            return await _context.Rooms.ToListAsync();
        }

        public async Task JoinRoom(int roomId, string username, string connectionId, string password)
        {
            var user = _context.Users.First(x => x.Username.Equals(username));
            if (!(_context.Rooms.First(x => x.Id == roomId).AdminId == user.Id || _context.Rooms.First(x => x.Id == roomId).Password.Equals(password)))
                throw new System.Exception("Bad password!");

            _context.Connections.Add(new Connection
            {
                ConnectionId = connectionId,
                RoomId = roomId,
                UserId = user.Id
            });

            _context.Rooms.First(x => x.Id == roomId).Count++;
            await _context.SaveChangesAsync();
        }

        public async Task LeaveRoom(int roomId, string username)
        {
            var user = _context.Users.First(x => x.Username.Equals(username));
            _context.Connections.Remove(_context.Connections.First(x => x.RoomId == roomId && x.UserId == user.Id));
            _context.Rooms.First(x => x.Id == roomId).Count--;
            await _context.SaveChangesAsync();
        }
    }
}
