using Scheduler.Services.Models.Requests.Patient;
using Scheduler.Data.Data.Models;
using Scheduler.Data.Repositories;
using Scheduler.Services.Interfaces;
using Scheduler.Services.Mapping;
using Scheduler.Data.Extensions;
using Scheduler.Services.Helpers;

namespace Scheduler.Services.Services
{
    public class PatientService : IPatientService
    {
        private readonly IRepository<PatientEntity> patientRepository;

        public PatientService(
            IRepository<PatientEntity> patientRepository)
        {
            this.patientRepository = patientRepository;
        }

        public T GetPatient<T>(int id)
        {
            var patient = patientRepository.AllAsNoTracking()
                .Where(x => x.Id == id)
                .To<T>()
                .FirstOrDefault();

            if (patient == null)
            {
                throw new KeyNotFoundException($"{nameof(PatientEntity)} with ID {id} was not found.");
            }

            return patient;
        }

        public IEnumerable<T> GetPatients<T>(
            PatientSearchRequest request)
        {
            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }

            request.ClinicId = clinicId;

            return patientRepository.AllAsNoTracking()
                .Specify(request.ToSpecifications().ToArray())
                .To<T>()
                .ToArray();
        }

        public async Task<PatientEntity> UpdatePatientAsync(
            PatientEditRequest request)
        {
            var patient = patientRepository
                .All()
                .FirstOrDefault(x => x.Id == request.Id);

            if (patient == null)
            {
                throw new KeyNotFoundException($"{nameof(PatientEntity)} with ID {request.Id} was not found.");
            }
            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }
            if (patient.ClinicId != clinicId)
            {
                throw new InvalidOperationException($"{nameof(PatientEntity)} doesn't belong to clinic {clinicId}.");
            }

            patient.Name = request.Name;
            patient.Email = request.Email;
            patient.Phone = request.Phone;

            patientRepository.Update(patient);
            await patientRepository.SaveChangesAsync();

            return patient;
        }

        public async Task<bool> DeletePatientAsync(
            int id)
        {
            var patient = patientRepository
                .All()
                .FirstOrDefault(x => x.Id == id);

            if (patient == null)
            {
                throw new KeyNotFoundException($"{nameof(PatientEntity)} with ID {id} was not found.");
            }
            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }
            if (patient.ClinicId != clinicId)
            {
                throw new InvalidOperationException($"Patient doesn't belong to clinic {clinicId}.");
            }

            patientRepository.Delete(patient);
            return await patientRepository.SaveChangesAsync() > 0;
        }
    }
}
