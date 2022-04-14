namespace vetcommunity.Data.Entities
{
	public class CommentLike
	{
        public PostComment PostComment { get; set; }
        public int PostCommentId { get; set; }

        public User User { get; set; }
        public string UserId { get; set; }

        public bool Recommended { get; set; }
    }
}

