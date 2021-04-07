using Data.App.Models.Users;

namespace Data.App.Models.Teams
{
    public class TeamMember
    {
        public string TeamId { get; set; }
        public virtual Team Team { get; set; }

        public string MemberId { get; set; }
        public virtual User Member { get; set; }
    }
}
