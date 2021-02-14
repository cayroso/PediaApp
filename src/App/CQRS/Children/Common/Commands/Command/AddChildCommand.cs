using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Children.Common.Commands.Command
{
    public sealed class AddChildCommand : AbstractCommand
    {

        public string ChildId { get; }
        public string ParentId { get; }
        public EnumGender Gender { get; }
        public string FirstName { get; }
        public string MiddleName { get; }
        public string LastName { get; }

        public DateTime DateOfBirth { get; }

        public AddChildCommand(string correlationId, string tenantId, string userId,
            string childId, string parentId, EnumGender gender, string firstName, string middleName, string lastName,
            DateTime dateOfBirth)
            : base(correlationId, tenantId, userId)
        {
            ChildId = childId;
            ParentId = parentId;
            Gender = gender;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
        }


    }
}
