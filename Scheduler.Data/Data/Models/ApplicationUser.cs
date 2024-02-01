using Microsoft.AspNetCore.Identity;
using Scheduler.Data.Data.Models;

namespace Scheduler.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? ClinicId { get; set; }

        public ClinicEntity? Clinic { get; set; }
    }
}