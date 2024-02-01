using Scheduler.Data.Data.Models;
using Scheduler.Services.Mapping;

namespace Scheduler.Services.Models.Dtos.Appointment
{
    public class AppointmentSlotDto : IMapFrom<AppointmentEntity>
    {
        public int Id { get; set; }

        public DateTime StartDateTime { get; set; }

        public DateTime EndDateTime { get; set; }
    }
}
