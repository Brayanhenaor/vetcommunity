namespace vetcommunity.Data.Entities
{
	public class Notification
	{
        public int Id { get; set; }
        public string Message { get; set; }
        public bool Viewed { get; set; }

        public User User { get; set; }
    }
}

