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
        public DbSet<PostComment> PostComments { get; set; }
        public DbSet<CommentLike> CommentLikes { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<PostPinned>().HasKey(pp => new { pp.PostId, pp.UserId });

            builder.Entity<PostPinned>()
                .HasOne(pp => pp.Post)
                .WithMany(p => p.PostPinneds)
                .HasForeignKey(pp => pp.PostId);


            builder.Entity<PostPinned>()
                .HasOne(pp => pp.User)
                .WithMany(u => u.PostPinneds)
                .HasForeignKey(pp => pp.UserId);

            builder.Entity<CommentLike>().HasKey(cl => new { cl.UserId, cl.PostCommentId });

            builder.Entity<CommentLike>()
                .HasOne(cl => cl.PostComment)
                .WithMany(pc => pc.CommentLikes)
                .HasForeignKey(cl => cl.PostCommentId);


            builder.Entity<CommentLike>()
                .HasOne(cl => cl.User)
                .WithMany(u => u.CommentLikes)
                .HasForeignKey(cl => cl.UserId);
        }
    }
}

