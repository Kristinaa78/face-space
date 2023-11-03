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
        public string Name { get; set; }
        public int Count { get; set; }
        public int AdminId { get; set; }

        public User User { get; set; }
        public ICollection<Connection> Connections { get; set; }
    }
}
