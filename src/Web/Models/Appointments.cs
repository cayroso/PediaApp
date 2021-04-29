using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class AddAppointmentByClinicInfo
    {        
        [Required]
        public string ChildId { get; set; }
        [Required]
        public DateTime DateStart { get; set; }
        [Required]
        public DateTime DateEnd { get; set; }
        public string Notes { get; set; }
    }

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
        public string ClinicId { get; set; }
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
