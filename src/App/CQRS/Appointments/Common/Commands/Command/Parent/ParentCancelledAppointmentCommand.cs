using Cayent.Core.CQRS.Commands;

namespace App.CQRS.Appointments.Common.Commands.Command.Parent
{
    public sealed class ParentCancelledAppointmentCommand : AbstractCommand
    {
        public string AppointmentId { get; }
        public string Token { get; }
        public string Notes { get; }

        public ParentCancelledAppointmentCommand(string correlationId, string tenantId, string userId,
            string appointmentId, string token, string notes)
            : base(correlationId, tenantId, userId)
        {
            AppointmentId = appointmentId;
            Token = token;
            Notes = notes;
        }
    }
}
