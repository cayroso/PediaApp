using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Hubs
{
    public class Response
    {
        public string AppointmentId { get; set; }

        public string ClinicId { get; set; }
        public string ClinicName { get; set; }

        public string ParentId { get; set; }
        public string ParentName { get; set; }

        public string ChildId { get; set; }
        public string ChildName { get; set; }
    }

    public interface IAppointmentClient
    {
        Task ParentRequested(Response resp);
        Task ParentRejected(Response resp);
        Task ParentAccepted(Response resp);
        Task ParentCancelled(Response resp);

        Task ClinicRequested(Response resp);
        Task ClinicRejected(Response resp);
        Task ClinicAccepted(Response resp);
        Task ClinicSetInProgress(Response resp);
        Task ClinicCompleted(Response resp);
        Task ClinicCancelled(Response resp);
        Task ClinicArchived(Response resp);
    }

    [Authorize]
    public class AppointmentHub : Hub<IAppointmentClient>
    {
    }
}
