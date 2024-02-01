using AutoMapper;
using Scheduler.Data.Data.Models;
using Scheduler.Services.Mapping;
using Scheduler.Services.Models.Dtos.Doctor;
using Scheduler.Services.Models.Dtos.Patient;

namespace Scheduler.Services.Models.Dtos.Appointment
{
    public class AppointmentDto : IHaveCustomMappings
    {
        public int Id { get; set; }

        public bool IsFree { get; set; }

        public DateTime StartDateTime { get; set; }

        public DateTime EndDateTime { get; set; }

        public AppointmentTypeDto? Type { get; set; }

        public DoctorDto? Doctor { get; set; }

        public PatientDto? Patient { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<AppointmentEntity, AppointmentDto>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.AppointmentType));
        }
    }
}
