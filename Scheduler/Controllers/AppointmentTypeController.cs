using Microsoft.AspNetCore.Mvc;
using Scheduler.Services.Models.Responses;
using Scheduler.Services.Interfaces;
using Scheduler.Services.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Constants;
using Scheduler.Data.Data.Models;
using Scheduler.Services.Models.Requests.AppointmentType;

namespace Scheduler.Controllers
{
    public class AppointmentTypeController : BaseController
    {
        private readonly ILogger<AppointmentTypeController> logger;
        private readonly IAppointmentTypeService appointmentTypeService;

        public AppointmentTypeController(
            ILogger<AppointmentTypeController> logger,
            IAppointmentTypeService appointmentTypeService)
        {
            this.logger = logger;
            this.appointmentTypeService = appointmentTypeService;
        }

        [HttpGet]
        public IActionResult GetTypes(
            [FromQuery] AppointmentTypeSearchRequest request)
        {
            try
            {
                var appointmentTypes = appointmentTypeService
                    .GetAppointmentTypes<AppointmentTypeDto>(request);

                return Ok(Result<IEnumerable<AppointmentTypeDto>>.Ok(appointmentTypes));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);

                return BadRequest(BaseResponse.Fail(ex.Message));
            }
        }

        [HttpPost]
        [Authorize(PolicyNames.ClinicAdmin)]
        public async Task<IActionResult> Create(
            AppointmentTypeCreateRequest request)
        {
            try
            {
                var appointmentTypes = await appointmentTypeService.CreateAppointmentTypeAsync(request);

                return Ok(Result<IEnumerable<AppointmentTypeEntity>>.Ok(appointmentTypes));
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
            AppointmentTypeDto request)
        {
            try
            {
                var appointmentType = await appointmentTypeService.UpdateAppointmentTypeAsync(request);

                return Ok(Result<AppointmentTypeEntity>.Ok(appointmentType));
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
                var result = await appointmentTypeService.DeleteAppointmentTypeAsync(id);

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
