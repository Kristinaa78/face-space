using System;
using System.Collections.Generic;

namespace face_space.Persistance.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime createdAt { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<Room> Rooms { get; set; }
        public ICollection<Invite> Invites { get; set; }
        public ICollection<Recording> Recordings { get; set; }
    }
}
