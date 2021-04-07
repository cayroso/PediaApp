using Cayent.Core.CQRS.Commands;

namespace App.CQRS.Appointments.Common.Commands.Command
{
    public class DeleteAppointmentCommand : AbstractCommand
    {
        public string AppointmentId { get; }
        public string Token { get; }

        public DeleteAppointmentCommand(string correlationId, string tenantId, string userId,
            string appointmentId, string token)
            : base(correlationId, tenantId, userId)
        {
            AppointmentId = appointmentId;
            Token = token;
        }
    }
}
