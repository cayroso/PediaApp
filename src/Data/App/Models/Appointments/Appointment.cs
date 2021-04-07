using Common.Extensions;
using Data.App.Models.Clinics;
using Data.App.Models.Parents;
using Data.Enums;
using System;
using System.Collections.Generic;

namespace Data.App.Models.Appointments
{
    public class Appointment
    {
        public string AppointmentId { get; set; }

        public EnumAppointmentType Type { get; set; }
        public EnumAppointmentStatus Status { get; set; }
        public string StatusReason { get; set; }

        public string ClinicId { get; set; }
        public virtual Clinic Clinic { get; set; }

        public string ChildId { get; set; }
        public virtual Child Child { get; set; }

        public string ReferenceNumber { get; set; }

        DateTime _dateStart = DateTime.UtcNow.Truncate();
        public DateTime DateStart
        {
            get => _dateStart.AsUtc();
            set => _dateStart = value.Truncate();
        }

        DateTime _dateEnd = DateTime.UtcNow.Truncate();
        public DateTime DateEnd
        {
            get => _dateEnd.AsUtc();
            set => _dateEnd = value.Truncate();
        }

        public string Notes { get; set; }

        DateTime _dateCreated = DateTime.UtcNow.Truncate();
        public DateTime DateCreated
        {
            get => _dateCreated.AsUtc();
            set => _dateCreated = value.Truncate();
        }

        public string ConcurrencyToken { get; set; } = Guid.NewGuid().ToString();

        public virtual ICollection<AppointmentTimeline> Timelines { get; set; } = new List<AppointmentTimeline>();
        public virtual ICollection<ChildMedicalEntry> MedicalEntries { get; set; } = new List<ChildMedicalEntry>();

        public void AddTimeline(string userId, EnumAppointmentStatus status, string notes)
        {
            Timelines.Add(new AppointmentTimeline
            {
                AppointmentId = AppointmentId,
                UserId = userId,
                Status = status,
                Notes = notes
            });
        }
    }

    public static class AppointmentExtension
    {
        public static void ThrowIfNull(this Appointment me)
        {
            if (me == null)
                throw new ApplicationException("Appointment not found.");
        }
        public static void ThrowIfNullOrAlreadyUpdated(this Appointment me, string currentToken, string newToken)
        {
            me.ThrowIfNull();

            if (string.IsNullOrWhiteSpace(newToken))
                throw new ApplicationException("Anti-forgery token not found.");

            if (me.ConcurrencyToken != currentToken)
                throw new ApplicationException("Already updated by another user.");

            me.ConcurrencyToken = newToken;
        }
    }
}
