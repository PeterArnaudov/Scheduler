using Scheduler.Services.Models.Dtos;
using Scheduler.Data.Data.Models;
using Scheduler.Services.Models.Requests.AppointmentType;

namespace Scheduler.Services.Interfaces
{
    public interface IAppointmentTypeService
    {
        IEnumerable<T> GetAppointmentTypes<T>(
            AppointmentTypeSearchRequest request);

        Task<IEnumerable<AppointmentTypeEntity>> CreateAppointmentTypeAsync(
            AppointmentTypeCreateRequest request);

        Task<AppointmentTypeEntity> UpdateAppointmentTypeAsync(
            AppointmentTypeDto request);

        Task<bool> DeleteAppointmentTypeAsync(
            int id);
    }
}
