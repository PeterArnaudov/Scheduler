using Scheduler.Data.Data.Models;
using Scheduler.Services.Mapping;

namespace Scheduler.Services.Models.Dtos
{
    public class AppointmentTypeDto : IMapFrom<AppointmentTypeEntity>
    {
        public int? Id { get; set; }

        public string? Name { get; set; }

        public int? DoctorId { get; set; }
    }
}
