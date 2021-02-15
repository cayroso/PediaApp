﻿using App.CQRS;
using App.CQRS.Appointments.Common.Commands.Command;
using App.CQRS.Appointments.Common.Commands.Command.Clinic;
using App.CQRS.Appointments.Common.Commands.Command.Parent;
using App.CQRS.Appointments.Common.Queries.Query;
using App.CQRS.Clinics.Common.Commands.Command;
using App.CQRS.Clinics.Common.Queries.Query;
using App.Hubs;
using App.Services;
using Data.App.DbContext;
using Data.App.Models.Chats;
using Data.Common;
using Data.Constants;
using Data.Identity.DbContext;
using Data.Providers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Web.BackgroundServices;
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

        [HttpGet("clinic/search")]
        public async Task<IActionResult> Search(string c, int p, int s, string sf, int so)
        {
            var query = new SearchAppointmentQuery("", TenantId, UserId, ClinicId, null, c, p, s, sf, so);

            var dto = await _queryHandlerDispatcher.HandleAsync<SearchAppointmentQuery, Paged<SearchAppointmentQuery.Appointment>>(query);

            return Ok(dto);
        }

        [HttpGet("clinic/search/{id}")]
        public async Task<IActionResult> Search(string id, string c, int p, int s, string sf, int so)
        {
            var query = new SearchAppointmentQuery("", TenantId, UserId, id, null, c, p, s, sf, so);

            var dto = await _queryHandlerDispatcher.HandleAsync<SearchAppointmentQuery, Paged<SearchAppointmentQuery.Appointment>>(query);

            return Ok(dto);
        }

        [HttpGet("parent/search")]
        public async Task<IActionResult> SearchMine(string c, int p, int s, string sf, int so)
        {
            var query = new SearchAppointmentQuery("", TenantId, UserId, null, UserId, c, p, s, sf, so);

            var dto = await _queryHandlerDispatcher.HandleAsync<SearchAppointmentQuery, Paged<SearchAppointmentQuery.Appointment>>(query);

            return Ok(dto);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Search(string id)
        {
            var query = new GetAppointmentByIdQuery("", TenantId, UserId, id);

            var dto = await _queryHandlerDispatcher.HandleAsync<GetAppointmentByIdQuery, GetAppointmentByIdQuery.Appointment>(query);

            return Ok(dto);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditAppointmentInfo info)
        {
            var cmd = new EditAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.DateStart, info.DateEnd);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok(cmd.AppointmentId);
        }

        #region Clinic

        [HttpPost("clinic/request")]
        public async Task<IActionResult> PostClinicRequest([FromBody] AddAppointmentInfo info)
        {
            var cmd = new ClinicRequestedAppointmentCommand("", TenantId, UserId, GuidStr(), info.ClinicId, info.ChildId, info.DateStart, info.DateEnd, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/accept")]
        public async Task<IActionResult> PutClinicAccept([FromBody] EditAppointmentStatusInfo info)
        {
            var cmd = new ClinicAcceptedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/archive")]
        public async Task<IActionResult> PutClinicArchive([FromBody] EditAppointmentStatusInfo info)
        {
            var cmd = new ClinicArchivedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/cancel")]
        public async Task<IActionResult> PutClinicCancel([FromBody] EditAppointmentStatusInfo info)
        {
            var cmd = new ClinicCancelledAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/complete")]
        public async Task<IActionResult> PutClinicComplete([FromBody] EditAppointmentStatusInfo info)
        {
            var cmd = new ClinicCompletedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/reject")]
        public async Task<IActionResult> PutClinicReject([FromBody] EditAppointmentStatusInfo info)
        {
            var cmd = new ClinicRejectedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("clinic/inprogress")]
        public async Task<IActionResult> PutClinicInProgress([FromBody] EditAppointmentStatusInfo info)
        {
            var cmd = new ClinicSetAppointmentInProgressCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok(cmd.AppointmentId);
        }

        #endregion

        #region Parent
        [HttpPost("parent/request")]
        public async Task<IActionResult> PostParentRequest([FromBody] AddAppointmentInfo info)
        {
            var cmd = new ParentRequestedAppointmentCommand("", TenantId, UserId, GuidStr(), info.ClinicId, info.ChildId, info.DateStart, info.DateEnd, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("parent/accept")]
        public async Task<IActionResult> PutParentAccept([FromBody] EditAppointmentStatusInfo info)
        {
            var cmd = new ParentAcceptedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("parent/cancel")]
        public async Task<IActionResult> PutParentCancel([FromBody] EditAppointmentStatusInfo info)
        {
            var cmd = new ParentCancelledAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok(cmd.AppointmentId);
        }

        [HttpPut("parent/reject")]
        public async Task<IActionResult> PutParentReject([FromBody] EditAppointmentStatusInfo info)
        {
            var cmd = new ParentRejectedAppointmentCommand("", TenantId, UserId, info.AppointmentId, info.Token, info.Notes);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok(cmd.AppointmentId);
        }


        #endregion
    }
}
