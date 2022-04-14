namespace vetcommunity.DTOs.Response
{
	public class PostResponse
	{
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public int Ranking { get; set; }
        public string UrlImage { get; set; }

        public int CommentsCount { get; set; }

        public ICollection<CategoryResponse> Categories { get; set; }
    }
}

