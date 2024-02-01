using System.ComponentModel.DataAnnotations;

namespace Scheduler.Data.Data.Models
{
    public class PatientEntity : BaseEntityModel
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string? ClinicId { get; set; }

        public ClinicEntity? Clinic { get; set; }

        public IEnumerable<AppointmentEntity>? Appointments { get; set; } = null;
    }
}
