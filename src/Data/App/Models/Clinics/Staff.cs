using Data.App.Models.Users;
using System.Collections.Generic;

namespace Data.App.Models.Clinics
{
    public class Staff
    {
        public string StaffId { get; set; }
        public virtual User User { get; set; }

        public virtual ICollection<ClinicStaff> Clinics { get; set; } = new List<ClinicStaff>();
    }
}
