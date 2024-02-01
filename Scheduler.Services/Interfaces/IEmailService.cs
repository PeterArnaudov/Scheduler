namespace Scheduler.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(
            string receiver,
            string subject,
            string message);
    }
}
