namespace vetcommunity.Data.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }

        public Post(string title, string message, string urlImage)
        {
            Message = message;
            Title = title;
            UrlImage = urlImage;
        }

        public string Message { get; set; }
        public int Ranking { get; set; }
        public string UrlImage { get; set; }

        public User User { get; set; }
    }
}

