using face_space.Persistance.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Security.Claims;
using System.Threading.Tasks;

namespace face_space.SignalR
{
    [Authorize]
    public class ConferenceHub : Hub
    {
        private readonly IRoomRepository _roomRepository;
        public ConferenceHub(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }
        private static readonly Dictionary<string, string> connectedUsers = new Dictionary<string, string>();
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var roomId = httpContext.Request.Query["roomId"].ToString();
            var username = Context.User.FindFirst(ClaimTypes.Name)?.Value;
            
            await _roomRepository.JoinRoom(Int32.Parse(roomId), username, Context.ConnectionId);

            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            await Clients.Group(roomId).SendAsync("UserConnected", username);
            await Clients.Group(roomId).SendAsync("AllConnected", connectedUsers.Keys);
            connectedUsers.Add(username, roomId);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var username = Context.User.FindFirst(ClaimTypes.Name)?.Value;
            var httpContext = Context.GetHttpContext();
            var roomId = httpContext.Request.Query["roomId"].ToString();

            await _roomRepository.LeaveRoom(Int32.Parse(roomId), username);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string content)
        {
            var username = Context.User.FindFirst(ClaimTypes.Name)?.Value;

            connectedUsers.TryGetValue(username, out var room);

            var message = new
            {
                SenderUsername = username,
                Content = content,
                MessageSent = DateTime.Now
            };
            await Clients.Group(room).SendAsync("NewMessage", message);
        }
    }
}
