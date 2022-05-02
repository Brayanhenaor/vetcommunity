using Newtonsoft.Json;

namespace vetcommunity.Data.Entities
{
	public class PostComment
	{
        public int Id { get; set; }

        public Post Post { get; set; }
        public int PostId { get; set; }

        public User User { get; set; }
        public string UserId { get; set; }

        public string Comment { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public ICollection<CommentLike> CommentLikes { get; set; }
    }
}

