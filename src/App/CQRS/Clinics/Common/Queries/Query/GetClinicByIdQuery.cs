using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Clinics.Common.Queries.Query
{
    public sealed class GetClinicByIdQuery : AbstractQuery<GetClinicByIdQuery.Clinic>
    {
        public string ClinicId { get; }

        public GetClinicByIdQuery(string correlationId, string tenantId, string userId,
            string clinicId)
            : base(correlationId, tenantId, userId)
        {
            ClinicId = clinicId;
        }

        public class Clinic
        {
            public string ClinicId { get; set; }
            public string Name { get; set; }
            public string PhoneNumber { get; set; }
            public string MobileNumber { get; set; }
            public string Email { get; set; }            
            public string Address { get; set; }
            public double GeoX { get; set; }
            public double GeoY { get; set; }
            public string Token { get; set; }
            public IEnumerable<BusinessHour> BusinessHours { get; set; }
        }
        public class BusinessHour
        {
            public string ClinicBusinessHourId { get; set; }
            public string DaysOfWeek { get; set; }
            public string StartTime { get; set; }
            public string EndTime { get; set; }
        }
    }
}
