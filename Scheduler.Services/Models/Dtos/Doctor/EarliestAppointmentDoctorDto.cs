using AutoMapper;
using Scheduler.Data.Data.Models;
using Scheduler.Services.Mapping;
using Scheduler.Services.Models.Dtos.Appointment;

namespace Scheduler.Services.Models.Dtos.Doctor
{
    public class EarliestAppointmentDoctorDto : DoctorDto, IHaveCustomMappings
    {
        public AppointmentSlotDto? EarliestAvailableAppointment { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<DoctorEntity, EarliestAppointmentDoctorDto>()
                .ForMember(dest => dest.EarliestAvailableAppointment,
                    opt => opt.MapFrom(src => src.Appointments
                        .OrderBy(x => x.StartDateTime)
                        .FirstOrDefault(x => x.IsFree)));
        }
    }
}
