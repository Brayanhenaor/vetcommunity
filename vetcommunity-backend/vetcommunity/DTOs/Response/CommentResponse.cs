namespace vetcommunity.DTOs.Response
{
	public class CommentResponse
	{
        public int Id { get; set; }

        public int PostId { get; set; }

        public UserResponse User { get; set; }

        public string Comment { get; set; }

        public DateTime Date { get; set; }

        public ICollection<PostCommentLikeResponse> CommentLikes { get; set; }
    }
}

