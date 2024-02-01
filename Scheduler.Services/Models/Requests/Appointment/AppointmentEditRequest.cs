namespace Scheduler.Services.Models.Requests.Appointment
{
    public class AppointmentEditRequest
    {
        public int Id { get; set; }

        public bool IsFree { get; set; }

        public DateTime StartDateTime { get; set; }

        public DateTime EndDateTime { get; set; }

        public int? TypeId { get; set; }

        public int DoctorId { get; set; }

        public int? PatientId { get; set; }
    }
}
