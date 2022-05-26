using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vetcommunity.Data;
using vetcommunity.Data.Entities;
using vetcommunity.DTOs.Response;
using vetcommunity.Resources;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace vetcommunity.Controllers
{
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;
        private readonly IMapper mapper;

        public ProfileController(DataContext dataContext, UserManager<User> userManager, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Response<ICollection<ProfileResponse>>>> GetProfileAsync(string email)
        {
            ICollection<ProfileResponse> result = await dataContext.Users
                .Select(user => new ProfileResponse()
                {
                     Id = user.Id,
                     FullName = user.FullName,
                     UrlPhoto = user.UrlPhoto,
                     Email = user.Email,
                     AboutMe = user.AboutMe,
                     PhoneNumber = user.PhoneNumber
                })
                .Where(user => user.Email == email)
                .ToListAsync();
              
            return new Response<ICollection<ProfileResponse>>
            {
                Result = mapper.Map<ICollection<ProfileResponse>>(result)
            };
        }
    }
}

