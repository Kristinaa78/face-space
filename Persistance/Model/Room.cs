using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace face_space.Persistance.Model
{
    public class Room
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string RoomName { get; set; }
        public string Password { get; set; }
        public int Participants { get; set; }
        public int Count { get; set; }
        public bool EnableVideo { get; set; }
        public bool EnableChat { get; set; }
        public int AdminId { get; set; }

        public User User { get; set; }
        public ICollection<Connection> Connections { get; set; }
    }
}
