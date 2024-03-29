﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace App.Hubs
{
    public class Response
    {
        public string AppointmentId { get; set; }
        public string ReferenceNumber { get; set; }
        public string ClinicId { get; set; }
        public string ClinicName { get; set; }

        public string ParentId { get; set; }
        public string ParentName { get; set; }

        public string ChildId { get; set; }
        public string ChildName { get; set; }

        public string Title { get; set; }
        public string Content { get; set; }
    }

    public interface IAppointmentClient
    {
        Task AppointmentUpdated(string id);

        Task ParentRequested(Response resp);
        Task ParentResubmitted(Response resp);
        Task ParentRejected(Response resp);
        Task ParentAccepted(Response resp);
        Task ParentCancelled(Response resp);
        Task ParentDeleted(Response resp);

        Task ClinicRequested(Response resp);
        Task ClinicResubmitted(Response resp);
        Task ClinicRejected(Response resp);
        Task ClinicAccepted(Response resp);
        Task ClinicSetInProgress(Response resp);
        Task ClinicCompleted(Response resp);
        Task ClinicCancelled(Response resp);
        Task ClinicArchived(Response resp);
        Task ClinicDeleted(Response resp);
    }

    [Authorize]
    public class AppointmentHub : Hub<IAppointmentClient>
    {
    }
}
