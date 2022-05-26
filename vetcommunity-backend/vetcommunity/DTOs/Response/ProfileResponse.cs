using System;
namespace vetcommunity.DTOs.Response
{
	public class ProfileResponse
	{
        public string Id { get; set; }

        public string  UrlPhoto { get; set; }

        public string FullName { get; set; }

        public bool IsVeterinary { get; set; }

        public string AboutMe { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }
    }
}

