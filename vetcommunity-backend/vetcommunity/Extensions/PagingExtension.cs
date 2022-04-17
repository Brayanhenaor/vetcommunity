namespace vetcommunity.Extensions
{
    using Microsoft.EntityFrameworkCore;
    using vetcommunity.DTOs.Request;

    public static class PagingExtension
    {
        public static async Task<(int totalRecords, int page, int totalPages, ICollection<TModel> results)> PagingAsync<TModel>(this IQueryable<TModel> queryable, PagingRequest pagingRequest)
        {
            int totalRecords = await queryable.CountAsync();
            int page = pagingRequest.Page;
            int totalPages = (int)Math.Ceiling((double)totalRecords / pagingRequest.Rows);

            ICollection<TModel> results = await queryable.Skip((pagingRequest.Page - 1) * pagingRequest.Rows).Take(pagingRequest.Rows).ToListAsync();

            return (totalRecords, page, totalPages, results);
        }
    }
}

