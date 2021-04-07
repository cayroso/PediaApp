using Cayent.Core.CQRS.Queries;
using Common.Extensions;
using Data.Enums;
using System;
using System.Collections.Generic;

namespace App.CQRS.Appointments.Common.Queries.Query
{
    public class GetAppointmentByIdQuery : AbstractQuery<GetAppointmentByIdQuery.Appointment>
    {
        public string AppointmentId { get; }

        public GetAppointmentByIdQuery(string correlationId, string tenantId, string userId,
            string appointmentId)
            : base(correlationId, tenantId, userId)
        {
            AppointmentId = appointmentId;
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
            public string PhoneNumber { get; set; }
            public string MobileNumber { get; set; }
            public string Email { get; set; }
            public string OpeningHours { get; set; }
            public string Address { get; set; }

            public IEnumerable<BusinessHour> BusinessHours { get; set; }
        }
        public class BusinessHour
        {
            public string DaysOfWeek { get; set; }            
            public string StartTime { get; set; }
            public string EndTime { get; set; }
        }
        public class Child
        {
            public string ChildId { get; set; }
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
        public class MedicalEntry
        {

            public double Age { get; set; }
            public double Height { get; set; }
            public double Weight { get; set; }
            public string Summary { get; set; }
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
