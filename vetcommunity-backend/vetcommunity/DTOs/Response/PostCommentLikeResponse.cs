namespace vetcommunity.DTOs.Response
{
    using vetcommunity.Data.Entities;

    public class PostCommentLikeResponse
    {
        public User User { get; set; }

        public bool Recommended { get; set; }
    }
}

