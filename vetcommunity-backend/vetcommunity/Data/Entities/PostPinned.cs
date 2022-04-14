namespace vetcommunity.Data.Entities
{
	public class PostPinned
	{
        public User User { get; set; }
        public string UserId { get; set; }
        public Post Post { get; set; }
        public int PostId { get; set; }
    }
}

