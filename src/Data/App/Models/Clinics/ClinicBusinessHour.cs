using System.ComponentModel.DataAnnotations.Schema;

namespace Data.App.Models.Clinics
{
    public class ClinicBusinessHour
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ClinicBusinessHourId { get; set; }

        public string ClinicId { get; set; }
        public virtual Clinic Clinic { get; set; }

        public string DaysOfWeek { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}
