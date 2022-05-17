namespace vetcommunity.DTOs.Request
{
    using System.ComponentModel.DataAnnotations;

    public class SearchPostRequest : PagingRequest
    {
        [Required]
        public string Query { get; set; }
    }
}

