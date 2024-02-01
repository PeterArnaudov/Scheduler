using Scheduler.Services.Models.Dtos.Doctor;
using Scheduler.Data.Data.Models;
using Scheduler.Services.Models.Requests.Doctor;

namespace Scheduler.Services.Interfaces
{
    public interface IDoctorService
    {
        IEnumerable<T> GetDoctors<T>(
            DoctorSearchRequest request);

        T GetDoctor<T>(
            DoctorGetRequest request);

        Task<DoctorEntity> CreateDoctorAsync(
            DoctorDto doctorDto);

        Task<DoctorEntity> UpdateDoctorAsync(
            DoctorDto doctorDto);
        
        Task<bool> DeleteDoctorAsync(
            int id);
    }
}
