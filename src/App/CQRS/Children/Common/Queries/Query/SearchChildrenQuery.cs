using Common.Extensions;
using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Children.Common.Queries.Query
{
    public sealed class SearchChildrenQuery : AbstractPagedQuery<SearchChildrenQuery.Child>
    {
        public SearchChildrenQuery(string correlationId, string tenantId, string userId,
            string criteria, int pageIndex, int pageSize, string sortField, int sortOrder)
            : base(correlationId, tenantId, userId, criteria, pageIndex, pageSize, sortField, sortOrder)
        {
        }

        public class Child
        {
            public string ChildId { get; set; }
            
            public Parent Parent { get; set; }

            public string ImageUrl { get; set; }

            public EnumGender Gender { get; set; }
            public string GenderText => Gender.ToString();

            public string FirstName { get; set; }
            public string MiddleName { get; set; }
            public string LastName { get; set; }

            DateTime _dateOfBirth;
            public DateTime DateOfBirth
            {
                get => _dateOfBirth.AsUtc();
                set => _dateOfBirth = value;
            }

        }

        public class Parent
        {
            public string ParentId { get; set; }
            public string Name { get; set; }
            public string PhoneNumber { get; set; }
            public string Email { get; set; }
        }

    }
}
