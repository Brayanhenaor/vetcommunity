namespace vetcommunity.Data.Entities
{
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser
    {
        public string UrlPhoto { get; set; }
        public string AboutMe { get; set; }
        public string FullName { get; set; }
        public bool IsVeterinary { get; set; }

        public ICollection<Post> Posts { get; set; }
        public ICollection<PostPinned> PostPinneds { get; set; }
        public ICollection<CommentLike> CommentLikes { get; set; }
    }
}

