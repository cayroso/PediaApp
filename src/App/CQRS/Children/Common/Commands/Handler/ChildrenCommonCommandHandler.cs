﻿using App.CQRS.Children.Common.Commands.Command;
using App.Services;
using Cayent.Core.CQRS.Commands;
using Cayent.Core.CQRS.Services;
using Data.App.DbContext;
using Data.App.Models.Appointments;
using Data.App.Models.Parents;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace App.CQRS.Children.Common.Commands.Handler
{
    public sealed class ChildrenCommonCommandHandler :
        ICommandHandler<AddChildCommand>,
        ICommandHandler<AddMedicalEntryCommand>,
        ICommandHandler<EditChildCommand>,
        ICommandHandler<EditMedicalEntryCommand>

    {
        readonly AppDbContext _appDbContext;
        readonly ISequentialGuidGenerator _sequentialGuidGenerator;
        public ChildrenCommonCommandHandler(AppDbContext appDbContext, ISequentialGuidGenerator sequentialGuidGenerator)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
            _sequentialGuidGenerator = sequentialGuidGenerator ?? throw new ArgumentNullException(nameof(sequentialGuidGenerator));
        }

        async Task ICommandHandler<AddChildCommand>.HandleAsync(AddChildCommand command, CancellationToken cancellationToken)
        {
            var child = new Child
            {
                ChildId = command.ChildId,
                ParentId = command.ParentId,
                Gender = command.Gender,
                FirstName = command.FirstName,
                MiddleName = command.MiddleName,
                LastName = command.LastName,
                DateOfBirth = command.DateOfBirth,
            };

            await _appDbContext.AddAsync(child);

            await _appDbContext.SaveChangesAsync();
        }

        async Task ICommandHandler<AddMedicalEntryCommand>.HandleAsync(AddMedicalEntryCommand command, CancellationToken cancellationToken)
        {
            var child = await _appDbContext.Children.FirstOrDefaultAsync(e => e.ChildId == command.ChildId);

            child.ThrowIfNull();

            var appointment = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            appointment.ThrowIfNull();

            var childMedicalEntry = new ChildMedicalEntry
            {
                ChildMedicalEntryId = command.ChildMedicalEntryId,
                Child = child,
                Appointment = appointment,
                Age = command.Age,
                Height = command.Height,
                Weight = command.Weight,
                HeadCircumference = command.HeadCircumference,
                ChestCircumference = command.ChestCircumference,
                Summary = command.Summary,
                DateCreated = command.DateCreated,
                DateReturn = command.DateReturn
            };

            await _appDbContext.AddAsync(childMedicalEntry);

            await _appDbContext.SaveChangesAsync();
        }

        async Task ICommandHandler<EditChildCommand>.HandleAsync(EditChildCommand command, CancellationToken cancellationToken)
        {
            var data = await _appDbContext.Children.FirstOrDefaultAsync(e => e.ChildId == command.ChildId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Gender = command.Gender;
            data.FirstName = command.FirstName;
            data.MiddleName = command.MiddleName;
            data.LastName = command.LastName;
            data.DateOfBirth = command.DateOfBirth;

            await _appDbContext.SaveChangesAsync();
        }

        async Task ICommandHandler<EditMedicalEntryCommand>.HandleAsync(EditMedicalEntryCommand command, CancellationToken cancellationToken)
        {
            var data = await _appDbContext.ChildMedicalEntries.FirstOrDefaultAsync(e => e.ChildMedicalEntryId == command.ChildMedicalEntryId);

            data.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            data.Age = command.Age;
            data.Height = command.Height;
            data.Weight = command.Weight;
            data.HeadCircumference = command.HeadCircumference;
            data.ChestCircumference = command.ChestCircumference;
            data.Summary = command.Summary;
            data.DateCreated = command.DateCreated;
            data.DateReturn = command.DateReturn;

            await _appDbContext.SaveChangesAsync();
        }
    }
}
