﻿using Common.Extensions;
using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Children.Common.Queries.Query
{
    public sealed class GetChildByIdQuery : AbstractQuery<GetChildByIdQuery.Child>
    {
        public string ChildId { get; }

        public GetChildByIdQuery(string correlationId, string tenantId, string userId,
            string childId)
            : base(correlationId, tenantId, userId)
        {
            ChildId = childId;
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

            DateTime _dateCreated ;
            public DateTime DateCreated
            {
                get => _dateCreated.AsUtc();
                set => _dateCreated = value;
            }

            public string Token { get; set; }

            public IEnumerable<ChildMedicalEntry> MedicalEntries { get; set; } = new List<ChildMedicalEntry>();
        }

        public class Parent
        {
            public string ParentId { get; set; }
            public string Name { get; set; }
            public string PhoneNumber { get; set; }
            public string Email { get; set; }
        }

        public class ChildMedicalEntry
        {            
            public double Age { get; set; }
            public double Height { get; set; }
            public double Weight { get; set; }

            public string Summary { get; set; }

            DateTime _dateCreated;
            public DateTime DateCreated
            {
                get => _dateCreated.AsUtc();
                set => _dateCreated = value;
            }
        }
    }
}
