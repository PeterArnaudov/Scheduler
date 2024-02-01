using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Services.Models.Dtos.Appointment;
using Scheduler.Services.Models.Requests;
using Scheduler.Services.Models.Requests.Appointment;
using Scheduler.Services.Models.Responses;
using Scheduler.Constants;
using Scheduler.Data.Data.Models;
using Scheduler.Services.Interfaces;

namespace Scheduler.Controllers
{
    public class AppointmentController : BaseController
    {
        private readonly ILogger<AppointmentController> logger;
        private readonly IAppointmentService appointmentService;

        public AppointmentController(
            ILogger<AppointmentController> logger,
            IAppointmentService appointmentService)
        {
            this.logger = logger;
            this.appointmentService = appointmentService;
        }

        [HttpGet("available/{doctorName}")]
        public IActionResult GetAvailableAppointments(
            string doctorName)
        {
            try
            {
                var appointments = appointmentService.GetAvailableAppointments<AppointmentSlotDto>(doctorName);

                return Ok(Result<IEnumerable<AppointmentSlotDto>>.Ok(appointments));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);

                return BadRequest(BaseResponse.Fail(ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> SubmitAppointment(
            [FromBody] AppointmentSubmitRequest request)
        {
            var response = new AppointmentResponse()
            {
                Success = false,
                IsQuickAppointment = request.IsQuickAppointment,
            };

            try
            {
                var result = await appointmentService.SubmitAppointmentAsync(request);
                response.Success = result;

                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                response.Message = ex.Message;

                return BadRequest(response);
            }
        }

        [HttpPost("search")]
        [Authorize(PolicyNames.ClinicAdmin)]
        public IActionResult Search(
            AppointmentSearchRequest request)
        {
            try
            {
                var appointments = appointmentService.GetAppointments<AppointmentDto>(request);

                return Ok(Result<IEnumerable<AppointmentDto>>.Ok(appointments));
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
            AppointmentEditRequest request)
        {
            try
            {
                var appointment = await appointmentService.UpdateAppointmentAsync(request);

                return Ok(Result<AppointmentDto>.Ok(appointment));
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
                var result = await appointmentService.DeleteAppointmentAsync(id);

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

        [HttpPost("bulk-create")]
        [Authorize(PolicyNames.ClinicAdmin)]
        public async Task<IActionResult> BulkCreate(
            AppointmentBulkCreateRequest request)
        {
            try
            {
                var appointments = await appointmentService.BulkCreateAsync(request);

                return Ok(Result<IEnumerable<AppointmentDto>>.Ok(appointments));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);

                return BadRequest(BaseResponse.Fail(ex.Message));
            }
        }

        [HttpDelete("bulk-delete")]
        [Authorize(PolicyNames.ClinicAdmin)]
        public async Task<IActionResult> BulkDelete(
            AppointmentBulkDeleteRequest request)
        {
            try
            {
                var deletedAppointments = await appointmentService.BulkDeleteAsync(request);

                return Ok(Result<IEnumerable<AppointmentEntity>>.Ok(deletedAppointments));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);

                return BadRequest(BaseResponse.Fail(ex.Message));
            }
        }
    }
}
