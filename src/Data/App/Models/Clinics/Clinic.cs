using Common.Extensions;
using Data.App.Models.Appointments;
using Data.App.Models.Chats;
using Data.App.Models.Parents;
using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.App.Models.Clinics
{
    public class Clinic
    {
        public string ClinicId { get; set; }

        public virtual Chat Chat { get; set; }
        public EnumClinicStatus ClinicStatus { get; set; }
        
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string OpeningHours { get; set; }
        public string Address { get; set; }
        public double GeoX { get; set; }
        public double GeoY { get; set; }        
        
        DateTime _dateCreated = DateTime.UtcNow.Truncate();
        public DateTime DateCreated
        {
            get => _dateCreated.AsUtc();
            set => _dateCreated = value.Truncate();
        }

        public string ConcurrencyToken { get; set; } = Guid.NewGuid().ToString();

        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public virtual ICollection<ParentClinic> ParentClinics { get; set; } = new List<ParentClinic>();
        public virtual ICollection<ClinicStaff> Staffs { get; set; } = new List<ClinicStaff>();
    }

    public static class ClinicExtension
    {
        public static void ThrowIfNull(this Clinic me)
        {
            if (me == null)
                throw new ApplicationException("Clinic not found.");
        }
        public static void ThrowIfNullOrAlreadyUpdated(this Clinic me, string currentToken, string newToken)
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
