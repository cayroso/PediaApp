using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Children.Common.Commands.Command
{
    public sealed class EditChildCommand : AbstractCommand
    {
        public string ChildId { get; }
        public string Token { get; }
        public EnumGender Gender { get; }
        public string FirstName { get; }
        public string MiddleName { get; }
        public string LastName { get; }

        public DateTime DateOfBirth { get; }

        public EditChildCommand(string correlationId, string tenantId, string userId,
            string childId, string token, EnumGender gender, string firstName, string middleName, string lastName,
            DateTime dateOfBirth)
            : base(correlationId, tenantId, userId)
        {
            ChildId = childId;
            Token = token;
            Gender = gender;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
        }


    }
}
