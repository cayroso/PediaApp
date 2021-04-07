using Common.Extensions;
using Data.App.Models.Users;
using Data.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.App.Models.Appointments
{
    public class AppointmentTimeline
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string AppointmentTimelineId { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public string AppointmentId { get; set; }
        public virtual Appointment Appointment { get; set; }

        public EnumAppointmentStatus Status { get; set; }
        public string Notes { get; set; }

        DateTime _dateTimeline = DateTime.UtcNow.Truncate();
        public DateTime DateTimeline
        {
            get => _dateTimeline.AsUtc();
            set => _dateTimeline = value.Truncate();
        }
    }
}
