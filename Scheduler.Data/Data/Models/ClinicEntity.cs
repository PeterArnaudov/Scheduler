using Scheduler.Models;
using System.ComponentModel.DataAnnotations;

namespace Scheduler.Data.Data.Models
{
    public class ClinicEntity : BaseEntityModel
    {
        [Key]
        public string Id { get; set; }

        public string? DisplayName { get; set; }

        public string? WebsiteUrl { get; set; }

        public IEnumerable<ApplicationUser>? Users { get; set; }

        public IEnumerable<DoctorEntity>? Doctors { get; set; }

        public IEnumerable<PatientEntity>? Patients { get; set; }
    }
}
