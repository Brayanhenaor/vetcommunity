namespace vetcommunity.Data.Entities
{
	public class Category
	{
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Post> Post{ get; set; }
    }
}

