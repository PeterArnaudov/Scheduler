using Scheduler.Services.Models.Dtos;
using Scheduler.Data.Data.Models;
using Scheduler.Data.Repositories;
using Scheduler.Services.Interfaces;
using Scheduler.Services.Mapping;
using Scheduler.Services.Helpers;
using Scheduler.Services.Models.Requests.AppointmentType;
using Scheduler.Data.Extensions;

namespace Scheduler.Services.Services
{
    public class AppointmentTypeService : IAppointmentTypeService
    {
        private readonly IRepository<AppointmentTypeEntity> appointmentTypeRepository;

        public AppointmentTypeService(
            IRepository<AppointmentTypeEntity> appointmentTypeRepository)
        {
            this.appointmentTypeRepository = appointmentTypeRepository;
        }

        public IEnumerable<T> GetAppointmentTypes<T>(
            AppointmentTypeSearchRequest request)
        {
            if (ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                request.ClinicId = clinicId;
            }

            return appointmentTypeRepository.AllAsNoTracking()
                .Specify(request.ToSpecifications().ToArray())
                .To<T>()
                .ToArray();
        }

        public async Task<IEnumerable<AppointmentTypeEntity>> CreateAppointmentTypeAsync(
            AppointmentTypeCreateRequest request)
        {
            if (string.IsNullOrEmpty(request.Name))
            {
                throw new ArgumentException($"{nameof(AppointmentTypeEntity.Name)} cannot be empty.");
            }
            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }

            var appointmentTypes = new List<AppointmentTypeEntity>();

            if (!request.Doctors?.Any() ?? false)
            {
                var appointmentType = new AppointmentTypeEntity()
                {
                    Name = request.Name,
                    ClinicId = clinicId,
                };

                appointmentTypes.Add(appointmentType);
            }
            else
            {
                foreach (var doctorId in request.Doctors)
                {
                    var appointmentType = new AppointmentTypeEntity()
                    {
                        Name = request.Name,
                        ClinicId = clinicId,
                        DoctorId = doctorId
                    };

                    appointmentTypes.Add(appointmentType);
                }
            }

            await appointmentTypeRepository.AddRangeAsync(appointmentTypes);
            await appointmentTypeRepository.SaveChangesAsync();

            return appointmentTypes;
        }

        public async Task<AppointmentTypeEntity> UpdateAppointmentTypeAsync(
            AppointmentTypeDto request)
        {
            var appointmentType = appointmentTypeRepository
                .All()
                .FirstOrDefault(x => x.Id == request.Id);

            if (appointmentType == null)
            {
                throw new KeyNotFoundException($"{nameof(AppointmentTypeEntity)} with ID {request.Id} was not found.");
            }
            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }
            if (appointmentType.ClinicId != clinicId)
            {
                throw new InvalidOperationException($"{nameof(AppointmentTypeEntity)} doesn't belong to clinic {clinicId}.");
            }

            appointmentType.Name = request.Name;
            appointmentType.DoctorId = request.DoctorId;

            appointmentTypeRepository.Update(appointmentType);
            await appointmentTypeRepository.SaveChangesAsync();

            return appointmentType;
        }

        public async Task<bool> DeleteAppointmentTypeAsync(
            int id)
        {
            var appointmentType = appointmentTypeRepository
                .All()
                .FirstOrDefault(x => x.Id == id);

            if (appointmentType == null)
            {
                return false;
            }
            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }
            if (appointmentType.ClinicId != clinicId)
            {
                throw new InvalidOperationException($"{nameof(AppointmentTypeEntity)} doesn't belong to clinic {clinicId}.");
            }

            appointmentTypeRepository.Delete(appointmentType);
            return await appointmentTypeRepository.SaveChangesAsync() > 0;
        }
    }
}
