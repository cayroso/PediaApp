using Common.Extensions;
using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Appointments.Common.Queries.Query
{
    public sealed class SearchAppointmentQuery : AbstractPagedQuery<SearchAppointmentQuery.Appointment>
    {
        public string ClinicId { get;  }
        public string ParentId { get;  }
        public DateTime DateStart { get;  }
        public DateTime DateEnd { get; }
        public SearchAppointmentQuery(string correlationId, string tenantId, string userId,
            string clinicId, string parentId, DateTime dateStart, DateTime dateEnd,
            string criteria, int pageIndex, int pageSize, string sortField, int sortOrder)
            : base(correlationId, tenantId, userId, criteria, pageIndex, pageSize, sortField, sortOrder)
        {
            ClinicId = clinicId;
            ParentId = parentId;
            DateStart = dateStart.Truncate().AsUtc();
            DateEnd = dateEnd.Truncate().AsUtc();
        }

        public class Appointment
        {
            public string AppointmentId { get; set; }
            public string ReferenceNumber { get; set; }
            public Clinic Clinic { get; set; }
            public Child Child { get; set; }
            public Parent Parent { get; set; }

            public EnumAppointmentType Type { get; set; }
            public string TypeText => Type.ToString();
            public EnumAppointmentStatus Status { get; set; }
            public string StatusText => Status.ToString();
            public string StatusReason { get; set; }
            DateTime _dateStart;
            public DateTime DateStart
            {
                get => _dateStart.AsUtc();
                set => _dateStart = value;
            }

            DateTime _dateEnd;
            public DateTime DateEnd
            {
                get => _dateEnd.AsUtc();
                set => _dateEnd = value;
            }

            DateTime _dateCreated;
            public DateTime DateCreated
            {
                get => _dateCreated.AsUtc();
                set => _dateCreated = value;
            }

            public string Token { get; set; }
        }

        public class Clinic
        {
            public string ClinicId { get; set; }
            public string Name { get; set; }
        }
        public class Child
        {
            public string ChildId { get; set; }
            public string ImageUrl { get; set; }
            public string Name { get; set; }
        }

        public class Parent
        {
            public string ParentId { get; set; }
            public string ImageUrl { get; set; }
            public string Name { get; set; }
            public string PhoneNumber { get; set; }
            public string Email { get; set; }
        }
    }
}
