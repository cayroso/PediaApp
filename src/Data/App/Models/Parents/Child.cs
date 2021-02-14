using Common.Extensions;
using Data.App.Models.Appointments;
using Data.App.Models.FileUploads;
using Data.App.Models.Users;
using Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.App.Models.Parents
{
    public class Child
    {
        public string ChildId { get; set; }

        public string ParentId { get; set; }
        public virtual Parent Parent { get; set; }

        public string ImageId { get; set; }
        public virtual FileUpload Image { get; set; }

        public EnumGender Gender { get; set; }

        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        
        DateTime _dateOfBirth = DateTime.UtcNow.Truncate();
        public DateTime DateOfBirth
        {
            get => _dateOfBirth.AsUtc();
            set => _dateOfBirth = value.Truncate();
        }

        [NotMapped]
        public string FirstLastName => $"{FirstName} {LastName}";
        [NotMapped]
        public string Initials => $"{FirstName[0]}{LastName[0]}".ToUpper();

        DateTime _dateCreated = DateTime.UtcNow.Truncate();
        public DateTime DateCreated
        {
            get => _dateCreated.AsUtc();
            set => _dateCreated = value.Truncate();
        }

        public string ConcurrencyToken { get; set; } = Guid.NewGuid().ToString();

        public virtual ICollection<ChildMedicalEntry> MedicalEntries { get; set; } = new List<ChildMedicalEntry>();
        //public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }

    public static class ChildExtension
    {
        public static void ThrowIfNull(this Child me)
        {
            if (me == null)
                throw new ApplicationException("Child not found.");
        }
        public static void ThrowIfNullOrAlreadyUpdated(this Child me, string currentToken, string newToken)
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
