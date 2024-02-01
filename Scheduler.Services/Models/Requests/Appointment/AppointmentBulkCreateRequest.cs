namespace Scheduler.Services.Models.Requests.Appointment
{
    public class AppointmentBulkCreateRequest
    {
        public DateTime StartDateTime { get; set; }

        public DateTime EndDateTime { get; set; }

        public int Duration { get; set; }

        public int Interval { get; set; }

        public IEnumerable<int> Doctors { get; set; }

        public IEnumerable<DayOfWeek> WeekDays { get; set; }
    }
}
