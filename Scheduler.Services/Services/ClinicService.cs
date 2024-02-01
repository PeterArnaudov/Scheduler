using Scheduler.Data.Data.Models;
using Scheduler.Data.Repositories;
using Scheduler.Services.Interfaces;

namespace Scheduler.Services.Services
{
    public class ClinicService : IClinicService
    {
        private readonly IRepository<ClinicEntity> repository;

        public ClinicService(
            IRepository<ClinicEntity> repository)
        {
            this.repository = repository;
        }

        public ClinicEntity? GetClinic(
            string id)
        {
            return repository.AllAsNoTracking()
                .FirstOrDefault(x => x.Id == id);
        }

        public async Task<ClinicEntity?> CreateClinicAsync(
            string id)
        {
            var clinic = GetClinic(id);
            if (clinic != null)
            {
                return clinic;
            }

            clinic = new ClinicEntity()
            {
                Id = id,
            };

            await repository.AddAsync(clinic);
            await repository.SaveChangesAsync();

            return clinic;
        }
    }
}
