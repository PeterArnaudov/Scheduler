using Scheduler.Data.Data.Models;
using Scheduler.Data.Interfaces;
using Scheduler.Data.Specifications;
using Scheduler.Data.Specifications.Filter;

namespace Scheduler.Services.Models.Requests.AppointmentType
{
    public class AppointmentTypeSearchRequest
    {
        public int? DoctorId { get; set; }

        public string? ClinicId { get; set; }

        public IEnumerable<ISpecification<AppointmentTypeEntity>> ToSpecifications()
        {
            var specifications = new List<ISpecification<AppointmentTypeEntity>>();

            if (DoctorId.HasValue)
            {
                specifications.Add(new OrSpecification<AppointmentTypeEntity>(
                    new IntegerSpecification<AppointmentTypeEntity>(
                        DoctorId, x => x.DoctorId),
                    new IntegerSpecification<AppointmentTypeEntity>(
                        default(int?), x => x.DoctorId)));
            }

            if (!string.IsNullOrEmpty(ClinicId))
            {
                specifications.Add(new StringSpecification<AppointmentTypeEntity>(
                    ClinicId, x => x.ClinicId));
            }

            return specifications;
        }
    }
}
