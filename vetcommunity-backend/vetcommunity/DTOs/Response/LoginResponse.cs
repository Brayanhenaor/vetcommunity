using System;
namespace vetcommunity.DTOs.Response
{
	public class LoginResponse
	{
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public IList<string> Roles { get; set; }
    }
}

