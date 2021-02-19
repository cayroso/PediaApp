using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Appointments.Common.Commands.Command.Parent
{
    public sealed class ParentRequestedAppointmentCommand : AbstractCommand
    {
        public string AppointmentId { get; set; }
        public string ClinicId { get; set; }
        public string ChildId { get; set; }
        public DateTime DateStart { get; }
        public DateTime DateEnd { get; }
        public string Notes { get; }

        public ParentRequestedAppointmentCommand(string correlationId, string tenantId, string userId,
            string appointmentId, string clinicId, string childId, DateTime dateStart, DateTime dateEnd, string notes)
            : base(correlationId, tenantId, userId)
        {
            AppointmentId = appointmentId;
            ClinicId = clinicId;
            ChildId = childId;
            DateStart = dateStart;
            DateEnd = dateEnd;
            Notes = notes;
        }
    }
}
