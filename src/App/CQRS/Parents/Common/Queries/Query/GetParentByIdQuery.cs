using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Clinics.Common.Queries.Query
{
    public sealed class GetParentByIdQuery : AbstractQuery<GetParentByIdQuery.Parent>
    {
        public string ParentId { get; }

        public GetParentByIdQuery(string correlationId, string tenantId, string userId,
            string parentId)
            : base(correlationId, tenantId, userId)
        {
            ParentId = parentId;
        }

        public class Parent
        {
            public string ParentId { get; set; }
            public string Name { get; set; }
            public string ImageUrl { get; set; }
            public string PhoneNumber { get; set; }
            public string Email { get; set; }
            public IEnumerable<Child> Children { get; set; }
            public string Token { get; set; }

        }
        public class Child
        {
            public string ChildId { get; set; }
            public string Name { get; set; }
            public string ImageUrl { get; set; }
            public EnumGender Gender { get; set; }
            public string GenderText => Gender.ToString();
            public DateTime DateOfBirth { get; set; }
        }
    }
}
