using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace face_space.Application.Dtos
{
    public class RegisterDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
