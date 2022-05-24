namespace vetcommunity.DTOs.Request
{
    using System.ComponentModel.DataAnnotations;

    public class OtpRequest
    {
        [Required]
        public string Email { get; set; }
    }
}

