using System;
using System.ComponentModel.DataAnnotations;

namespace vetcommunity.DTOs.Request
{
    public class CommentRequest : PagingRequest
    {
        [Required]
        public int PostId { get; set; }

        [Required]
        public string Comment { get; set; }
    }
}

