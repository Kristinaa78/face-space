using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace face_space.SignalR
{
    [Authorize]
    public class ConferenceHub : Hub
    {
        private static readonly Dictionary<string, string> connectedUsers = new Dictionary<string, string>();
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var roomId = httpContext.Request.Query["roomId"].ToString();
            var username = Context.User.FindFirst(ClaimTypes.Name)?.Value;

            connectedUsers.Add(username, roomId);

            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            await Clients.Group(roomId).SendAsync("UserConnected", username);
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
