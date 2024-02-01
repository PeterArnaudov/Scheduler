using Scheduler.Services.Models.Dtos.Doctor;
using Scheduler.Data.Data.Models;
using Scheduler.Data.Repositories;
using Scheduler.Services.Interfaces;
using Scheduler.Services.Mapping;
using Scheduler.Services.Models.Requests.Doctor;
using Scheduler.Data.Extensions;
using Scheduler.Services.Helpers;

namespace Scheduler.Services.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IRepository<DoctorEntity> doctorRepository;

        public DoctorService(
            IRepository<DoctorEntity> doctorRepository)
        {
            this.doctorRepository = doctorRepository;
        }

        public IEnumerable<T> GetDoctors<T>(
            DoctorSearchRequest request)
            => doctorRepository.AllAsNoTracking()
                .Specify(request.ToSpecifications().ToArray())
                .To<T>()
                .ToArray();

        public T GetDoctor<T>(
            DoctorGetRequest request)
        {
            var doctor = doctorRepository.AllAsNoTracking()
                .Specify(request.ToSpecifications().ToArray())
                .To<T>()
                .FirstOrDefault();

            if (doctor == null)
            {
                throw new KeyNotFoundException($"{nameof(DoctorEntity)} with name {request.DoctorName} was not found.");
            }

            return doctor;
        }

        public async Task<DoctorEntity> CreateDoctorAsync(
            DoctorDto doctorDto)
        {
            if (string.IsNullOrEmpty(doctorDto.Name))
            {
                throw new ArgumentException($"{nameof(DoctorEntity.Name)} cannot be empty.");
            }

            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }

            var doctor = new DoctorEntity()
            {
                Name = doctorDto.Name,
                Description = doctorDto.Description,
                Image = doctorDto.Image,
                Color = doctorDto.Color,
                ClinicId = clinicId,
            };

            await doctorRepository.AddAsync(doctor);
            await doctorRepository.SaveChangesAsync();

            return doctor;
        }

        public async Task<DoctorEntity> UpdateDoctorAsync(
            DoctorDto doctorDto)
        {
            var doctor = doctorRepository
                .All()
                .FirstOrDefault(x => x.Id == doctorDto.Id);

            if (doctor == null)
            {
                throw new KeyNotFoundException($"{nameof(DoctorEntity)} with ID {doctorDto.Id} was not found.");
            }
            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }
            if (doctor.ClinicId != clinicId)
            {
                throw new InvalidOperationException($"{nameof(DoctorEntity)} doesn't belong to clinic {clinicId}.");
            }

            doctor.Name = doctorDto.Name;
            doctor.Description = doctorDto.Description;
            doctor.Image = doctorDto.Image;
            doctor.Color = doctorDto.Color;

            doctorRepository.Update(doctor);
            await doctorRepository.SaveChangesAsync();

            return doctor;
        }

        public async Task<bool> DeleteDoctorAsync(
            int id)
        {
            var doctor = doctorRepository
                .All()
                .FirstOrDefault(x => x.Id == id);

            if (doctor == null)
            {
                return false;
            }
            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }
            if (doctor.ClinicId != clinicId)
            {
                throw new InvalidOperationException($"{nameof(DoctorEntity)} doesn't belong to clinic {clinicId}.");
            }

            doctorRepository.Delete(doctor);
            return await doctorRepository.SaveChangesAsync() > 0;
        }
    }
}
