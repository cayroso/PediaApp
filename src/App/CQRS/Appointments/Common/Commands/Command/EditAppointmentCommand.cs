using Cayent.Core.CQRS.Commands;
using System;

namespace App.CQRS.Appointments.Common.Commands.Command
{
    public class EditAppointmentCommand : AbstractCommand
    {
        public string ClinicId { get;  }
        public string AppointmentId { get; }
        public string Token { get; }
        public DateTime DateStart { get; }
        public DateTime DateEnd { get; }

        public EditAppointmentCommand(string correlationId, string tenantId, string userId,
            string clinicId, string appointmentId, string token, DateTime dateStart, DateTime dateEnd)
            : base(correlationId, tenantId, userId)
        {
            ClinicId = clinicId;
            AppointmentId = appointmentId;
            Token = token;
            DateStart = dateStart;
            DateEnd = dateEnd;
        }
    }
}
