using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Services.Models.Dtos.Patient;
using Scheduler.Services.Models.Requests.Patient;
using Scheduler.Services.Models.Responses;
using Scheduler.Constants;
using Scheduler.Data.Data.Models;
using Scheduler.Services.Interfaces;
using Scheduler.Services.Helpers;

namespace Scheduler.Controllers
{
    public class PatientController : BaseController
    {
        private readonly ILogger<PatientController> logger;
        private readonly IPatientService patientService;

        public PatientController(
            ILogger<PatientController> logger,
            IPatientService patientService)
        {
            this.logger = logger;
            this.patientService = patientService;
        }

        [HttpPost("search")]
        [Authorize(PolicyNames.ClinicAdmin)]
        public IActionResult Search(
            PatientSearchRequest? request)
        {
            try
            {
                request ??= new PatientSearchRequest();

                if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
                {
                    throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
                }

                request.ClinicId = clinicId;
                var patients = patientService.GetPatients<PatientDto>(request);

                return Ok(Result<IEnumerable<PatientDto>>.Ok(patients));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Authorize(PolicyNames.ClinicAdmin)]
        public async Task<IActionResult> Edit(
            PatientEditRequest request)
        {
            try
            {
                var patient = await patientService.UpdatePatientAsync(request);

                return Ok(Result<PatientEntity>.Ok(patient));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);

                return BadRequest(BaseResponse.Fail(ex.Message));
            }
        }

        [HttpDelete("{id}")]
        [Authorize(PolicyNames.ClinicAdmin)]
        public async Task<IActionResult> Delete(
            int id)
        {
            try
            {
                var result = await patientService.DeletePatientAsync(id);

                return result
                    ? Ok(BaseResponse.Ok())
                    : BadRequest(BaseResponse.Fail());
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);

                return BadRequest(BaseResponse.Fail(ex.Message));
            }
        }
    }
}
