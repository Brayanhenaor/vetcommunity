using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vetcommunity.Data;
using vetcommunity.DTOs.Response;

namespace vetcommunity.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public CategoriesController(DataContext dataContext, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<Response<ICollection<CategoryResponse>>> GetCategoriesAsync()
        {
            return new Response<ICollection<CategoryResponse>>
            {
                Result = mapper.Map<ICollection<CategoryResponse>>(await dataContext.Categories.ToListAsync())
            };
        }
    }
}

