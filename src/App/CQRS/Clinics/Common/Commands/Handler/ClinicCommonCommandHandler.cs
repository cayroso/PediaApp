using App.CQRS.Clinics.Common.Commands.Command;
using App.Services;
using Cayent.Core.CQRS.Commands;
using Cayent.Core.CQRS.Services;
using Data.App.DbContext;
using Data.App.Models.Clinics;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace App.CQRS.Clinics.Common.Commands.Handler
{
    public sealed class ClinicCommonCommandHandler :
        ICommandHandler<EditClinicCommand>
    {
        readonly AppDbContext _appDbContext;
        readonly ISequentialGuidGenerator _sequentialGuidGenerator;
        public ClinicCommonCommandHandler(AppDbContext appDbContext, ISequentialGuidGenerator sequentialGuidGenerator)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
            _sequentialGuidGenerator = sequentialGuidGenerator ?? throw new ArgumentNullException(nameof(sequentialGuidGenerator));
        }

        async Task ICommandHandler<EditClinicCommand>.HandleAsync(EditClinicCommand command, CancellationToken cancellationToken)
        {
            var clinic = await _appDbContext.Clinics.FirstOrDefaultAsync(e => e.ClinicId == command.ClinicId);

            clinic.ThrowIfNullOrAlreadyUpdated(command.Token, _sequentialGuidGenerator.NewId());

            clinic.Name = command.Name;
            clinic.PhoneNumber = command.PhoneNumber;
            clinic.MobileNumber = command.MobileNumber;
            clinic.Email = command.Email;            
            clinic.Address = command.Address;
            clinic.GeoX = command.GeoX;
            clinic.GeoY = command.GeoY;

            await _appDbContext.SaveChangesAsync();
        }
    }
}
