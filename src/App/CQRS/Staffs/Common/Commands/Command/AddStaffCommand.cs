using Cayent.Core.CQRS.Commands;

namespace App.CQRS.Staffs.Common.Commands.Command
{
    public sealed class AddStaffCommand : AbstractCommand
    {
        public string PharmacyId { get; }
        public string Email { get; }
        public string PhoneNumber { get; }
        public string FirstName { get; }
        public string MiddleName { get; }
        public string LastName { get; }
        public string RoleId { get; }

        public AddStaffCommand(string correlationId, string tenantId, string userId,
            string pharmacyId, string email, string phoneNumber, string firstName, string middleName, string lastName, string roleId)
            : base(correlationId, tenantId, userId)
        {
            PharmacyId = pharmacyId;
            Email = email;
            PhoneNumber = phoneNumber;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
            RoleId = roleId;
        }
    }
}
