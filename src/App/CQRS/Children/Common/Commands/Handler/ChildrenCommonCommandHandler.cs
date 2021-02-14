using App.CQRS.Children.Common.Commands.Command;
using App.Services;
using Data.App.DbContext;
using Data.App.Models.Appointments;
using Data.App.Models.Parents;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Children.Common.Commands.Handler
{
    public sealed class ChildrenCommonCommandHandler :
        ICommandHandler<AddChildCommand>,
        ICommandHandler<AddMedicalEntryCommand>
    {
        readonly AppDbContext _appDbContext;
        readonly ISequentialGuidGenerator _sequentialGuidGenerator;
        public ChildrenCommonCommandHandler(AppDbContext appDbContext, ISequentialGuidGenerator sequentialGuidGenerator)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
            _sequentialGuidGenerator = sequentialGuidGenerator ?? throw new ArgumentNullException(nameof(sequentialGuidGenerator));
        }

        async Task ICommandHandler<AddChildCommand>.HandleAsync(AddChildCommand command)
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

        async Task ICommandHandler<AddMedicalEntryCommand>.HandleAsync(AddMedicalEntryCommand command)
        {
            var child = await _appDbContext.Children.FirstOrDefaultAsync(e => e.ChildId == command.ChildId);

            child.ThrowIfNull();

            var appointment = await _appDbContext.Appointments.FirstOrDefaultAsync(e => e.AppointmentId == command.AppointmentId);

            appointment.ThrowIfNull();

            var childMedicalEntry = new ChildMedicalEntry
            {
                Child = child,
                Appointment = appointment,
                Age = command.Age,
                Height = command.Height,
                Weight = command.Weight,
                Summary = command.Summary,
            };

            await _appDbContext.AddAsync(childMedicalEntry);

            await _appDbContext.SaveChangesAsync();
        }
    }
}
