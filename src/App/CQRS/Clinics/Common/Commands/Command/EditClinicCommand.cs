using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Clinics.Common.Commands.Command
{
    public sealed class EditClinicCommand : AbstractCommand
    {
        public string ClinicId { get;  }
        public string Token { get; }
        public EnumClinicStatus ClinicStatus { get; }
        public string Name { get; }
        public string PhoneNumber { get; }
        public string MobileNumber { get; }
        public string Email { get; }
        public string OpeningHours { get; }
        public string Address { get; }
        public double GeoX { get; }
        public double GeoY { get; }


        public EditClinicCommand(string correlationId, string tenantId, string userId,
            string clinicId, string token, EnumClinicStatus clinicStatus, string name,
            string phoneNumber, string mobileNumber, string email, string openingHours,
            string address, double geoX, double geoY)
            : base(correlationId, tenantId, userId)
        {
            ClinicId = clinicId;
            Token = token;
            ClinicStatus = clinicStatus;
            Name = name;
            PhoneNumber = phoneNumber;
            MobileNumber = mobileNumber;
            Email = email;
            OpeningHours = openingHours;
            Address = address;
            GeoX = geoX;
            GeoY = geoY;
        }

    }
}
