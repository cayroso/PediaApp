using Cayent.Core.CQRS.Queries;

namespace App.CQRS.Clinics.Common.Queries.Query
{
    public sealed class SearchParentByClinicIdQuery : AbstractPagedQuery<SearchParentByClinicIdQuery.Parent>
    {
        public string ClinicId { get; }
        public SearchParentByClinicIdQuery(string correlationId, string tenantId, string userId, string clinicId,
            string criteria, int pageIndex, int pageSize, string sortField, int sortOrder)
            : base(correlationId, tenantId, userId, criteria, pageIndex, pageSize, sortField, sortOrder)
        {
            ClinicId = clinicId;
        }

        public class Parent
        {
            public string ParentId { get; set; }
            public string Name { get; set; }
            public string ImageUrl { get; set; }
            public string PhoneNumber { get; set; }
            public string Email { get; set; }
            public int NumberOfChildren { get; set; }
        }
    }
}
