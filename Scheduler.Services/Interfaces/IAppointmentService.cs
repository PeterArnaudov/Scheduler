using Scheduler.Services.Models.Requests;
using Scheduler.Services.Models.Requests.Appointment;
using Scheduler.Services.Models.Dtos.Appointment;
using Scheduler.Data.Data.Models;

namespace Scheduler.Services.Interfaces
{
    public interface IAppointmentService
    {
        T GetAppointment<T>(
            int id);

        IEnumerable<T> GetAppointments<T>(
            AppointmentSearchRequest request);

        IEnumerable<T> GetAvailableAppointments<T>(
            string doctorName);

        Task<bool> SubmitAppointmentAsync(
            AppointmentSubmitRequest request);

        Task<AppointmentDto> UpdateAppointmentAsync(
            AppointmentEditRequest request);

        Task<bool> DeleteAppointmentAsync(
            int id);

        Task<IEnumerable<AppointmentDto>> BulkCreateAsync(
            AppointmentBulkCreateRequest request);

        Task<IEnumerable<AppointmentEntity>> BulkDeleteAsync(
            AppointmentBulkDeleteRequest request);
    }
}
