using Scheduler.Data.Data.Models;

namespace Scheduler.Services.Interfaces
{
    public interface IClinicService
    {
        ClinicEntity? GetClinic(
            string id);

        Task<ClinicEntity?> CreateClinicAsync(
            string id);
    }
}
