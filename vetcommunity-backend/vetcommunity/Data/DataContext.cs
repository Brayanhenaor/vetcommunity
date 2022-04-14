namespace vetcommunity.Data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using vetcommunity.Data.Entities;

    public class DataContext : IdentityDbContext
    {
        public DbSet<Post> Posts { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}

