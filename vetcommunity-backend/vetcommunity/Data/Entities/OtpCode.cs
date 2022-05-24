namespace vetcommunity.Data.Entities
{
	public class OtpCode
	{
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string Otp { get; set; }
        public DateTime GenerationDate { get; set; }
        public DateTime ExpireDate { get; set; }
    }
}

