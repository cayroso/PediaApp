using Cayent.Core.Data.Notifications;
using Cayent.Core.Data.Users;
using Data.App.Models.Appointments;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;

namespace Data.App.Models.Users
{
    public class User : UserBase
    {
        public double OverallRating { get; set; }
        public double TotalRating { get; set; }
        public virtual ICollection<UserTask> UserTasks { get; set; } = new List<UserTask>();

        public virtual ICollection<NotificationReceiver> NotificationReceivers { get; set; } = new List<NotificationReceiver>();

        public virtual ICollection<AppointmentTimeline> AppointmentTimelines { get; set; } = new List<AppointmentTimeline>();

        public void CalculateRating(double newRating)
        {
            OverallRating = ((OverallRating * TotalRating) + newRating) / (TotalRating + 1);
            TotalRating += newRating;
        }
    }

    public static class UserExtension
    {

        public static void ThrowIfNull(this User me)
        {
            if (me == null)
                throw new ApplicationException("User not found.");
        }

        public static void ThrowIfNullOrAlreadyUpdated(this User me, string currentToken, string newToken)
        {
            me.ThrowIfNull();

            if (string.IsNullOrWhiteSpace(newToken))
                throw new ApplicationException("Anti-forgery token not found.");

            if (me.ConcurrencyToken != currentToken)
                throw new ApplicationException("User already updated by another user.");

            me.ConcurrencyToken = newToken;
        }
    }

    public class UserConfiguration : UserConfiguration<User>
    {
        public override void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);
            this.ConfigureEntity(builder);
        }

        private void ConfigureEntity(EntityTypeBuilder<User> builder)
        {
        }
    }
}
