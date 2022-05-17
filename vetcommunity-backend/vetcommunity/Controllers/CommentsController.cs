using System;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic;
using vetcommunity.Data;
using vetcommunity.Data.Entities;
using vetcommunity.DTOs.Request;
using vetcommunity.DTOs.Response;
using vetcommunity.Extensions;
using vetcommunity.Resources;
using Microsoft.AspNetCore.SignalR;
using vetcommunity.Hubs;
using vetcommunity.Services;

namespace vetcommunity.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;
        private readonly IMapper mapper;
        private readonly INotificationService notificationService;

        public CommentsController(DataContext dataContext, UserManager<User> userManager, IMapper mapper, INotificationService notificationService)
        {
            this.dataContext = dataContext;
            this.userManager = userManager;
            this.mapper = mapper;
            this.notificationService = notificationService;
        }

        [HttpPost]
        public async Task<ActionResult<Response>> AddCommentAsync(CommentRequest commentRequest)
        {
            string userToken = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            User user = await userManager.FindByNameAsync(userToken);

            if (user == null)
                return BadRequest(new Response
                {
                    Success = false
                });
            Post post = await dataContext.Posts.Where(post => post.Id == commentRequest.PostId).Select(post => new Post
            {
                Id = post.Id,
                User = post.User,
                Title = post.Title
            }).FirstOrDefaultAsync();

            await notificationService.SendPostCommentNotification(post.User, user.FullName, post.Id, post.Title);

            PostComment comment = mapper.Map<PostComment>(commentRequest);
            comment.User = user;

            await dataContext.PostComments.AddAsync(comment);
            await dataContext.SaveChangesAsync();

            return Created(string.Empty, new Response<CommentResponse>
            {
                Message = Messages.CommentCreated,
                Result = mapper.Map<CommentResponse>(comment)
            });
        }

        [AllowAnonymous]
        [HttpGet()]
        public async Task<ActionResult<PagingResponse<ICollection<CommentResponse>>>> GetCommentsAsync([FromQuery] PostCommentRequest postCommentRequest)
        {
            (int totalRecords, int page, int totalPages, ICollection<PostComment> results) result =
                await dataContext.PostComments.Where(pc => pc.PostId == postCommentRequest.IdPost)
                .OrderByDescending(pc => pc.Date)
                .Include(pc => pc.User)
                .Include(pc => pc.CommentLikes)
                .ThenInclude(cl => cl.User)
                .PagingAsync(postCommentRequest);


            return new PagingResponse<ICollection<CommentResponse>>
            {
                TotalRecords = result.totalRecords,
                Page = result.page,
                TotalPages = result.totalPages,
                Result = mapper.Map<ICollection<CommentResponse>>(result.results)
            };
        }
    }
}

