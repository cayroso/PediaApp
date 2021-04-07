using System.Collections.Generic;

namespace Data.Constants
{
    public sealed class ApplicationRoles
    {
        private ApplicationRoles(string id, string name)
        {
            Id = id;
            Name = name;
        }

        public string Id { get; }
        public string Name { get; }

        public const string SystemRoleName = "System";
        public static ApplicationRoles System = new ApplicationRoles(SystemRoleName.ToLower(), SystemRoleName);

        public const string PediaRoleName = "Pedia";
        public static ApplicationRoles Pedia = new ApplicationRoles(PediaRoleName.ToLower(), PediaRoleName);

        public const string StaffRoleName = "Staff";
        public static ApplicationRoles Staff = new ApplicationRoles(StaffRoleName.ToLower(), StaffRoleName);

        public const string ParentRoleName = "Parent";
        public static ApplicationRoles Parent = new ApplicationRoles(ParentRoleName.ToLower(), ParentRoleName);

        public static List<ApplicationRoles> Items
        {
            get
            {
                return new List<ApplicationRoles>
                {
                    System,
                    Pedia,
                    Staff,
                    Parent
                };
            }
        }
    }
}
