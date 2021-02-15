using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Appointments.Common.Commands.Command
{
    public class EditAppointmentCommand : AbstractCommand
    {
        public string AppointmentId { get; }
        public string Token { get; }
        public DateTime DateStart { get; }
        public DateTime DateEnd { get; }

        public EditAppointmentCommand(string correlationId, string tenantId, string userId,
            string appointmentId, string token, DateTime dateStart, DateTime dateEnd)
            : base(correlationId, tenantId, userId)
        {
            AppointmentId = appointmentId;
            Token = token;
            DateStart = dateStart;
            DateEnd = dateEnd;
        }
    }
}
