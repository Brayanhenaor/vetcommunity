using System;
using System.ComponentModel.DataAnnotations;

namespace vetcommunity.DTOs.Request
{
	public class PostCommentRequest : PagingRequest
    {
        [Required]
        public int IdPost { get; set; }
    }
}

