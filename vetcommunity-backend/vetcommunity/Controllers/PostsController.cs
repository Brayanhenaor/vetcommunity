namespace vetcommunity.Controllers
{
    using System.Security.Claims;
    using AutoMapper;
    using System.Linq.Dynamic.Core;
    using Microsoft.AspNetCore.Mvc;
    using vetcommunity.Data;
    using vetcommunity.Data.Entities;
    using vetcommunity.DTOs.Request;
    using vetcommunity.DTOs.Response;
    using vetcommunity.Extensions;
    using vetcommunity.Resources;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;

    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public PostsController(UserManager<User> userManager, DataContext dataContext, IMapper mapper)
        {
            this.userManager = userManager;
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<Response>> AddPostAsync(PostRequest postRequest)
        {
            string userToken = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            User user = await userManager.FindByNameAsync(userToken);

            if (user == null)
                return BadRequest(new Response
                {
                    Success = false
                });
            ICollection<Category> categories = new List<Category>();

            foreach (var item in postRequest.Categories)
            {
                categories.Add(await dataContext.Categories.FindAsync(item.Id));
            }

            Post post = mapper.Map<Post>(postRequest);
            post.User = user;
            post.Categories = categories;

            await dataContext.AddAsync(post);
            await dataContext.SaveChangesAsync();

            return new Response
            {
                Message = Messages.PostPublished
            };
        }

        [HttpGet("MyPosts")]
        public async Task<ActionResult<PagingResponse<ICollection<PostResponse>>>> GetMyPostsAsync([FromQuery] PagingRequest pagingRequest)
        {
            string userToken = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            User user = await userManager.FindByNameAsync(userToken);

            if (user == null)
                return BadRequest(new Response
                {
                    Success = false
                });

            (int totalRecords, int page, int totalPages, ICollection<PostResponse> results) result = await dataContext.Posts.Where(post => post.UserId == user.Id)
                .Select(post => new PostResponse
                {
                    Id = post.Id,
                    Title = post.Title,
                    Message = post.Message,
                    Ranking = post.Ranking,
                    UrlImage = post.UrlImage,
                    CommentsCount = post.PostComments.Count(),
                    User = mapper.Map<UserResponse>(post.User),
                    Categories = mapper.Map<ICollection<CategoryResponse>>(post.Categories),
                    Date = post.Date
                }).PagingAsync(pagingRequest);


            return new PagingResponse<ICollection<PostResponse>>
            {
                TotalRecords = result.totalRecords,
                Page = result.page,
                TotalPages = result.totalPages,
                Result = mapper.Map<ICollection<PostResponse>>(result.results)
            };
        }

        [AllowAnonymous]
        [HttpGet("Search")]
        public async Task<ActionResult<PagingResponse<ICollection<PostResponse>>>> SearchPostsAsync([FromQuery] SearchPostRequest pagingRequest)
        {
            (int totalRecords, int page, int totalPages, ICollection<PostResponse> results) result = await dataContext.Posts
                .Where(post => post.Title.ToLower().Contains(pagingRequest.Query.ToLower())
                || post.Message.ToLower().Contains(pagingRequest.Query.ToLower()))
                .Select(post => new PostResponse
                {
                    Id = post.Id,
                    Title = post.Title,
                    Message = post.Message,
                    Ranking = post.Ranking,
                    UrlImage = post.UrlImage,
                    CommentsCount = post.PostComments.Count(),
                    User = mapper.Map<UserResponse>(post.User),
                    Categories = mapper.Map<ICollection<CategoryResponse>>(post.Categories),
                    Date = post.Date
                }).PagingAsync(pagingRequest);


            return new PagingResponse<ICollection<PostResponse>>
            {
                TotalRecords = result.totalRecords,
                Page = result.page,
                TotalPages = result.totalPages,
                Result = mapper.Map<ICollection<PostResponse>>(result.results)
            };
        }

        [HttpPut("AddSubtractRanking")]
        public async Task<ActionResult<Response<PostResponse>>> UpdateRankingAsync(RankingPostRequest rankingPostRequest)
        {
            Post post = await dataContext.Posts.FindAsync(rankingPostRequest.PostId);
            string userToken = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            User user = await userManager.FindByNameAsync(userToken);

            if (post == null)
                return NotFound(new Response
                {
                    Success = false,
                });

            if (post.UserId == user.Id)
                return BadRequest(new Response
                {
                    Success = false,
                    Message = Messages.AddRankingNotPermitted
                });

            post.Ranking = rankingPostRequest.Add ? post.Ranking + 1 : post.Ranking - 1;

            await dataContext.SaveChangesAsync();

            return new Response<PostResponse>
            {
                Result = mapper.Map<PostResponse>(post)
            };
        }

        [AllowAnonymous]
        [HttpGet("All")]
        public async Task<ActionResult<PagingResponse<ICollection<PostResponse>>>> GetPostsAsync([FromQuery] PostsRequest pagingRequest)
        {
            List<PagingRequest> d = new List<PagingRequest>();
            (int totalRecords, int page, int totalPages, ICollection<PostResponse> results) result = await dataContext.Posts
                .Select(post => new PostResponse
                {
                    Id = post.Id,
                    Title = post.Title,
                    Message = post.Message,
                    Ranking = post.Ranking,
                    UrlImage = post.UrlImage,
                    CommentsCount = post.PostComments.Count(),
                    User = mapper.Map<UserResponse>(post.User),
                    Categories = mapper.Map<ICollection<CategoryResponse>>(post.Categories),
                    Date = post.Date
                })
                .OrderBy($"{pagingRequest.OrderBy} DESC")
                .PagingAsync(pagingRequest);


            return new PagingResponse<ICollection<PostResponse>>
            {
                TotalRecords = result.totalRecords,
                Page = result.page,
                TotalPages = result.totalPages,
                Result = mapper.Map<ICollection<PostResponse>>(result.results)
            };
        }
    }
}

