using Scheduler.Services.Models.Requests.Patient;
using Scheduler.Data.Data.Models;

namespace Scheduler.Services.Interfaces
{
    public interface IPatientService
    {
        T GetPatient<T>(int id);

        IEnumerable<T> GetPatients<T>(
            PatientSearchRequest request);

        Task<PatientEntity> UpdatePatientAsync(
            PatientEditRequest request);

        Task<bool> DeletePatientAsync(
            int id);
    }
}
