using Scheduler.Data.Data.Models;
using Scheduler.Services.Mapping;

namespace Scheduler.Services.Models.Dtos.Doctor
{
    public class DoctorDto : IMapFrom<DoctorEntity>
    {
        public int? Id { get; set; }

        public string? Name { get; set; } = null;

        public string? Description { get; set; } = null;

        public string? Image { get; set; } = null;

        public string? Color { get; set; } = null;
    }
}
