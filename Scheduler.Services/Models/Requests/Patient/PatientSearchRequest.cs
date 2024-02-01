using Scheduler.Data.Data.Models;
using Scheduler.Data.Enums;
using Scheduler.Data.Interfaces;
using Scheduler.Data.Specifications;
using Scheduler.Data.Specifications.Filter;

namespace Scheduler.Services.Models.Requests.Patient
{
    public class PatientSearchRequest
    {
        public string? Query { get; set; }

        public string? ClinicId { get; set; }

        public IEnumerable<ISpecification<PatientEntity>> ToSpecifications()
        {
            var specifications = new List<ISpecification<PatientEntity>>();

            if (!string.IsNullOrEmpty(Query))
            {
                specifications.Add(new OrSpecification<PatientEntity>(
                    new StringSpecification<PatientEntity>(Query, x => x.Name, StringFilterConditions.Contains),
                    new StringSpecification<PatientEntity>(Query, x => x.Email, StringFilterConditions.Contains),
                    new StringSpecification<PatientEntity>(Query, x => x.Phone, StringFilterConditions.Contains)));
            }

            if (!string.IsNullOrEmpty(ClinicId))
            {
                specifications.Add(new StringSpecification<PatientEntity>(
                    ClinicId, x => x.ClinicId));
            }

            return specifications;
        }
    }
}
