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
using face_space.Exceptions;

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
        public async Task<IActionResult> CreateUser([FromBody] RegisterDTO register)
        {
            UserDTO result;
            try
            {
                result = await _service.CreateUser(register);
                HttpContext.Response.Cookies.Append(
                   "Token",
                   result.Token,
                   new CookieOptions
                   {
                       HttpOnly = true
                   });
                return Ok(result);
            }
            catch (Exception ex)
            {
                if (ex is UsernameAlreadyInUseException)
                    return StatusCode((int)HttpStatusCode.Conflict, ex.Message);
                else
                    return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginDTO login)
        {
            UserDTO result;
            try
            {
                result = await _service.LoginUser(login);

                HttpContext.Response.Cookies.Append(
                    "Token",
                    result.Token,
                    new CookieOptions
                    {
                        HttpOnly = true
                    });
                return Ok(result);
            }
            catch (Exception ex)
            {
                if (ex is UserNotFoundException)
                    return StatusCode((int)HttpStatusCode.NotFound, ex.Message);
                else if (ex is IncorrectLoginDataException)
                    return StatusCode((int)HttpStatusCode.Unauthorized, ex.Message);
                else
                    return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpDelete("sign-out")]
        public async Task<IActionResult> SignOut()
        {
            HttpContext.Response.Cookies.Delete("Token");
            return Ok();
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<IActionResult> GetUsers()
        {
            List<UserDTO> result;
            try
            {
                result = await _service.GetUsers();
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
            try
            {
                string result = User.Identity.Name;
                return Ok(new { name = result });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] RegisterDTO userDTO)
        {
            try
            {
                return Ok(await _service.ResetPassword(userDTO));
            }
            catch (Exception ex)
            {
                if (ex is UserNotFoundException)
                    return StatusCode((int)HttpStatusCode.NotFound, ex.Message);
                else
                    return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }


    }
}
