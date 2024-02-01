using System.Net.Mail;
using System.Net;
using Scheduler.Services.Interfaces;
using Microsoft.Extensions.Options;
using Scheduler.Common.Settings;

namespace Scheduler.Services.Services
{
    public class EmailService : IEmailService
    {
        private readonly SmtpSettings smtpSettings;

        public EmailService(
            IOptions<SmtpSettings> smtpSettings)
        {
            this.smtpSettings = smtpSettings.Value;
        }

        public async Task SendEmailAsync(
            string receiver,
            string subject,
            string message)
        {
            SmtpClient client = new SmtpClient
            {
                Port = smtpSettings.Port,
                Host = smtpSettings.Host,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(smtpSettings.UserName, smtpSettings.Password)
            };

            await client.SendMailAsync(smtpSettings.UserName, receiver, subject, message);
        }
    }
}
