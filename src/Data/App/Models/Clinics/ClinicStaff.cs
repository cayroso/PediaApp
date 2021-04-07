using Data.App.Models.Users;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.App.Models.Clinics
{
    public class ClinicStaff
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ClinicStaffId { get; set; }

        public string ClinicId { get; set; }
        public virtual Clinic Clinic { get; set; }

        public string StaffId { get; set; }
        public virtual Staff Staff { get; set; }

        public string RoleId { get; set; }
        public virtual Role Role { get; set; }
    }
}
