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
    using vetcommunity.DTOs.Response;

    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;
        private readonly IMapper mapper;

        public NotificationsController(DataContext dataContext, UserManager<User> userManager, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Response<ICollection<NotificationResponse>>>> GetNotificationsAsync()
        {
            string userToken = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            User user = await userManager.FindByNameAsync(userToken);

            if (user == null)
                return BadRequest(new Response
                {
                    Success = false
                });

            return new Response<ICollection<NotificationResponse>>
            {
                Result = mapper.Map<ICollection<NotificationResponse>>(await dataContext.Notifications.Where(notification => notification.UserId == user.Id).
                OrderByDescending(notification => notification.Id)
                .Take(15)
                .ToListAsync())
            };
        }
    }
}

