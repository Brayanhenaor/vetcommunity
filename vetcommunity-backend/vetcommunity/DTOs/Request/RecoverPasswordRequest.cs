
namespace vetcommunity.DTOs.Request
{
    using System.ComponentModel.DataAnnotations;

	public class RecoverPasswordRequest
	{
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Token { get; set; }
    }
}

