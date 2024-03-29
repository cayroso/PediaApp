﻿using App.CQRS.Appointments.Common.Commands.Command;
using App.CQRS.Appointments.Common.Commands.Command.Clinic;
using App.CQRS.Appointments.Common.Commands.Command.Parent;
using App.CQRS.Appointments.Common.Queries.Query;
using App.Hubs;
using Cayent.Core.Common;
using Cayent.Core.CQRS.Commands;
using Cayent.Core.CQRS.Queries;
using Common.Extensions;
using Data.App.DbContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AppointmentsController : BaseController
    {
        readonly IQueryHandlerDispatcher _queryHandlerDispatcher;
        readonly ICommandHandlerDispatcher _commandHandlerDispatcher;
        readonly AppDbContext _appDbContext;
        readonly IHubContext<TripHub, ITripClient> _tripHubContext;

        public AppointmentsController(
            IQueryHandlerDispatcher queryHandlerDispatcher,
            ICommandHandlerDispatcher commandHandlerDispatcher,
            AppDbContext appDbContext,
            IHubContext<TripHub, ITripClient> tripHubContext)
        {
            _queryHandlerDispatcher = queryHandlerDispatcher ?? throw new ArgumentNullException(nameof(queryHandlerDispatcher));
            _commandHandlerDispatcher = commandHandlerDispatcher ?? throw new ArgumentNullException(nameof(commandHandlerDispatcher));
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
            _tripHubContext = tripHubContext ?? throw new ArgumentNullException(nameof(tripHubContext));
        }

        [HttpGet("clinic/search/{id}")]
        public async Task<IActionResult> Search(string id, long ds, long de, string c, int p, int s, string sf, int so, CancellationToken cancellationToken = default)
        {
            var query = new SearchAppointmentQuery("", TenantId, UserId, id, null, ds.ToUtcDate(), de.ToUtcDate(), c, p, s, sf, so);

            var dto = await _queryHandlerDispatcher.HandleAsync<SearchAppointmentQuery, Paged<SearchAppointmentQuery.Appointment>>(query, cancellationToken);

            return Ok(dto);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Search(string id, CancellationToken cancellationToken = default)
        {
            var query = new GetAppointmentByIdQuery("", TenantId, UserId, id);

            var dto = await _queryHandlerDispatcher.HandleAsync<GetAppointmentByIdQuery, GetAppointmentByIdQuery.Appointment>(query, cancellationToken);

            return Ok(dto);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditAppointmentInfo info, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(ClinicId) && string.IsNullOrWhiteSpace(info.ClinicId))
            {
                return BadRequest("Clinic is required.");
            }

            var cmd = new EditAppointmentCommand("", TenantId, UserId, string.IsNullOrWhiteSpace(ClinicId) ? info.ClinicId : ClinicId, info.AppointmentId, info.Token, info.DateStart, info.DateEnd);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        [HttpDelete("{id}/{token}")]
        public async Task<IActionResult> Delete(string id, string token, CancellationToken cancellationToken = default)
        {
            var cmd = new DeleteAppointmentCommand("", TenantId, UserId, id, token);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        #region Clinic


        [HttpGet("clinic/search")]
        public async Task<IActionResult> Search(long ds, long de, string c, int p, int s, string sf, int so, CancellationToken cancellationToken = default)
        {
            var query = new SearchAppointmentQuery("", TenantId, UserId, ClinicId, null, ds.ToUtcDate(), de.ToUtcDate(), c, p, s, sf, so);

            var dto = await _queryHandlerDispatcher.HandleAsync<SearchAppointmentQuery, Paged<SearchAppointmentQuery.Appointment>>(query, cancellationToken);

            return Ok(dto);
        }


        [HttpPost("clinic/request")]
        public async Task<IActionResult> PostClinicRequest([FromBody] AddAppointmentByClinicInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ClinicRequestedAppointmentCommand("", TenantId, UserId, GuidStr(), ClinicId, info.ChildId, info.DateStart, info.DateEnd, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/resubmit")]
        public async Task<IActionResult> PutClinicResubmitted([FromBody] EditAppointmentStatusInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ClinicResubmittedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/accept")]
        public async Task<IActionResult> PutClinicAccept([FromBody] EditAppointmentStatusInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ClinicAcceptedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/archive")]
        public async Task<IActionResult> PutClinicArchive([FromBody] EditAppointmentStatusInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ClinicArchivedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/cancel")]
        public async Task<IActionResult> PutClinicCancel([FromBody] EditAppointmentStatusInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ClinicCancelledAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/complete")]
        public async Task<IActionResult> PutClinicComplete([FromBody] EditAppointmentStatusInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ClinicCompletedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/reject")]
        public async Task<IActionResult> PutClinicReject([FromBody] EditAppointmentStatusInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ClinicRejectedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/inprogress")]
        public async Task<IActionResult> PutClinicInProgress([FromBody] EditAppointmentStatusInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ClinicSetAppointmentInProgressCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        #endregion

        #region Parent

        [HttpGet("parent/search")]
        public async Task<IActionResult> SearchMine(long ds, long de, string c, int p, int s, string sf, int so, CancellationToken cancellationToken = default)
        {
            var query = new SearchAppointmentQuery("", TenantId, UserId, null, UserId, ds.ToUtcDate(), de.ToUtcDate(), c, p, s, sf, so);

            var dto = await _queryHandlerDispatcher.HandleAsync<SearchAppointmentQuery, Paged<SearchAppointmentQuery.Appointment>>(query, cancellationToken);

            return Ok(dto);
        }


        [HttpPost("parent/request")]
        public async Task<IActionResult> PostParentRequest([FromBody] AddAppointmentInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ParentRequestedAppointmentCommand("", TenantId, UserId, GuidStr(), info.ClinicId, info.ChildId, info.DateStart, info.DateEnd, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("parent/resubmit")]
        public async Task<IActionResult> PutParentResubmit([FromBody] EditAppointmentStatusInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ParentResubmittedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("parent/accept")]
        public async Task<IActionResult> PutParentAccept([FromBody] EditAppointmentStatusInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ParentAcceptedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("parent/cancel")]
        public async Task<IActionResult> PutParentCancel([FromBody] EditAppointmentStatusInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ParentCancelledAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("parent/reject")]
        public async Task<IActionResult> PutParentReject([FromBody] EditAppointmentStatusInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new ParentRejectedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.AppointmentId);
        }


        #endregion
    }
}
