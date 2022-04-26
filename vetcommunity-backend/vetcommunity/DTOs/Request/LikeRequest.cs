namespace vetcommunity.DTOs.Request
{
    using System.ComponentModel.DataAnnotations;

    public class LikeRequest
    {
        [Required]
        public int CommentId { get; set; }
        [Required]
        public bool Recommended { get; set; }
    }
}

