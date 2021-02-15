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

            data.Timelines.Add(new AppointmentTimeline
            {
                AppointmentId = command.AppointmentId,
                UserId = command.UserId,
                Status = data.Status,
                Notes = command.Notes,
            });

            await _appDbContext.SaveChangesAsync();

            var notifyIds = new[] { data.Child.ParentId };

            await _appointmentHubContext.Clients.Users(notifyIds).ClinicAccepted(new Response
            {
                AppointmentId = data.AppointmentId,
                ClinicId = data.Clinic.ClinicId,
                ClinicName = data.Clinic.Name,

                ChildId = data.Child.ChildId,
                ChildName = data.Child.FirstLastName,

                ParentId = data.Child.Parent.ParentId,
                ParentName = data.Child.Parent.User.FirstLastName,
            });

            await _notificationService.AddNotification(data.AppointmentId, "fas fa-fw fa-info", "Clinic Accepted", "", EnumNotificationType.Info, notifyIds, null);
        }

        async Task ICommandHandler<ClinicArchivedAppointmentCommand>.HandleAsync(ClinicArchivedAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.Archived;

            data.Timelines.Add(new AppointmentTimeline
            {
                AppointmentId = command.AppointmentId,
                UserId = command.UserId,
                Status = data.Status,
                Notes = command.Notes,
            });

            await _appDbContext.SaveChangesAsync();

            var notifyIds = new[] { data.Child.ParentId };

            await _appointmentHubContext.Clients.Users(notifyIds).ClinicArchived(new Response
            {
                AppointmentId = data.AppointmentId,
                ClinicId = data.Clinic.ClinicId,
                ClinicName = data.Clinic.Name,

                ChildId = data.Child.ChildId,
                ChildName = data.Child.FirstLastName,

                ParentId = data.Child.Parent.ParentId,
                ParentName = data.Child.Parent.User.FirstLastName,
            });

            await _notificationService.AddNotification(data.AppointmentId, "fas fa-fw fa-info", "Clinic Archived", "", EnumNotificationType.Info, notifyIds, null);
        }

        async Task ICommandHandler<ClinicCancelledAppointmentCommand>.HandleAsync(ClinicCancelledAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.ClinicCancelled;

            data.Timelines.Add(new AppointmentTimeline
            {
                AppointmentId = command.AppointmentId,
                UserId = command.UserId,
                Status = data.Status,
                Notes = command.Notes,
            });

            await _appDbContext.SaveChangesAsync();

            var notifyIds = new[] { data.Child.ParentId };

            await _appointmentHubContext.Clients.Users(notifyIds).ClinicCancelled(new Response
            {
                AppointmentId = data.AppointmentId,
                ClinicId = data.Clinic.ClinicId,
                ClinicName = data.Clinic.Name,

                ChildId = data.Child.ChildId,
                ChildName = data.Child.FirstLastName,

                ParentId = data.Child.Parent.ParentId,
                ParentName = data.Child.Parent.User.FirstLastName,
            });

            await _notificationService.AddNotification(data.AppointmentId, "fas fa-fw fa-info", "Clinic Cancelled", "", EnumNotificationType.Info, notifyIds, null);
        }

        async Task ICommandHandler<ClinicCompletedAppointmentCommand>.HandleAsync(ClinicCompletedAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.Completed;

            data.Timelines.Add(new AppointmentTimeline
            {
                AppointmentId = command.AppointmentId,
                UserId = command.UserId,
                Status = data.Status,
                Notes = command.Notes,
            });

            await _appDbContext.SaveChangesAsync();

            var notifyIds = new[] { data.Child.ParentId };

            await _appointmentHubContext.Clients.Users(notifyIds).ClinicCompleted(new Response
            {
                AppointmentId = data.AppointmentId,
                ClinicId = data.Clinic.ClinicId,
                ClinicName = data.Clinic.Name,

                ChildId = data.Child.ChildId,
                ChildName = data.Child.FirstLastName,

                ParentId = data.Child.Parent.ParentId,
                ParentName = data.Child.Parent.User.FirstLastName,
            });

            await _notificationService.AddNotification(data.AppointmentId, "fas fa-fw fa-info", "Clinic Completed", "", EnumNotificationType.Info, notifyIds, null);
        }

        async Task ICommandHandler<ClinicRejectedAppointmentCommand>.HandleAsync(ClinicRejectedAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.ClinicRequested;

            data.Timelines.Add(new AppointmentTimeline
            {
                AppointmentId = command.AppointmentId,
                UserId = command.UserId,
                Status = data.Status,
                Notes = command.Notes,
            });

            await _appDbContext.SaveChangesAsync();

            var notifyIds = new[] { data.Child.ParentId };

            await _appointmentHubContext.Clients.Users(notifyIds).ClinicRejected(new Response
            {
                AppointmentId = data.AppointmentId,
                ClinicId = data.Clinic.ClinicId,
                ClinicName = data.Clinic.Name,

                ChildId = data.Child.ChildId,
                ChildName = data.Child.FirstLastName,

                ParentId = data.Child.Parent.ParentId,
                ParentName = data.Child.Parent.User.FirstLastName,
            });

            await _notificationService.AddNotification(data.AppointmentId, "fas fa-fw fa-info", "Clinic Rejected", "", EnumNotificationType.Info, notifyIds, null);
        }

        async Task ICommandHandler<ClinicRequestedAppointmentCommand>.HandleAsync(ClinicRequestedAppointmentCommand command)
        {
            var clinic = await _appDbContext.Clinics.AsNoTracking().FirstOrDefaultAsync(e => e.ClinicId == command.ClinicId);
            clinic.ThrowIfNull();

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

            data.Timelines.Add(new AppointmentTimeline
            {
                AppointmentId = command.AppointmentId,
                UserId = command.UserId,
                Status = data.Status,
                Notes = command.Notes,
            });

            await _appDbContext.AddAsync(data);

            await _appDbContext.SaveChangesAsync();

            var notifyIds = new[] { data.Child.ParentId };

            await _appointmentHubContext.Clients.Users(notifyIds).ClinicRequested(new Response
            {
                AppointmentId = data.AppointmentId,
                ClinicId = clinic.ClinicId,
                ClinicName = clinic.Name,

                ChildId = child.ChildId,
                ChildName = child.FirstLastName,

                ParentId = child.Parent.ParentId,
                ParentName = child.Parent.User.FirstLastName,
            });

            await _notificationService.AddNotification(data.AppointmentId, "fas fa-fw fa-info", "Clinic Requested", "", EnumNotificationType.Info, notifyIds, null);
        }

        async Task ICommandHandler<ClinicSetAppointmentInProgressCommand>.HandleAsync(ClinicSetAppointmentInProgressCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.InProgress;

            data.Timelines.Add(new AppointmentTimeline
            {
                AppointmentId = command.AppointmentId,
                UserId = command.UserId,
                Status = data.Status,
                Notes = command.Notes,
            });

            await _appDbContext.SaveChangesAsync();

            var notifyIds = new[] { data.Child.ParentId };

            await _appointmentHubContext.Clients.Users(notifyIds).ClinicSetInProgress(new Response
            {
                AppointmentId = data.AppointmentId,
                ClinicId = data.Clinic.ClinicId,
                ClinicName = data.Clinic.Name,

                ChildId = data.Child.ChildId,
                ChildName = data.Child.FirstLastName,

                ParentId = data.Child.Parent.ParentId,
                ParentName = data.Child.Parent.User.FirstLastName,
            });

            await _notificationService.AddNotification(data.AppointmentId, "fas fa-fw fa-info", "Clinic Set In Progress", "", EnumNotificationType.Info, notifyIds, null);
        }

        #endregion

        #region Parent
        async Task ICommandHandler<ParentAcceptedAppointmentCommand>.HandleAsync(ParentAcceptedAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.Accepted;

            data.Timelines.Add(new AppointmentTimeline
            {
                AppointmentId = command.AppointmentId,
                UserId = command.UserId,
                Status = data.Status,
                Notes = command.Notes,
            });

            await _appDbContext.SaveChangesAsync();

            var staffIds = await GetStaffIds(data.ClinicId);

            await _appointmentHubContext.Clients.Users(staffIds).ParentAccepted(new Response
            {
                AppointmentId = data.AppointmentId,
                ClinicId = data.Clinic.ClinicId,
                ClinicName = data.Clinic.Name,

                ChildId = data.Child.ChildId,
                ChildName = data.Child.FirstLastName,

                ParentId = data.Child.Parent.ParentId,
                ParentName = data.Child.Parent.User.FirstLastName,
            });

            await _notificationService.AddNotification(data.AppointmentId, "fas fa-fw fa-info", "Parent Accepted", "", EnumNotificationType.Info, staffIds, null);
        }

        async Task ICommandHandler<ParentCancelledAppointmentCommand>.HandleAsync(ParentCancelledAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.ParentCancelled;

            data.Timelines.Add(new AppointmentTimeline
            {
                AppointmentId = command.AppointmentId,
                UserId = command.UserId,
                Status = data.Status,
                Notes = command.Notes,
            });

            await _appDbContext.SaveChangesAsync();

            var staffIds = await GetStaffIds(data.ClinicId);

            await _appointmentHubContext.Clients.Users(staffIds).ParentCancelled(new Response
            {
                AppointmentId = data.AppointmentId,
                ClinicId = data.Clinic.ClinicId,
                ClinicName = data.Clinic.Name,

                ChildId = data.Child.ChildId,
                ChildName = data.Child.FirstLastName,

                ParentId = data.Child.Parent.ParentId,
                ParentName = data.Child.Parent.User.FirstLastName,
            });

            await _notificationService.AddNotification(data.AppointmentId, "fas fa-fw fa-info", "Parent Cancelled", "", EnumNotificationType.Info, staffIds, null);
        }

        async Task ICommandHandler<ParentRejectedAppointmentCommand>.HandleAsync(ParentRejectedAppointmentCommand command)
        {
            var data = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Status = Data.Enums.EnumAppointmentStatus.ParentRejected;

            data.Timelines.Add(new AppointmentTimeline
            {
                AppointmentId = command.AppointmentId,
                UserId = command.UserId,
                Status = data.Status,
                Notes = command.Notes,
            });

            await _appDbContext.SaveChangesAsync();

            var staffIds = await GetStaffIds(data.ClinicId);

            await _appointmentHubContext.Clients.Users(staffIds).ParentRejected(new Response
            {
                AppointmentId = data.AppointmentId,
                ClinicId = data.Clinic.ClinicId,
                ClinicName = data.Clinic.Name,

                ChildId = data.Child.ChildId,
                ChildName = data.Child.FirstLastName,

                ParentId = data.Child.Parent.ParentId,
                ParentName = data.Child.Parent.User.FirstLastName,
            });

            await _notificationService.AddNotification(data.AppointmentId, "fas fa-fw fa-info", "Parent Rejected", "", EnumNotificationType.Info, staffIds, null);
        }

        async Task ICommandHandler<ParentRequestedAppointmentCommand>.HandleAsync(ParentRequestedAppointmentCommand command)
        {
            var clinic = await _appDbContext.Clinics.Include(e => e.Appointments).AsNoTracking().FirstOrDefaultAsync(e => e.ClinicId == command.ClinicId);
            clinic.ThrowIfNull();

            //  check if any appointment hit
            var blocked = clinic.Appointments.Any(e =>
                    (command.DateStart >= e.DateStart && command.DateStart >= e.DateEnd)
                    || (command.DateEnd >= e.DateStart && command.DateEnd >= e.DateEnd)
                    );

            if (blocked)
            {
                throw new ApplicationException("Time slot not avaiable");
            }


            var child = await _appDbContext.Children.Include(e => e.Parent).ThenInclude(e => e.User).AsNoTracking().FirstOrDefaultAsync(e => e.ChildId == command.ChildId);
            child.ThrowIfNull();

            var data = new Appointment
            {
                AppointmentId = command.AppointmentId,
                ClinicId = command.ClinicId,
                ChildId = command.ChildId,
                Type = Data.Enums.EnumAppointmentType.ParentInitiated,
                Status = Data.Enums.EnumAppointmentStatus.ParentRequested,
                DateStart = command.DateStart,
                DateEnd = command.DateEnd,
                Notes = command.Notes
            };

            data.Timelines.Add(new AppointmentTimeline
            {
                AppointmentId = command.AppointmentId,
                UserId = command.UserId,
                Status = data.Status,
                Notes = command.Notes,
            });

            await _appDbContext.AddAsync(data);

            await _appDbContext.SaveChangesAsync();

            var staffIds = await GetStaffIds(data.ClinicId);

            await _appointmentHubContext.Clients.Users(staffIds).ParentRequested(new Response
            {
                AppointmentId = data.AppointmentId,
                ClinicId = clinic.ClinicId,
                ClinicName = clinic.Name,

                ChildId = child.ChildId,
                ChildName = child.FirstLastName,

                ParentId = child.Parent.ParentId,
                ParentName = child.Parent.User.FirstLastName,
            });

            await _notificationService.AddNotification(data.AppointmentId, "fas fa-fw fa-info", "Parent Requested", "", EnumNotificationType.Info, staffIds, null);
        }

        #endregion

        async Task<string[]> GetStaffIds(string clinicId)
        {
            var staffIds = await _appDbContext.ClinicStaffs
                .Where(e => e.ClinicId == clinicId)
                .Select(e => e.StaffId)
                .ToArrayAsync();

            return staffIds;
        }
    }
}
