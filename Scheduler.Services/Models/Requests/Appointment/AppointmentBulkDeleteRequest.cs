using Scheduler.Data.Data.Models;
using Scheduler.Data.Enums;
using Scheduler.Data.Interfaces;
using Scheduler.Data.Specifications.Appointment;
using Scheduler.Data.Specifications.Filter;

namespace Scheduler.Services.Models.Requests.Appointment
{
    public class AppointmentBulkDeleteRequest
    {
        public string ClinicId { get; set; }

        public DateTime StartDateTime { get; set; }

        public DateTime EndDateTime { get; set; }

        public IEnumerable<int?>? Doctors { get; set; }

        public IEnumerable<DayOfWeek> WeekDays { get; set; }

        public IEnumerable<ISpecification<AppointmentEntity>> ToSpecifications()
        {
            var specifications = new List<ISpecification<AppointmentEntity>>
            {
                new AppointmentRangeSpecification(StartDateTime, EndDateTime),
                new StringSpecification<AppointmentEntity>(
                    ClinicId, x => x.ClinicId),
            };

            if (Doctors?.Any() ?? false)
            {
                specifications.Add(new IntegerSpecification<AppointmentEntity>(
                    Doctors, x => x.DoctorId,
                    logicalOperator: LogicalOperator.Or));
            }

            return specifications;
        }
    }
}
