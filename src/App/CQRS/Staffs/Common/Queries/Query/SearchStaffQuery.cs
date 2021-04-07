using Cayent.Core.CQRS.Queries;
using System.Collections.Generic;

namespace App.CQRS.Staffs.Common.Queries.Query
{
    public sealed  class SearchStaffQuery : AbstractPagedQuery<SearchStaffQuery.Staff>
    {
        public string ClinicId { get; }
        public SearchStaffQuery(string correlationId, string tenantId, string userId, string clinicId,
            string criteria, int pageIndex, int pageSize, string sortField, int sortOrder)
            : base(correlationId, tenantId, userId, criteria, pageIndex, pageSize, sortField, sortOrder)
        {
            ClinicId = clinicId;
        }

        public class Staff
        {
            public string StaffId { get; set; }

            public string UrlProfilePicture { get; set; }

            public string FirstName { get; set; }
            public string MiddleName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string PhoneNumber { get; set; }
            public IEnumerable<string> Roles { get; set; }
        }
    }
}
