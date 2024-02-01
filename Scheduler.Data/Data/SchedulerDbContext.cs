using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Scheduler.Data.Data.Models;
using Scheduler.Models;

namespace Scheduler.Data
{
    public class SchedulerDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public SchedulerDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)

        {
        }

        public DbSet<ClinicEntity> Clinics { get; set; }

        public DbSet<DoctorEntity> Doctors { get; set; }

        public DbSet<PatientEntity> Patients { get; set; }

        public DbSet<AppointmentEntity> Appointments { get; set; }

        public DbSet<AppointmentTypeEntity> AppointmentTypes { get; set; }
    }
}
