using System;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace vetcommunity.Services
{
    public class MailService : IMailService
    {
        private readonly IConfiguration configuration;

        public MailService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void SendOtpMail(string otp, string userEmail)
        {
            string from = configuration["Mail:From"];
            string smtpValue = configuration["Mail:Smtp"];
            string port = configuration["Mail:Port"];
            string password = configuration["Mail:Password"];

            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(from));
            email.To.Add(MailboxAddress.Parse(userEmail));
            email.Subject = "Vets community - Recuperar clave";
            email.Body = new TextPart(TextFormat.Html) { Text = $"<h1>Codigo: {otp}</h1>" };

            using var smtp = new SmtpClient();
            smtp.Connect(smtpValue, int.Parse(port), SecureSocketOptions.StartTls);
            smtp.Authenticate(from, password);
            smtp.Send(email);
            smtp.Disconnect(true);

        }
    }
}

