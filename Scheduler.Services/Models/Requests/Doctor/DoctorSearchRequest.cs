using Scheduler.Data.Data.Models;
using Scheduler.Data.Interfaces;
using Scheduler.Data.Specifications.Filter;

namespace Scheduler.Services.Models.Requests.Doctor
{
    public class DoctorSearchRequest
    {
        public string ClinicId { get; set; }

        public IEnumerable<ISpecification<DoctorEntity>> ToSpecifications()
        {
            var specifications = new List<ISpecification<DoctorEntity>>();

            if (!string.IsNullOrEmpty(ClinicId))
            {
                var specification = new StringSpecification<DoctorEntity>(
                    ClinicId, x => x.ClinicId);

                specifications.Add(specification);
            }

            return specifications;
        }
    }
}
