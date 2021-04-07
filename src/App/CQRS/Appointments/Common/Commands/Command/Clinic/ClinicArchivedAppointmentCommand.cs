using Cayent.Core.CQRS.Commands;

namespace App.CQRS.Appointments.Common.Commands.Command.Clinic
{
    public sealed class ClinicArchivedAppointmentCommand : AbstractCommand
    {
        public string AppointmentId { get; }
        public string Token { get; }
        public string Notes { get; }

        public ClinicArchivedAppointmentCommand(string correlationId, string tenantId, string userId,
            string appointmentId, string token, string notes)
            : base(correlationId, tenantId, userId)
        {
            AppointmentId = appointmentId;
            Token = token;
            Notes = notes;
        }
    }
}
