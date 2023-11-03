using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace face_space.Persistance.Model
{
    public class Connection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string ConnectionId { get; set; }
        public int UserId { get; set; }
        public int RoomId { get; set; }

        public User User { get; set; }
        public Room Room { get; set; }
    }
}
