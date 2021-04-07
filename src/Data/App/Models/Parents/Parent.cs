
using Data.App.Models.Clinics;
using Data.App.Models.Users;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.App.Models.Parents
{
    public class Parent
    {
        public string ParentId { get; set; }
        public virtual User User { get; set; }

        public virtual ICollection<Child> Children { get; set; } = new List<Child>();
        public virtual ICollection<ParentClinic> ParentClinics { get; set; } = new List<ParentClinic>();

    }

    public class ParentClinic
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ParentClinicId { get; set; }

        public string ParentId { get; set; }
        public virtual Parent Parent { get; set; }

        public string ClinicId { get; set; }
        public virtual Clinic Clinic { get; set; }
    }
}
