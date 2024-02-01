using System.ComponentModel.DataAnnotations;

namespace Scheduler.Data.Data.Models
{
    public class AppointmentEntity : BaseEntityModel
    {
        [Key]
        public int Id { get; set; }

        public int DoctorId { get; set; }

        public DoctorEntity? Doctor { get; set; } = null;

        public int? PatientId { get; set; } = null;

        public PatientEntity? Patient { get; set; } = null;

        public int? AppointmentTypeId { get; set; } = null;

        public AppointmentTypeEntity? AppointmentType { get; set; } = null;

        public DateTime StartDateTime { get; set; }

        public DateTime EndDateTime { get; set; }

        public bool IsFree { get; set; } = true;

        public string? ClinicId { get; set; }

        public ClinicEntity? Clinic { get; set; }
    }
}
