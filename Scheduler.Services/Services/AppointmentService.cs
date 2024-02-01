using Microsoft.EntityFrameworkCore;
using Scheduler.Services.Models.Requests;
using Scheduler.Services.Models.Requests.Appointment;
using Scheduler.Data.Data.Models;
using Scheduler.Data.Repositories;
using Scheduler.Services.Interfaces;
using Scheduler.Services.Mapping;
using Scheduler.Data.Extensions;
using Scheduler.Services.Models.Dtos.Appointment;
using Scheduler.Services.Helpers;

namespace Scheduler.Services.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IRepository<AppointmentEntity> appointmentRepository;
        private readonly IRepository<PatientEntity> patientRepository;

        public AppointmentService(
            IRepository<AppointmentEntity> appointmentRepository,
            IRepository<PatientEntity> patientRepository)
        {
            this.appointmentRepository = appointmentRepository;
            this.patientRepository = patientRepository;
        }

        public T GetAppointment<T>(
            int id)
        {
            var appointment = appointmentRepository.AllAsNoTracking()
                .Where(x => x.Id == id)
                .To<T>()
                .FirstOrDefault();

            if (appointment == null)
            {
                throw new KeyNotFoundException($"{nameof(AppointmentEntity)} with ID {id} was not found.");
            }

            return appointment;
        }

        public IEnumerable<T> GetAppointments<T>(
            AppointmentSearchRequest request)
            => appointmentRepository.AllAsNoTracking()
                .AsQueryable()
                .Specify(request.ToSpecifications().ToArray())
                .To<T>()
                .ToArray();

        public IEnumerable<T> GetAvailableAppointments<T>(
            string doctorName)
        {
            doctorName = doctorName.Replace("-", " ");

            return appointmentRepository.AllAsNoTracking()
                .Include(x => x.Doctor)
                .Where(x => x.Doctor.Name == doctorName && x.IsFree)
                .OrderBy(x => x.StartDateTime)
                .To<T>()
                .ToArray();
        }

        public async Task<bool> SubmitAppointmentAsync(
            AppointmentSubmitRequest request)
        {
            var appointment = appointmentRepository.All()
                .FirstOrDefault(x => x.Id == request.AppointmentId);

            if (appointment == null)
            {
                throw new Exception($"Appointment with ID {request.AppointmentId} doesn't exist.");
            }
            else if (string.IsNullOrEmpty(request.Phone))
            {
                throw new Exception($"{nameof(request.Phone)} cannot be null or empty.");
            }
            if (string.IsNullOrEmpty(request.Name)
                && !request.IsQuickAppointment)
            {
                throw new Exception($"{nameof(request.Name)} cannot be null or empty.");
            }
            else if (string.IsNullOrEmpty(request.Email)
                && !request.IsQuickAppointment)
            {
                throw new Exception($"{nameof(request.Email)} cannot be null or empty.");
            }
            else if (!appointment.IsFree)
            {
                throw new Exception($"{nameof(appointment.IsFree)} is set to {false}.");
            }

            var patient = patientRepository.All()
                .FirstOrDefault(x => x.Phone == request.Phone);

            if (patient == null)
            {
                if (request.IsQuickAppointment)
                {
                    throw new Exception($"Patient with phone number {request.Phone} doesn't exist.");
                }

                patient = new PatientEntity
                {
                    Name = request.Name,
                    Email = request.Email,
                    Phone = request.Phone,
                    ClinicId = appointment.ClinicId,
                };

                await patientRepository.AddAsync(patient);
                await patientRepository.SaveChangesAsync();
            }

            appointment.IsFree = false;
            appointment.PatientId = patient.Id;
            appointment.AppointmentTypeId = request.AppointmentTypeId;

            appointmentRepository.Update(appointment);

            return await appointmentRepository.SaveChangesAsync() > 0;
        }

        public async Task<AppointmentDto> UpdateAppointmentAsync(
            AppointmentEditRequest request)
        {
            var appointment = appointmentRepository
                .All()
                .Include(x => x.Doctor)
                .Include(x => x.Patient)
                .Include(x => x.AppointmentType)
                .FirstOrDefault(x => x.Id == request.Id);

            if (appointment == null)
            {
                throw new KeyNotFoundException($"{nameof(AppointmentEntity)} with ID {request.Id} was not found.");
            }
            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }
            if (appointment.ClinicId != clinicId)
            {
                throw new InvalidOperationException($"{nameof(AppointmentEntity)} doesn't belong to clinic {clinicId}.");
            }

            appointment.IsFree = request.IsFree;
            appointment.PatientId = request.IsFree
                ? null
                : request.PatientId;
            appointment.DoctorId = request.DoctorId;
            appointment.AppointmentTypeId = request.TypeId;
            appointment.StartDateTime = request.StartDateTime;
            appointment.EndDateTime = request.EndDateTime;

            appointmentRepository.Update(appointment);
            await appointmentRepository.SaveChangesAsync();

            return GetAppointment<AppointmentDto>(appointment.Id);
        }

        public async Task<bool> DeleteAppointmentAsync(
            int id)
        {
            var appointment = appointmentRepository
                .All()
                .FirstOrDefault(x => x.Id == id);

            if (appointment == null)
            {
                return false;
            }
            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }
            if (appointment.ClinicId != clinicId)
            {
                throw new InvalidOperationException($"{nameof(AppointmentEntity)} doesn't belong to clinic {clinicId}.");
            }

            appointmentRepository.Delete(appointment);
            return await appointmentRepository.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<AppointmentDto>> BulkCreateAsync(
            AppointmentBulkCreateRequest request)
        {
            var appointments = new List<AppointmentEntity>();

            if (!request.Doctors?.Any() ?? false)
            {
                throw new Exception($"{nameof(request.Doctors)} cannot be null or empty.");
            }
            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }

            foreach (var doctorId in request.Doctors)
            {
                var currentDate = request.StartDateTime.Date;
                var appointmentStartTime = currentDate.Add(request.StartDateTime.TimeOfDay);
                var appointmentEndTime = currentDate.Add(request.EndDateTime.TimeOfDay);

                while (currentDate <= request.EndDateTime.Date)
                {
                    if (request.WeekDays.Contains(currentDate.DayOfWeek))
                    {
                        while (appointmentStartTime <= appointmentEndTime)
                        {
                            var appointment = new AppointmentEntity
                            {
                                DoctorId = doctorId,
                                ClinicId = clinicId,
                                StartDateTime = appointmentStartTime,
                                EndDateTime = appointmentStartTime.AddMinutes(request.Duration),
                                IsFree = true
                            };

                            appointments.Add(appointment);

                            appointmentStartTime = appointmentStartTime.AddMinutes(request.Duration + request.Interval);
                        }
                    }

                    currentDate = currentDate.AddDays(1);
                    appointmentStartTime = currentDate.Add(request.StartDateTime.TimeOfDay);
                    appointmentEndTime = currentDate.Add(request.EndDateTime.TimeOfDay);
                }
            }

            await appointmentRepository.AddRangeAsync(appointments);
            await appointmentRepository.SaveChangesAsync();

            return GetAppointments<AppointmentDto>(new AppointmentSearchRequest()
            {
                Ids = appointments?.Select(x => x?.Id)
            });
        }

        public async Task<IEnumerable<AppointmentEntity>> BulkDeleteAsync(
            AppointmentBulkDeleteRequest request)
        {
            if (!ClinicIdHelper.TryGetCurrentClinicId(out var clinicId))
            {
                throw new Exception($"{nameof(clinicId)} cannot be null or empty.");
            }

            request.ClinicId = clinicId;

            var appointments = appointmentRepository.AllAsNoTracking()
                .AsQueryable()
                .Specify(request.ToSpecifications().ToArray())
                .ToArray();

            appointments = appointments
                .Where(x => request.WeekDays.Contains(x.StartDateTime.DayOfWeek))
                .ToArray();

            appointmentRepository.DeleteRange(appointments);
            await appointmentRepository.SaveChangesAsync();

            return appointments;
        }
    }
}
