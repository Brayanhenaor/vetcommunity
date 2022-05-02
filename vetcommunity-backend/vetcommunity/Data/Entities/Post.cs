namespace vetcommunity.Data.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string Title { get; set; }
        public string Message { get; set; }
        public int Ranking { get; set; }
        public string UrlImage { get; set; }

        public User User { get; set; }
        public string UserId { get; set; }

        public ICollection<Category> Categories { get; set; }
        public ICollection<PostComment> PostComments { get; set; }
        public ICollection<PostPinned> PostPinneds { get; set; }
    }
}

