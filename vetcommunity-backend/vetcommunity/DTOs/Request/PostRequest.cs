using System.ComponentModel.DataAnnotations;

namespace vetcommunity.DTOs.Request
{
    public class PostRequest
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Title { get; set; }
        [Required]
        public string Message { get; set; }

        public string UrlImage { get; set; }

        [Required]
        public List<CategoryRequest> Categories { get; set; }
    }
}

