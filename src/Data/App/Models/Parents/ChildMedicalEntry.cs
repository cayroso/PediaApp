using Common.Extensions;
using Data.App.Models.Appointments;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.App.Models.Parents
{
    public class ChildMedicalEntry
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ChildMedicalEntryId { get; set; }

        public string AppointmentId { get; set; }
        public virtual Appointment Appointment { get; set; }

        public string ChildId { get; set; }
        public virtual Child Child { get; set; }

        public double Age { get; set; }
        public double Weight { get; set; }
        public double Height { get; set; }
        public double HeadCircumference { get; set; }
        public double ChestCircumference { get; set; }
        public string Summary { get; set; }

        DateTime _dateCreated = DateTime.UtcNow.Truncate();
        public DateTime DateCreated
        {
            get => _dateCreated.AsUtc();
            set => _dateCreated = value.Truncate();
        }

        DateTime _dateReturn = DateTime.UtcNow.AddMonths(1).Truncate();
        public DateTime DateReturn
        {
            get => _dateReturn.AsUtc();
            set => _dateReturn = value.Truncate();
        }

        public string ConcurrencyToken { get; set; } = Guid.NewGuid().ToString();
    }

    public static class ChildMedicalEntryExtension
    {
        public static void ThrowIfNull(this ChildMedicalEntry me)
        {
            if (me == null)
                throw new ApplicationException("Child Medical Entry not found.");
        }
        public static void ThrowIfNullOrAlreadyUpdated(this ChildMedicalEntry me, string currentToken, string newToken)
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
