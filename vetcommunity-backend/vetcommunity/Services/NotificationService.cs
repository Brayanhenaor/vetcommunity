using Microsoft.AspNetCore.SignalR;
using vetcommunity.Data;
using vetcommunity.Data.Entities;
using vetcommunity.Hubs;

namespace vetcommunity.Services
{
    public class NotificationService : INotificationService
    {
        private readonly DataContext dataContext;
        private readonly IHubContext<NotificationHub, INotificationClient> hubContext;

        public NotificationService(DataContext dataContext, IHubContext<NotificationHub, INotificationClient> hubContext)
        {
            this.dataContext = dataContext;
            this.hubContext = hubContext;
        }

        public async Task SendPostCommentNotification(User author, string commentAuthorName, int postId, string postTitle)
        {
            await dataContext.Notifications.AddAsync(new Notification
            {
                UserId = author.Id,
                Message = $"{commentAuthorName} comentó tu pregunta \"{postTitle}\"",
                PostId = postId
            });

            await dataContext.SaveChangesAsync();

            await hubContext.Clients.Groups(author.UserName).RefreshNotifications();
        }
    }
}

