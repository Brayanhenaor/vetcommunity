namespace vetcommunity.Services
{
	public interface IMailService
	{
		void SendOtpMail(string otp, string userEmail);
	}
}

