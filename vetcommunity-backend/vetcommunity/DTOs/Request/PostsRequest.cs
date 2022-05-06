namespace vetcommunity.DTOs.Request
{
    using vetcommunity.Enums;

    public class PostsRequest : PagingRequest
	{
        public PostOrder OrderBy { get; set; } = PostOrder.Date;
    }
}

