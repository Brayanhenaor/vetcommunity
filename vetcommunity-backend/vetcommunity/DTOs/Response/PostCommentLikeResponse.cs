namespace vetcommunity.DTOs.Response
{
    public class PostCommentLikeResponse
    {
        public UserResponse User { get; set; }

        public bool Recommended { get; set; }
    }
}

