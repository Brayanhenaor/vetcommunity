namespace vetcommunity.Profiles
{
    using AutoMapper;
    using vetcommunity.Data.Entities;
    using vetcommunity.DTOs.Request;
    using vetcommunity.DTOs.Response;

    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<PostRequest, Post>();
            CreateMap<CategoryRequest, Category>();
            CreateMap<Category, CategoryResponse>();
            CreateMap<User, UserResponse>();
            CreateMap<Post, PostResponse>().ForMember(pr=> pr.CommentsCount, p=> p.MapFrom(p=> p.PostComments.Count));
            CreateMap<CommentRequest, PostComment>();
            CreateMap<PostComment, CommentResponse>();
            CreateMap<CommentLike, PostCommentLikeResponse>();
            CreateMap<Notification, NotificationResponse>();
        }
    }
}

