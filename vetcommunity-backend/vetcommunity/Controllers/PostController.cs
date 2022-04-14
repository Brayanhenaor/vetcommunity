namespace vetcommunity.Controllers
{
    using System.Security.Claims;
    using AutoMapper;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using vetcommunity.Data;
    using vetcommunity.Data.Entities;
    using vetcommunity.DTOs.Request;
    using vetcommunity.DTOs.Response;
    using vetcommunity.Resources;

    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public PostController(UserManager<User> userManager, DataContext dataContext, IMapper mapper)
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

            Post post = mapper.Map<Post>(postRequest);
            post.User = user;

            await dataContext.AddAsync(post);
            await dataContext.SaveChangesAsync();

            return new Response
            {
                Message = Messages.PostPublished
            };
        }

        [HttpGet("MyPosts")]
        public async Task<ActionResult<Response>> GetMyPostsAsync()
        {
            string userToken = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            User user = await userManager.FindByNameAsync(userToken);

            if (user == null)
                return BadRequest(new Response
                {
                    Success = false
                });

            return new Response<ICollection<PostResponse>>
            {
                Result = await dataContext.Posts.Where(post => post.UserId == user.Id)
                .Select(post => new PostResponse
                {
                    Id = post.Id,
                    Title = post.Title,
                    Message = post.Message,
                    Ranking = post.Ranking,
                    UrlImage = post.UrlImage,
                    CommentsCount = post.PostComments.Count(),
                    Categories = mapper.Map<ICollection<CategoryResponse>>(post.Categories),
                    Date = post.Date
                }).ToListAsync()
            };
        }
    }
}

