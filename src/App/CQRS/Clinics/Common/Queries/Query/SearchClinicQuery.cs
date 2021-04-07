using Cayent.Core.CQRS.Queries;
using System.Collections.Generic;

namespace App.CQRS.Clinics.Common.Queries.Query
{
    public sealed class SearchClinicQuery : AbstractPagedQuery<SearchClinicQuery.Clinic>
    {
        public SearchClinicQuery(string correlationId, string tenantId, string userId,
            string criteria, int pageIndex, int pageSize, string sortField, int sortOrder)
            : base(correlationId, tenantId, userId, criteria, pageIndex, pageSize, sortField, sortOrder)
        {
        }

        public class Clinic
        {
            public string ClinicId { get; set; }
            public string Name { get; set; }
            public bool Allowed { get; set; }
            public string Address { get; set; }
            public IEnumerable<BusinessHour> BusinessHours { get; set; }
        }
        public class BusinessHour
        {
            public string DaysOfWeek { get; set; }
            public string StartTime { get; set; }
            public string EndTime { get; set; }
        }
    }
}
