namespace vetcommunity.Hubs
{
    using System;
    using System.Collections.Concurrent;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.SignalR;

    [Authorize]
    public class NotificationHub : Hub<INotificationClient>
    {
        public static Dictionary<string, string> Connections = new Dictionary<string, string>();

        public override Task OnConnectedAsync()
        {
            Groups.AddToGroupAsync(Context.ConnectionId, Context.User.Identity.Name);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            Groups.RemoveFromGroupAsync(Context.ConnectionId, Context.User.Identity.Name);

            return base.OnDisconnectedAsync(exception);
        }
    }
}

