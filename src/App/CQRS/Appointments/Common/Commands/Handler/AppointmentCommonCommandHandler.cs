using App.CQRS.Appointments.Common.Commands.Command;
using App.CQRS.Appointments.Common.Commands.Command.Clinic;
using App.CQRS.Appointments.Common.Commands.Command.Parent;
using App.Hubs;
using App.Services;
using Data.App.DbContext;
using Data.App.Models.Appointments;
using Data.App.Models.Clinics;
using Data.App.Models.Notifications;
using Data.App.Models.Parents;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Appointments.Common.Commands.Handler
{
    public sealed class AppointmentCommonCommandHandler :
        ICommandHandler<ClinicAcceptedAppointmentCommand>,
        ICommandHandler<ClinicArchivedAppointmentCommand>,
        ICommandHandler<ClinicCancelledAppointmentCommand>,
        ICommandHandler<ClinicCompletedAppointmentCommand>,
        ICommandHandler<ClinicRejectedAppointmentCommand>,
        ICommandHandler<ClinicRequestedAppointmentCommand>,
        ICommandHandler<ClinicSetAppointmentInProgressCommand>,

        ICommandHandler<ParentAcceptedAppointmentCommand>,
        ICommandHandler<ParentCancelledAppointmentCommand>,
        ICommandHandler<ParentRejectedAppointmentCommand>,
        ICommandHandler<ParentRequestedAppointmentCommand>,

        ICommandHandler<EditAppointmentCommand>
    {
        readonly AppDbContext _appDbContext;
        readonly ISequentialGuidGenerator _sequentialGuidGenerator;
        readonly IHubContext<AppointmentHub, IAppointmentClient> _appointmentHubContext;
        readonly NotificationService _notificationService;

        public AppointmentCommonCommandHandler(
            AppDbContext appDbContext,
            ISequentialGuidGenerator sequentialGuidGenerator,
            IHubContext<AppointmentHub, IAppointmentClient> appointmentHubContext,
            NotificationService notificationService)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
            _sequentialGuidGenerator = sequentialGuidGenerator ?? throw new ArgumentNullException(nameof(sequentialGuidGenerator));
            _appointmentHubContext = appointmentHubContext ?? throw new ArgumentNullException(nameof(appointmentHubContext));
            _notificationService = notificationService ?? throw new ArgumentNullException(nameof(notificationService));
        }



        async Task ICommandHandler<EditAppointmentCommand>.HandleAsync(EditAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.DateStart = command.DateStart;
            data.DateEnd = command.DateEnd;

            await _appDbContext.SaveChangesAsync();
        }


        #region Clinic

        async Task ICommandHandler<ClinicAcceptedAppointmentCommand>.HandleAsync(ClinicAcceptedAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.Accepted;

            data.AddTimeline(command.UserId, data.Status, command.Notes);

            await _appDbContext.SaveChangesAsync();

            data = await GetAppointment(command.AppointmentId);

            var response = CreateResponse(data, $"Appointment Accepted: {data.ReferenceNumber}",
                $"<b>{data.Clinic.Name}</b> accepted the appointment.");

            await UpdateNotification(data, response, "fas fa-fw fa-info-circle", data.Child.ParentId);

            await _appointmentHubContext.Clients.User(data.Child.ParentId).ClinicAccepted(response);

            var allNotifyIds = (await GetStaffIds(data.ClinicId)).Append(data.Child.ParentId).ToArray();
            await AppointmentUpdated(data, allNotifyIds);
        }

        async Task ICommandHandler<ClinicArchivedAppointmentCommand>.HandleAsync(ClinicArchivedAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.Archived;

            data.AddTimeline(command.UserId, data.Status, command.Notes);

            await _appDbContext.SaveChangesAsync();

            data = await GetAppointment(command.AppointmentId);

            var response = CreateResponse(data, $"Appointment Archived: {data.ReferenceNumber}",
                $"<b>{data.Clinic.Name}</b> archived your appointment {data.ReferenceNumber}.");

            await UpdateNotification(data, response, "fas fa-fw fa-info-circle", data.Child.ParentId);

            await _appointmentHubContext.Clients.User(data.Child.ParentId).ClinicArchived(response);

            var allNotifyIds = (await GetStaffIds(data.ClinicId)).Append(data.Child.ParentId).ToArray();
            await AppointmentUpdated(data, allNotifyIds);
        }

        async Task ICommandHandler<ClinicCancelledAppointmentCommand>.HandleAsync(ClinicCancelledAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.ClinicCancelled;

            data.AddTimeline(command.UserId, data.Status, command.Notes);

            await _appDbContext.SaveChangesAsync();

            data = await GetAppointment(command.AppointmentId);

            var response = CreateResponse(data, $"Appointment Cancelled: {data.ReferenceNumber}",
                $"<b>{data.Clinic.Name}</b> cancelled your appointment {data.ReferenceNumber}.");

            await UpdateNotification(data, response, "fas fa-fw fa-info-circle", data.Child.ParentId);

            await _appointmentHubContext.Clients.User(data.Child.ParentId).ClinicCancelled(response);

            var allNotifyIds = (await GetStaffIds(data.ClinicId)).Append(data.Child.ParentId).ToArray();
            await AppointmentUpdated(data, allNotifyIds);
        }

        async Task ICommandHandler<ClinicCompletedAppointmentCommand>.HandleAsync(ClinicCompletedAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.Completed;

            data.AddTimeline(command.UserId, data.Status, command.Notes);

            await _appDbContext.SaveChangesAsync();

            data = await GetAppointment(command.AppointmentId);

            var response = CreateResponse(data, $"Appointment Completed: {data.ReferenceNumber}",
                $"<b>{data.Clinic.Name}</b> completed your appointment {data.ReferenceNumber}.");

            await UpdateNotification(data, response, "fas fa-fw fa-info-circle", data.Child.ParentId);

            await _appointmentHubContext.Clients.User(data.Child.ParentId).ClinicCompleted(response);

            var allNotifyIds = (await GetStaffIds(data.ClinicId)).Append(data.Child.ParentId).ToArray();
            await AppointmentUpdated(data, allNotifyIds);
        }

        async Task ICommandHandler<ClinicRejectedAppointmentCommand>.HandleAsync(ClinicRejectedAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.ClinicRejected;

            data.AddTimeline(command.UserId, data.Status, command.Notes);

            await _appDbContext.SaveChangesAsync();

            data = await GetAppointment(command.AppointmentId);

            var response = CreateResponse(data, $"Appointment Rejected: {data.ReferenceNumber}",
                $"<b>{data.Clinic.Name}</b> rejected your appointment {data.ReferenceNumber}.");

            await UpdateNotification(data, response, "fas fa-fw fa-exclamation-circle", data.Child.ParentId);

            await _appointmentHubContext.Clients.User(data.Child.ParentId).ClinicRejected(response);

            var allNotifyIds = (await GetStaffIds(data.ClinicId)).Append(data.Child.ParentId).ToArray();
            await AppointmentUpdated(data, allNotifyIds);
        }

        async Task ICommandHandler<ClinicRequestedAppointmentCommand>.HandleAsync(ClinicRequestedAppointmentCommand command)
        {
            var clinic = await _appDbContext.Clinics.Include(e => e.Appointments).AsNoTracking().FirstOrDefaultAsync(e => e.ClinicId == command.ClinicId);
            clinic.ThrowIfNull();

            //  check if any appointment hit
            var blocked = clinic.Appointments.FirstOrDefault(e =>
                    (command.DateStart > e.DateStart && command.DateStart < e.DateEnd)
                    || (command.DateEnd > e.DateStart && command.DateEnd < e.DateEnd)
                    || (e.DateStart == command.DateStart && e.DateEnd == command.DateEnd)
                    );

            if (blocked != null)
            {
                throw new ApplicationException("Time slot not avaiable.");
            }

            var child = await _appDbContext.Children.Include(e => e.Parent).ThenInclude(e => e.User).AsNoTracking().FirstOrDefaultAsync(e => e.ChildId == command.ChildId);
            child.ThrowIfNull();

            var data = new Appointment
            {
                AppointmentId = command.AppointmentId,
                ClinicId = command.ClinicId,
                ChildId = command.ChildId,
                Type = Data.Enums.EnumAppointmentType.ClinicInitiated,
                Status = Data.Enums.EnumAppointmentStatus.ClinicRequested,
                DateStart = command.DateStart,
                DateEnd = command.DateEnd,
                Notes = command.Notes
            };

            data.AddTimeline(command.UserId, data.Status, command.Notes);

            await _appDbContext.AddAsync(data);

            await _appDbContext.SaveChangesAsync();

            data = await GetAppointment(command.AppointmentId);

            var response = CreateResponse(data, $"Appointment Requested: {data.ReferenceNumber}",
                $"<b>{data.Clinic.Name}</b> requested an appointment {data.ReferenceNumber}.");

            await UpdateNotification(data, response, "fas fa-fw fa-info-circle", data.Child.ParentId);

            await _appointmentHubContext.Clients.User(data.Child.ParentId).ClinicRequested(response);

            var allNotifyIds = (await GetStaffIds(data.ClinicId)).Append(data.Child.ParentId).ToArray();
            await AppointmentUpdated(data, allNotifyIds);
        }

        async Task ICommandHandler<ClinicSetAppointmentInProgressCommand>.HandleAsync(ClinicSetAppointmentInProgressCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.InProgress;

            data.AddTimeline(command.UserId, data.Status, command.Notes);

            await _appDbContext.SaveChangesAsync();

            data = await GetAppointment(command.AppointmentId);

            var response = CreateResponse(data, $"Appointment In Progress: {data.ReferenceNumber}",
                $"<b>{data.Clinic.Name}</b> set to in progress your appointment {data.ReferenceNumber}.");

            await UpdateNotification(data, response, "fas fa-fw fa-info-circle", data.Child.ParentId);

            await _appointmentHubContext.Clients.User(data.Child.ParentId).ClinicSetInProgress(response);

            var allNotifyIds = (await GetStaffIds(data.ClinicId)).Append(data.Child.ParentId).ToArray();
            await AppointmentUpdated(data, allNotifyIds);
        }

        #endregion

        #region Parent
        async Task ICommandHandler<ParentAcceptedAppointmentCommand>.HandleAsync(ParentAcceptedAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.Accepted;

            data.AddTimeline(command.UserId, data.Status, command.Notes);

            await _appDbContext.SaveChangesAsync();

            data = await GetAppointment(command.AppointmentId);

            var staffIds = await GetStaffIds(data.ClinicId);

            var response = CreateResponse(data, $"Appointment Accepted: {data.ReferenceNumber}",
                $"<b>{data.Child.Parent.User.FirstLastName}</b> accepted the appointment {data.ReferenceNumber}.");

            await UpdateNotification(data, response, "fas fa-fw fa-info-circle", staffIds);

            await _appointmentHubContext.Clients.Users(staffIds).ParentAccepted(response);

            var allNotifyIds = staffIds.Append(data.Child.ParentId).ToArray();
            await AppointmentUpdated(data, allNotifyIds);
        }

        async Task ICommandHandler<ParentCancelledAppointmentCommand>.HandleAsync(ParentCancelledAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.ParentCancelled;

            data.AddTimeline(command.UserId, data.Status, command.Notes);

            await _appDbContext.SaveChangesAsync();

            data = await GetAppointment(command.AppointmentId);

            var staffIds = await GetStaffIds(data.ClinicId);

            var response = CreateResponse(data, $"Appointment Cancelled: {data.ReferenceNumber}",
                $"<b>{data.Child.Parent.User.FirstLastName}</b> cancelled the appointment {data.ReferenceNumber}.");

            await UpdateNotification(data, response, "fas fa-fw fa-exclamation-circle", staffIds);

            await _appointmentHubContext.Clients.Users(staffIds).ParentCancelled(response);

            var allNotifyIds = staffIds.Append(data.Child.ParentId).ToArray();
            await AppointmentUpdated(data, allNotifyIds);
        }

        async Task ICommandHandler<ParentRejectedAppointmentCommand>.HandleAsync(ParentRejectedAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.ParentRejected;

            data.AddTimeline(command.UserId, data.Status, command.Notes);

            await _appDbContext.SaveChangesAsync();

            data = await GetAppointment(command.AppointmentId);

            var staffIds = await GetStaffIds(data.ClinicId);

            var response = CreateResponse(data, $"Appointment Rejected: {data.ReferenceNumber}",
                $"<b>{data.Child.Parent.User.FirstLastName}</b> rejected the appointment {data.ReferenceNumber}.");

            await UpdateNotification(data, response, "fas fa-fw fa-exclamation-circle", staffIds);

            await _appointmentHubContext.Clients.Users(staffIds).ParentRejected(response);

            var allNotifyIds = staffIds.Append(data.Child.ParentId).ToArray();
            await AppointmentUpdated(data, allNotifyIds);
        }

        async Task ICommandHandler<ParentRequestedAppointmentCommand>.HandleAsync(ParentRequestedAppointmentCommand command)
        {
            var clinic = await _appDbContext.Clinics.Include(e => e.Appointments).AsNoTracking().FirstOrDefaultAsync(e => e.ClinicId == command.ClinicId);
            clinic.ThrowIfNull();

            //  check if any appointment hit
            var blocked = clinic.Appointments.FirstOrDefault(e =>
                    (command.DateStart > e.DateStart && command.DateStart < e.DateEnd)
                    || (command.DateEnd > e.DateStart && command.DateEnd < e.DateEnd)
                    || (e.DateStart == command.DateStart && e.DateEnd == command.DateEnd)
                    );

            if (blocked != null)
            {
                throw new ApplicationException("Time slot not avaiable.");
            }

            var child = await _appDbContext.Children.Include(e => e.Parent).ThenInclude(e => e.User).AsNoTracking().FirstOrDefaultAsync(e => e.ChildId == command.ChildId);
            child.ThrowIfNull();

            var data = new Appointment
            {
                AppointmentId = command.AppointmentId,
                ReferenceNumber = _sequentialGuidGenerator.GenerateCode(6),
                ClinicId = command.ClinicId,
                ChildId = command.ChildId,
                Type = Data.Enums.EnumAppointmentType.ParentInitiated,
                Status = Data.Enums.EnumAppointmentStatus.ParentRequested,
                DateStart = command.DateStart,
                DateEnd = command.DateEnd,
                Notes = command.Notes
            };

            data.AddTimeline(command.UserId, data.Status, command.Notes);

            await _appDbContext.AddAsync(data);

            await _appDbContext.SaveChangesAsync();

            data = await GetAppointment(command.AppointmentId);

            var staffIds = await GetStaffIds(data.ClinicId);

            var response = CreateResponse(data, $"Appointment Requested: {data.ReferenceNumber}",
                $"<b>{data.Child.Parent.User.FirstLastName}</b> requested the appointment {data.ReferenceNumber}.");

            await UpdateNotification(data, response, "fas fa-fw fa-info-circle", staffIds);

            await _appointmentHubContext.Clients.Users(staffIds).ParentRequested(response);

            var allNotifyIds = staffIds.Append(data.Child.ParentId).ToArray();
            await AppointmentUpdated(data, allNotifyIds);
        }

        #endregion

        async Task<string[]> GetStaffIds(string clinicId)
        {
            var staffIds = await _appDbContext.ClinicStaffs
                .Where(e => e.ClinicId == clinicId)
                .Select(e => e.StaffId)
                .Distinct()
                .ToArrayAsync();

            return staffIds;
        }

        async Task<Appointment> GetAppointment(string id)
        {
            var data = await _appDbContext.Appointments
                .Include(e => e.Clinic)
                .Include(e => e.Child)
                    .ThenInclude(e => e.Parent)
                        .ThenInclude(e => e.User)
                .AsNoTracking()
                .FirstAsync(e => e.AppointmentId == id);

            return data;
        }

        Response CreateResponse(Appointment data, string title, string content)
        {
            var response = new Response
            {
                AppointmentId = data.AppointmentId,
                ReferenceNumber = data.ReferenceNumber,

                ClinicId = data.Clinic.ClinicId,
                ClinicName = data.Clinic.Name,

                ChildId = data.Child.ChildId,
                ChildName = data.Child.FirstLastName,

                ParentId = data.Child.Parent.ParentId,
                ParentName = data.Child.Parent.User.FirstLastName,
                Title = title,
                Content = content
            };

            return response;
        }

        async Task UpdateNotification(Appointment data, Response response, string classIcon, params string[] notifyIds)
        {
            await _notificationService.DeleteNotificationByReferenceId(data.AppointmentId);
            await _notificationService.AddNotification(data.AppointmentId, classIcon, response.Title, response.Content, EnumNotificationType.Info, notifyIds, null);
        }

        async Task AppointmentUpdated(Appointment data, IReadOnlyList<string> notifyIds)
        {
            await _appointmentHubContext.Clients.Users(notifyIds).AppointmentUpdated(data.AppointmentId);
        }
    }
}
