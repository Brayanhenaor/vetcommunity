using System.ComponentModel.DataAnnotations;

namespace vetcommunity.DTOs.Request
{
    public class ValidateOtpRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Otp { get; set; }
    }
}

