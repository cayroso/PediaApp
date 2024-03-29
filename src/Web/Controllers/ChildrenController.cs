﻿using App.CQRS.Children.Common.Commands.Command;
using App.CQRS.Children.Common.Queries.Query;
using App.Hubs;
using Cayent.Core.Common;
using Cayent.Core.CQRS.Commands;
using Cayent.Core.CQRS.Queries;
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
    public class ChildrenController : BaseController
    {
        readonly IQueryHandlerDispatcher _queryHandlerDispatcher;
        readonly ICommandHandlerDispatcher _commandHandlerDispatcher;
        readonly AppDbContext _appDbContext;
        readonly IHubContext<TripHub, ITripClient> _tripHubContext;

        public ChildrenController(
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

        [HttpGet("parent/search")]
        public async Task<IActionResult> SearchByParent(string c, int p, int s, string sf, int so, CancellationToken cancellationToken = default)
        {
            var query = new SearchChildrenByParentIdQuery("", TenantId, UserId, UserId, c, p, s, sf, so);

            var dto = await _queryHandlerDispatcher.HandleAsync<SearchChildrenByParentIdQuery, Paged<SearchChildrenByParentIdQuery.Child>>(query, cancellationToken);

            return Ok(dto);
        }

        [HttpGet("clinic/search")]
        public async Task<IActionResult> SearchByCLinic(string c, int p, int s, string sf, int so, CancellationToken cancellationToken = default)
        {
            var query = new SearchChildrenByClinicQuery("", TenantId, UserId, ClinicId, c, p, s, sf, so);

            var dto = await _queryHandlerDispatcher.HandleAsync<SearchChildrenByClinicQuery, Paged<SearchChildrenByClinicQuery.Child>>(query, cancellationToken);

            return Ok(dto);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id, CancellationToken cancellationToken = default)
        {
            var query = new GetChildByIdQuery("", TenantId, UserId, id);

            var dto = await _queryHandlerDispatcher.HandleAsync<GetChildByIdQuery, GetChildByIdQuery.Child>(query, cancellationToken);

            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AddChildInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new AddChildCommand("", TenantId, UserId, GuidStr(), UserId, info.Gender, info.FirstName, info.MiddleName, info.LastName, info.DateOfBirth); ;

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.ChildId);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditChildInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new EditChildCommand("", TenantId, UserId, info.ChildId, info.Token, info.Gender, info.FirstName, info.MiddleName, info.LastName, info.DateOfBirth); ;

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.ChildId);
        }

        [HttpPost("medical-entry")]
        public async Task<IActionResult> PostMedicalEntry([FromBody] AddChildMedicalEntryInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new AddMedicalEntryCommand("", TenantId, UserId, GuidStr(), info.AppointmentId, info.ChildId, info.Age, info.Height, info.Weight,
                info.HeadCircumference, info.ChestCircumference, info.Summary, info.DateCreated, info.DateReturn);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok(cmd.ChildMedicalEntryId);
        }

        [HttpPut("medical-entry")]
        public async Task<IActionResult> PutMedicalEntry([FromBody] EditChildMedicalEntryInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new EditMedicalEntryCommand("", TenantId, UserId, info.ChildMedicalEntryId, info.Token, info.Age, info.Height, info.Weight,
                info.HeadCircumference, info.ChestCircumference, info.Summary, info.DateCreated, info.DateReturn);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok();
        }

        [HttpGet("medical-entry/{id}")]
        public async Task<IActionResult> GetMedicalEntry(string id, CancellationToken cancellationToken = default)
        {
            var query = new GetMedicalEntryByIdQuery("", TenantId, UserId, id);

            var dto = await _queryHandlerDispatcher.HandleAsync<GetMedicalEntryByIdQuery, GetMedicalEntryByIdQuery.ChildMedicalEntry>(query,cancellationToken);

            return Ok(dto);
        }

    }
}
