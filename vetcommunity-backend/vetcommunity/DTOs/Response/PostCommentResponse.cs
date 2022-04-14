using System;
using vetcommunity.Data.Entities;

namespace vetcommunity.DTOs.Response
{
	public class PostCommentResponse
	{
        public int Id { get; set; }

        public User User { get; set; }

        public string Comment { get; set; }

        public ICollection<CommentLike> CommentLikes { get; set; }

    }
}

