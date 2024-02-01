using Scheduler.Data.Data.Models;
using Scheduler.Services.Mapping;

namespace Scheduler.Services.Models.Dtos.Patient
{
    public class PatientDto : IMapFrom<PatientEntity>
    {
        public int? Id { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }
    }
}
