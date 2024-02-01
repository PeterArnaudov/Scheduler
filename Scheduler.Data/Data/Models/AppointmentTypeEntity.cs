using System.ComponentModel.DataAnnotations;

namespace Scheduler.Data.Data.Models
{
    public class AppointmentTypeEntity : BaseEntityModel
    {
        [Key]
        public int Id { get; set; }

        public int? DoctorId { get; set; }

        public DoctorEntity? Doctor { get; set; }

        public string? Name { get; set; } = null;

        public string? ClinicId { get; set; }

        public ClinicEntity? Clinic { get; set; }
    }
}
