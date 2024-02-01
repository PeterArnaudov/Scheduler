using System.ComponentModel.DataAnnotations;

namespace Scheduler.Data.Data.Models
{
    public class DoctorEntity : BaseEntityModel
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; } = null;

        public string? Description { get; set; } = null;

        public string? Image { get; set; } = null;

        public string? Color { get; set; } = null;

        public string? ClinicId { get; set; }

        public ClinicEntity? Clinic { get; set; }

        public IEnumerable<AppointmentEntity>? Appointments { get; set; } = null;
    }
}
