using Scheduler.Data.Data.Models;
using Scheduler.Data.Enums;
using Scheduler.Data.Interfaces;
using Scheduler.Data.Specifications.Filter;

namespace Scheduler.Services.Models.Requests
{
    public class AppointmentSearchRequest
    {
        public IEnumerable<int?>? Ids { get; set; }

        public bool Free { get; set; }

        public bool Occupied { get; set; }

        public DateTime? StartDateTime { get; set; }

        public DateTime? EndDateTime { get; set; }

        public IEnumerable<int?>? Doctors { get; set; }

        public IEnumerable<int?>? Patients { get; set; }

        public IEnumerable<ISpecification<AppointmentEntity>> ToSpecifications()
        {
            var specifications = new List<ISpecification<AppointmentEntity>>();

            if (Ids?.Any() ?? false)
            {
                specifications.Add(new IntegerSpecification<AppointmentEntity>(
                    Ids, x => x.Id,
                    logicalOperator: LogicalOperator.Or));
            }

            if (Free && !Occupied)
            {
                specifications.Add(new BooleanSpecification<AppointmentEntity>(
                    Free, x => x.IsFree));
            }
            else if (!Free && Occupied)
            {
                specifications.Add(new BooleanSpecification<AppointmentEntity>(
                    Free, x => x.IsFree));
            }

            if (StartDateTime.HasValue)
            {
                specifications.Add(new DateTimeSpecification<AppointmentEntity>(
                    StartDateTime, x => x.StartDateTime, DateFilterConditions.Since));
            }

            if (EndDateTime.HasValue)
            {
                specifications.Add(new DateTimeSpecification<AppointmentEntity>(
                    EndDateTime, x => x.EndDateTime, DateFilterConditions.Until));
            }

            if (Doctors?.Any() ?? false)
            {
                specifications.Add(new IntegerSpecification<AppointmentEntity>(
                    Doctors, x => x.DoctorId,
                    logicalOperator: LogicalOperator.Or));
            }

            if (Patients?.Any() ?? false)
            {
                specifications.Add(new IntegerSpecification<AppointmentEntity>(
                    Patients, x => x.PatientId,
                    logicalOperator: LogicalOperator.Or));
            }

            return specifications;
        }
    }
}
