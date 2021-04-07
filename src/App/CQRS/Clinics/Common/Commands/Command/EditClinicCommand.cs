using Cayent.Core.CQRS.Commands;

namespace App.CQRS.Clinics.Common.Commands.Command
{
    public sealed class EditClinicCommand : AbstractCommand
    {
        public string ClinicId { get;  }
        public string Token { get; }
        public string Name { get; }
        public string PhoneNumber { get; }
        public string MobileNumber { get; }
        public string Email { get; }        
        public string Address { get; }
        public double GeoX { get; }
        public double GeoY { get; }


        public EditClinicCommand(string correlationId, string tenantId, string userId,
            string clinicId, string token, string name,
            string phoneNumber, string mobileNumber, string email,             string address, double geoX, double geoY)
            : base(correlationId, tenantId, userId)
        {
            ClinicId = clinicId;
            Token = token;
            Name = name;
            PhoneNumber = phoneNumber;
            MobileNumber = mobileNumber;
            Email = email;            
            Address = address;
            GeoX = geoX;
            GeoY = geoY;
        }

    }
}
