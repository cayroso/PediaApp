using Cayent.Core.CQRS.Commands;
using System;

namespace App.CQRS.Children.Common.Commands.Command
{
    public sealed class AddMedicalEntryCommand : AbstractCommand
    {
        public string ChildMedicalEntryId { get; }
        public string AppointmentId { get; }
        public string ChildId { get; }
        public double Age { get; }
        public double Height { get; }
        public double Weight { get; }
        public double HeadCircumference { get; }
        public double ChestCircumference { get; }
        public string Summary { get; }
        public DateTime DateCreated { get; }
        public DateTime DateReturn { get; }

        public AddMedicalEntryCommand(string correlationId, string tenantId, string userId,
            string childMedicalEntryId, string appointmentId, string childId, double age, double height, double weight,
            double headCircumference, double chestCircumference, string summary, DateTime dateCreated, DateTime dateReturn)
            : base(correlationId, tenantId, userId)
        {
            ChildMedicalEntryId = childMedicalEntryId;
            AppointmentId = appointmentId;
            ChildId = childId;
            Age = age;
            Height = height;
            Weight = weight;
            HeadCircumference = headCircumference;
            ChestCircumference = chestCircumference;
            Summary = summary;
            DateCreated = dateCreated;
            DateReturn = dateReturn;
        }

    }
}
