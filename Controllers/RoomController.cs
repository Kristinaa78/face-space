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
    [Authorize]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _service;
        public RoomController(IRoomService service) 
        {
            _service = service;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRoom([FromBody] RoomDTO room)
        {
            RoomDTO result;
            try
            {
                string user = User.Identity.Name;
                result = await _service.CreateRoom(room, user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{rommId}")]
        public async Task<IActionResult> DeleteRoom([FromRoute] int roomId)
        {
            try
            {
                string user = User.Identity.Name;
                await _service.DeleteRoom(roomId, user);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetRooms()
        {
            List<RoomDTO> result;
            try
            {
                string user = User.Identity.Name;
                result = await _service.GetRooms(user);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
            return Ok(result);
        }
    }
}
