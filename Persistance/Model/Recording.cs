using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace face_space.Persistance.Model
{
    public class Recording
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}
