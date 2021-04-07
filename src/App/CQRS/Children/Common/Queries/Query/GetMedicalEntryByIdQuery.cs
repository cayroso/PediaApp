using Cayent.Core.CQRS.Queries;
using Common.Extensions;
using System;

namespace App.CQRS.Children.Common.Queries.Query
{
    public sealed class GetMedicalEntryByIdQuery : AbstractQuery<GetMedicalEntryByIdQuery.ChildMedicalEntry>
    {
        public string ChildMedicalEntryId { get; }

        public GetMedicalEntryByIdQuery(string correlationId, string tenantId, string userId,
            string childMedicalEntryId)
            : base(correlationId, tenantId, userId)
        {
            ChildMedicalEntryId = childMedicalEntryId;
        }

        
        public class ChildMedicalEntry
        {
            public double Age { get; set; }
            public double Weight { get; set; }
            public double Height { get; set; }
            public double HeadCircumference { get; set; }
            public double ChestCircumference { get; set; }
            public string Summary { get; set; }

            DateTime _dateCreated;
            public DateTime DateCreated
            {
                get => _dateCreated.AsUtc();
                set => _dateCreated = value;
            }

            DateTime _dateReturn;
            public DateTime DateReturn
            {
                get => _dateReturn.AsUtc();
                set => _dateReturn = value;
            }
            public string Token { get; set; }

        }
    }
}
