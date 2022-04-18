namespace vetcommunity.Data
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using vetcommunity.Data.Entities;
    using vetcommunity.Enums;

    public class DataContext : IdentityDbContext<User>
    {
        public DbSet<Post> Posts { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<PostComment> PostComments { get; set; }
        public DbSet<CommentLike> CommentLikes { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<PostPinned>().HasKey(pp => new { pp.PostId, pp.UserId });

            builder.Entity<CommentLike>().HasKey(cl => new { cl.UserId, cl.PostCommentId });

            string adminId = Guid.NewGuid().ToString();
            string normalId = Guid.NewGuid().ToString();
            string vetId = Guid.NewGuid().ToString();

            string userId = Guid.NewGuid().ToString();

            SeedRoles(builder, adminId, normalId, vetId);
            SeedAdminUser(builder, userId, adminId);

            base.OnModelCreating(builder);
        }

        public void SeedRoles(ModelBuilder builder, string adminId, string normalId, string vetId)
        {
            builder.Entity<IdentityRole>().HasData(new List<IdentityRole>
            {
              new IdentityRole {
                Id = adminId,
                Name = UserRole.Admin.ToString(),
                NormalizedName = UserRole.Admin.ToString().ToUpper()
              },
              new IdentityRole {
                Id = normalId,
                Name = UserRole.Normal.ToString(),
                NormalizedName = UserRole.Normal.ToString().ToUpper()
              },
              new IdentityRole {
                Id = vetId,
                Name = UserRole.Vet.ToString(),
                NormalizedName = UserRole.Vet.ToString().ToUpper()
              },
            });
        }

        public void SeedAdminUser(ModelBuilder builder, string userId, string adminId)
        {
            PasswordHasher<User> hasher = new PasswordHasher<User>();

            builder.Entity<User>().HasData(new User
            {
                Id = userId,
                UserName = "admin@admin.com",
                NormalizedUserName = "ADMIN@ADMIN.COM",
                PasswordHash = hasher.HashPassword(null, "591236bh!"),
                FullName = "User Admin",
                UrlPhoto = "https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
            });

            builder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = adminId,
                    UserId = userId
                }
            );
        }
    }
}

