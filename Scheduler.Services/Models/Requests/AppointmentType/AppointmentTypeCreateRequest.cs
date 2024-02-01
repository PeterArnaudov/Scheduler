namespace Scheduler.Services.Models.Requests.AppointmentType
{
    public class AppointmentTypeCreateRequest
    {
        public string? Name { get; set; }

        public IEnumerable<int>? Doctors { get; set; }
    }
}
