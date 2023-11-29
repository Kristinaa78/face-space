using face_space.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System;
using face_space.Persistance.Model;
using face_space.Application.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

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

        [HttpPost("register")]
        public async Task<IActionResult> CreateUser([FromBody] RegisterDto register)
        {
            UserDto result;
            try
            {
                result = await _service.createUser(register);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
            HttpContext.Response.Cookies.Append(
                "Token",
                result.Token,
                new CookieOptions
                {
                    HttpOnly = true
                });
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> loginUser([FromBody] LoginDto login)
        {
            UserDto result;
            try
            {
                result = await _service.loginUser(login);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
            HttpContext.Response.Cookies.Append(
                "Token",
                result.Token,
                new CookieOptions
                {
                    HttpOnly = true
                });
            return Ok(result);
        }

        [HttpDelete("sign-out")]
        public async Task<IActionResult> SignOut()
        {
            HttpContext.Response.Cookies.Delete("Token");

            //Response.Cookies.Delete("access_token");
            return Ok();
        }

        [Authorize]
        [HttpGet()]
        public async Task<IActionResult> GetUsers()
        {
            List<UserDto> result;
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

        [Authorize]
        [HttpGet("user")]
        public async Task<IActionResult> GetUser()
        {
            string result = User.Identity.Name;
            try
            {
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
            return Ok(new { name = result});
        }
    }
}
