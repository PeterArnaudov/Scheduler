using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Services.Models.Dtos.Doctor;
using Scheduler.Services.Models.Responses;
using Scheduler.Constants;
using Scheduler.Data.Data.Models;
using Scheduler.Services.Interfaces;
using Scheduler.Services.Models.Requests.Doctor;
using Scheduler.Common.Constants;
using Scheduler.Services.Helpers;

namespace Scheduler.Controllers
{
    public class DoctorController : BaseController
    {
        private readonly ILogger<DoctorController> logger;
        private readonly IDoctorService doctorService;

        public DoctorController(
            ILogger<DoctorController> logger,
            IDoctorService doctorService)
        {
            this.logger = logger;
            this.doctorService = doctorService;
        }

        [HttpGet("summarized")]
        public IActionResult GetSummarizedDoctors(
            [FromQuery] DoctorSearchRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.ClinicId))
                {
                    if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
                    {
                        throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
                    }
                }

                var doctors = doctorService.GetDoctors<EarliestAppointmentDoctorDto>(request);

                return Ok(Result<IEnumerable<EarliestAppointmentDoctorDto>>.Ok(doctors));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("single")]
        public IActionResult Get(
            [FromQuery] DoctorGetRequest request)
        {
            try
            {
                var doctor = doctorService.GetDoctor<DoctorDto>(request);

                return Ok(Result<DoctorDto>.Ok(doctor));
            }
            catch (KeyNotFoundException ex)
            {
                logger.LogError(ex, ex.Message);

                return NotFound(BaseResponse.Fail(
                    ex.Message, StatusCodes.Status404NotFound));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);

                return BadRequest(BaseResponse.Fail(ex.Message));
            }
        }

        [HttpGet("list")]
        [Authorize(PolicyNames.ClinicAdmin)]
        public IActionResult GetDoctors()
        {
            try
            {
                if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
                {
                    throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
                }

                var doctors = doctorService.GetDoctors<DoctorDto>(new DoctorSearchRequest()
                {
                    ClinicId = clinicId,
                });

                return Ok(Result<IEnumerable<DoctorDto>>.Ok(doctors));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize(PolicyNames.ClinicAdmin)]
        public async Task<IActionResult> Create(
            DoctorDto doctorDto)
        {
            try
            {
                var doctor = await doctorService.CreateDoctorAsync(doctorDto);

                return Ok(Result<DoctorEntity>.Ok(doctor));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);

                return BadRequest(BaseResponse.Fail(ex.Message));
            }
        }

        [HttpPut]
        [Authorize(PolicyNames.ClinicAdmin)]
        public async Task<IActionResult> Edit(
            DoctorDto doctorDto)
        {
            try
            {
                var doctor = await doctorService.UpdateDoctorAsync(doctorDto);

                return Ok(Result<DoctorEntity>.Ok(doctor));
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
                var result = await doctorService.DeleteDoctorAsync(id);

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
