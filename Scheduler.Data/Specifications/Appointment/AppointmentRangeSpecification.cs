using Scheduler.Data.Data.Models;

namespace Scheduler.Data.Specifications.Appointment
{
    public class AppointmentRangeSpecification : BaseSpecification<AppointmentEntity>
    {
        public AppointmentRangeSpecification(
            DateTime startDateTime,
            DateTime endDateTime)
        {
            Criteria = appointment =>
                appointment.StartDateTime.Date >= startDateTime.Date &&
                appointment.StartDateTime.Date <= endDateTime.Date &&
                appointment.StartDateTime.TimeOfDay >= startDateTime.TimeOfDay &&
                appointment.EndDateTime.TimeOfDay <= endDateTime.TimeOfDay;
        }
    }
}
