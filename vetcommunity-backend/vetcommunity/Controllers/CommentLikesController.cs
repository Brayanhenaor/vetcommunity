using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        public CommentLikesController(UserManager<User> userManager, DataContext dataContext)
        {
            this.userManager = userManager;
            this.dataContext = dataContext;
        }

        [HttpPost]
        public async Task<ActionResult<Response>> AddLikeAsync(LikeRequest likeRequest)
        {
            string userToken = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            User user = await userManager.FindByNameAsync(userToken);

            if (user == null)
                return BadRequest(new Response
                {
                    Success = false
                });

            await dataContext.CommentLikes.AddAsync(new CommentLike
            {
                PostCommentId = likeRequest.CommentId,
                Recommended = likeRequest.Recommended,
                User = user
            });
            await dataContext.SaveChangesAsync();

            return new Response();
        }
    }
}

