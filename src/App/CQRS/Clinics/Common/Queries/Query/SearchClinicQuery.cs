using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Clinics.Common.Queries.Query
{
    public sealed class SearchClinicQuery: AbstractPagedQuery<SearchClinicQuery.Clinic>
    {
        public SearchClinicQuery(string correlationId, string tenantId, string userId,            
            string criteria, int pageIndex, int pageSize, string sortField, int sortOrder)
            : base(correlationId, tenantId, userId, criteria, pageIndex, pageSize, sortField, sortOrder)
        {            
        }

        public class Clinic
        {
            public string ClinicId { get; set; }
            public EnumClinicStatus ClinicStatus { get; set; }
            public string ClinicStatusText => ClinicStatus.ToString();
            public string Name { get; set; }
            public string OpeningHours { get; set; }
            public string Address { get; set; }
        }
    }
}
