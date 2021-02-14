using Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class EditClinicInfo
    {
        [Required]
        public string ClinicId { get; set; }
        [Required]
        public string Token { get; set; }
        [Required]
        public EnumClinicStatus ClinicStatus { get; set; }
        [Required]
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        [Required]
        public string OpeningHours { get; set; }
        [Required]
        public string Address { get; set; }
        public double GeoX { get; set; }
        public double GeoY { get; set; }
    }
}
