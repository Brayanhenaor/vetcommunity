namespace vetcommunity.DTOs.Response
{
    public class NotificationResponse
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public bool Viewed { get; set; }
        public int PostId { get; set; }

        public UserResponse User { get; set; }
    }
}

