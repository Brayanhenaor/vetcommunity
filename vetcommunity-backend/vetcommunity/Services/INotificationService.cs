using vetcommunity.Data.Entities;

namespace vetcommunity.Services
{
    public interface INotificationService
    {
        Task SendPostCommentNotification(User author, string commentAuthorName, int postId, string postTitle);
    }
}

