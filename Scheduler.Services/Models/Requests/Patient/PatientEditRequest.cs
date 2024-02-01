namespace Scheduler.Services.Models.Requests.Patient
{
    public class PatientEditRequest
    {
        public int? Id { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }
    }
}
