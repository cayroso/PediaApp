using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Children.Common.Commands.Command
{
    public sealed class AddMedicalEntryCommand : AbstractCommand
    {
        public string AppointmentId { get; }
        public string ChildId { get; }
        public double Age { get; }
        public double Height { get; }
        public double Weight { get; }
        public string Summary { get; }

        public AddMedicalEntryCommand(string correlationId, string tenantId, string userId,
            string appointmentId, string childId, double age, double height, double weight, string summary)
            : base(correlationId, tenantId, userId)
        {
            AppointmentId = appointmentId;
            ChildId = childId;
            Age = age;
            Height = height;
            Weight = weight;
            Summary = summary;
        }

    }
}
