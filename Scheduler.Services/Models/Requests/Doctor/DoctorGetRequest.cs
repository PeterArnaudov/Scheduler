using Microsoft.AspNetCore.Mvc;
using Scheduler.Data.Data.Models;
using Scheduler.Data.Interfaces;
using Scheduler.Data.Specifications.Filter;

namespace Scheduler.Services.Models.Requests.Doctor
{
    public class DoctorGetRequest
    {
        public string DoctorName { get; set; }

        public string ClinicId { get; set; }

        public IEnumerable<ISpecification<DoctorEntity>> ToSpecifications()
        {
            var specifications = new List<ISpecification<DoctorEntity>>();

            if (!string.IsNullOrEmpty(ClinicId))
            {
                specifications.Add(new StringSpecification<DoctorEntity>(
                    ClinicId, x => x.ClinicId));
            }

            if (!string.IsNullOrEmpty(DoctorName))
            {
                specifications.Add(new StringSpecification<DoctorEntity>(
                    DoctorName.Replace("-", " "), x => x.Name));
            }

            return specifications;
        }
    }
}
