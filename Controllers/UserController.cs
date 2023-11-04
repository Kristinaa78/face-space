using face_space.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System;
using face_space.Persistance.Model;

namespace face_space.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        public UserController(IUserService service) 
        {
            _service = service;
        }

        [HttpGet("create")]
        public async Task<IActionResult> CreateUser()
        {
            User result;
            try
            {
                result = await _service.createUser("", "");
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
            return Ok(result);
        }


        [HttpGet()]
        public async Task<IActionResult> GetUsers()
        {
            List<User> result;
            try
            {
                result = await _service.getUsers();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
            return Ok(result);
        }
    }
}
