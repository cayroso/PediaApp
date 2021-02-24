using Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class AddChildInfo
    {
        [Required]
        public EnumGender Gender { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string MiddleName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }

    }

    public class EditChildInfo
    {
        [Required]
        public string ChildId { get; set; }
        [Required]
        public string Token { get; set; }
        [Required]
        public EnumGender Gender { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string MiddleName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }

    }

    public class AddChildMedicalEntryInfo
    {
        [Required]
        public string ChildId { get; set; }
        //[Required]
        public string AppointmentId { get; set; }
        //[Required]
        public double Age { get; set; }
        //[Required]
        public double Height { get; set; }
        //[Required]
        public double Weight { get; set; }
        //[Required]
        public double HeadCircumference { get; set; }
        //[Required]
        public double ChestCircumference { get; set; }
        //[Required]
        public string Summary { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }
        [Required]
        public DateTime DateReturn { get; set; }

    }

    public class EditChildMedicalEntryInfo
    {
        [Required]
        public string ChildMedicalEntryId { get; set; }
        [Required]
        public string Token { get; set; }
        //[Required]
        public double Age { get; set; }
        //[Required]
        public double Height { get; set; }
        //[Required]
        public double Weight { get; set; }
        //[Required]
        public double HeadCircumference { get; set; }
        //[Required]
        public double ChestCircumference { get; set; }
        //[Required]
        public string Summary { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }
        [Required]
        public DateTime DateReturn { get; set; }

    }

}
