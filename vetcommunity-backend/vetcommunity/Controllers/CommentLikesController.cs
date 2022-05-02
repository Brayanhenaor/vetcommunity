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
using vetcommunity.Resources;

namespace vetcommunity.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class CommentLikesController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public CommentLikesController(UserManager<User> userManager, DataContext dataContext, IMapper mapper)
        {
            this.userManager = userManager;
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<Response<ICollection<PostCommentLikeResponse>>>> AddLikeAsync(LikeRequest likeRequest)
        {
            string userToken = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            User user = await userManager.FindByNameAsync(userToken);

            if (user == null)
                return BadRequest(new Response
                {
                    Success = false
                });

            CommentLike currentLike = await dataContext.CommentLikes.FirstOrDefaultAsync(cl => cl.User == user && cl.PostCommentId == likeRequest.CommentId);

            if (currentLike != null)
            {
                currentLike.Recommended = likeRequest.Recommended;
            }
            else
            {
                await dataContext.CommentLikes.AddAsync(new CommentLike
                {
                    PostCommentId = likeRequest.CommentId,
                    Recommended = likeRequest.Recommended,
                    User = user
                });
            }

            await dataContext.SaveChangesAsync();

            return new Response<ICollection<PostCommentLikeResponse>>
            {
                Result = mapper.Map<ICollection<PostCommentLikeResponse>>(
                    await dataContext.CommentLikes.Where(cl => cl.PostCommentId == likeRequest.CommentId).ToListAsync())
            };
        }
    }
}

