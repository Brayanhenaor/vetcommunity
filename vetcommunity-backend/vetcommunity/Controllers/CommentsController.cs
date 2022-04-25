using System;
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
using vetcommunity.Extensions;
using vetcommunity.Resources;

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

        public CommentsController(DataContext dataContext, UserManager<User> userManager, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.userManager = userManager;
            this.mapper = mapper;
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

            PostComment comment = mapper.Map<PostComment>(commentRequest);
            comment.User = user;

            await dataContext.PostComments.AddAsync(comment);
            await dataContext.SaveChangesAsync();

            return Created(string.Empty, new Response
            {
                Message = Messages.CommentCreated
            });
        }

        [HttpGet()]
        public async Task<ActionResult<PagingResponse<ICollection<CommentResponse>>>> GetCommentsAsync([FromQuery] PostCommentRequest postCommentRequest)
        {
            string userToken = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            User user = await userManager.FindByNameAsync(userToken);

            if (user == null)
                return BadRequest(new Response
                {
                    Success = false
                });

            (int totalRecords, int page, int totalPages, ICollection<PostComment> results) result =
                await dataContext.PostComments.Where(pc => pc.PostId == postCommentRequest.IdPost)
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

