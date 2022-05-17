using System;
using System.ComponentModel.DataAnnotations;

namespace vetcommunity.DTOs.Request
{
	public class RegisterRequest
	{
        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public bool IsVeterinary { get; set; }
    }
}

