namespace Scheduler.Services.Models.Requests
{
    public class AppointmentSubmitRequest
    {
        public int AppointmentId { get; set; }

        public int? AppointmentTypeId { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string Phone { get; set; }

        public bool IsQuickAppointment => !string.IsNullOrEmpty(Phone) &&
            (string.IsNullOrEmpty(Name) || string.IsNullOrEmpty(Email));
    }
}
