namespace vetcommunity.Data.Entities
{
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser
    {
        public string UrlPhoto { get; set; }
        public string AboutMe { get; set; }

        public ICollection<Post> Posts { get; set; }
    }
}

