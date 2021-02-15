using Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class AddAppointmentInfo
    {
        [Required]
        public string ClinicId { get; set; }
        [Required]
        public string ChildId { get; set; }
        [Required]
        public DateTime DateStart { get; set; }
        [Required]
        public DateTime DateEnd { get; set; }
        public string Notes { get; set; }
    }

    public class EditAppointmentInfo
    {
        [Required]
        public string AppointmentId { get; set; }
        [Required]
        public string Token { get; set; }
        [Required]
        public DateTime DateStart { get; set; }
        [Required]
        public DateTime DateEnd { get; set; }
    }

    public class EditAppointmentStatusInfo
    {
        [Required]
        public string AppointmentId { get; set; }
        [Required]
        public string Token { get; set; }                
        public string Notes { get; set; }
    }
}
