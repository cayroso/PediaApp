﻿using App.CQRS.Clinics.Common.Commands.Command;
using App.CQRS.Clinics.Common.Queries.Query;
using App.Hubs;
using Cayent.Core.Common;
using Cayent.Core.CQRS.Commands;
using Cayent.Core.CQRS.Queries;
using Data.App.DbContext;
using Data.App.Models.Clinics;
using Data.App.Models.Parents;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ClinicsController : BaseController
    {
        readonly IQueryHandlerDispatcher _queryHandlerDispatcher;
        readonly ICommandHandlerDispatcher _commandHandlerDispatcher;
        readonly AppDbContext _appDbContext;
        readonly IHubContext<TripHub, ITripClient> _tripHubContext;

        public ClinicsController(
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

        [HttpGet("search")]
        public async Task<IActionResult> Search(string c, int p, int s, string sf, int so, CancellationToken cancellationToken = default)
        {
            var query = new SearchClinicQuery("", TenantId, UserId, c, p, s, sf, so);

            var dto = await _queryHandlerDispatcher.HandleAsync<SearchClinicQuery, Paged<SearchClinicQuery.Clinic>>(query, cancellationToken);

            return Ok(dto);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Search(string id, CancellationToken cancellationToken = default)
        {
            var query = new GetClinicByIdQuery("", TenantId, UserId, id);

            var dto = await _queryHandlerDispatcher.HandleAsync<GetClinicByIdQuery, GetClinicByIdQuery.Clinic>(query, cancellationToken);

            return Ok(dto);
        }

        [HttpGet("my-clinic")]
        public async Task<IActionResult> Get(CancellationToken cancellationToken = default)
        {
            var query = new GetClinicByIdQuery("", TenantId, UserId, ClinicId);

            var dto = await _queryHandlerDispatcher.HandleAsync<GetClinicByIdQuery, GetClinicByIdQuery.Clinic>(query, cancellationToken);

            return Ok(dto);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] EditClinicInfo info, CancellationToken cancellationToken = default)
        {
            var cmd = new EditClinicCommand("", TenantId, UserId, info.ClinicId, info.Token,
                info.Name, info.PhoneNumber, info.MobileNumber, info.Email, info.Address, info.GeoX, info.GeoY);

            await _commandHandlerDispatcher.HandleAsync(cmd, cancellationToken);

            return Ok();
        }

        [HttpGet("parents")]
        public async Task<IActionResult> GetParents()
        {
            var sql = from parent in _appDbContext.Parents.AsNoTracking()

                      where parent.ParentClinics.Any(e => e.ClinicId == ClinicId)
                      select new
                      {
                          Id = parent.ParentId,
                          Name = parent.User.FirstLastName
                      };

            var dto = await sql.ToListAsync();

            return Ok(dto);
        }

        [HttpGet("parents/{id}/children")]
        public async Task<IActionResult> GetParentChildren(string id)
        {
            var sql = from child in _appDbContext.Children.AsNoTracking()

                      where child.ParentId == id

                      select new
                      {
                          Id = child.ChildId,
                          Name = child.FirstLastName
                      };

            var dto = await sql.ToListAsync();

            return Ok(dto);
        }


        [HttpPost("business-hour")]
        public async Task<IActionResult> AddBusinessHours([FromBody] AddBusinessHourInfo info)
        {
            var data = new ClinicBusinessHour
            {
                ClinicId = info.ClinicId,
                DaysOfWeek = info.DaysOfWeek,
                StartTime = info.StartTime.ToString("HH:mm"),
                EndTime = info.EndTime.ToString("HH:mm"),
            };

            await _appDbContext.AddAsync(data);

            await _appDbContext.SaveChangesAsync();

            return Ok(data.ClinicBusinessHourId);
        }

        [HttpPut("business-hour")]
        public async Task<IActionResult> EditBusinessHours([FromBody] EditBusinessHourInfo info)
        {
            var data = await _appDbContext.ClinicBusinessHours.FirstOrDefaultAsync(e => e.ClinicBusinessHourId == info.ClinicBusinessHourId);

            if (data == null)
                return NotFound();

            data.DaysOfWeek = info.DaysOfWeek;
            data.StartTime = info.StartTime.ToString("HH:mm");
            data.EndTime = info.EndTime.ToString("HH:mm");

            await _appDbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("business-hour/{id}")]
        public async Task<IActionResult> DeleteBusinessHours(string id)
        {
            var data = await _appDbContext.ClinicBusinessHours.FirstOrDefaultAsync(e => e.ClinicBusinessHourId == id);

            if (data == null)
                return NotFound();

            _appDbContext.Remove(data);

            await _appDbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("grant-access")]
        public async Task<IActionResult> GrantAccess([FromBody] GrantDenyAccessInfo info)
        {
            var exist = await _appDbContext.ParentClinic.FirstOrDefaultAsync(e => e.ParentId == info.ParentId && e.ClinicId == info.ClinicId);

            if (exist == null)
            {
                var data = new ParentClinic
                {
                    ParentId = info.ParentId,
                    ClinicId = info.ClinicId,
                };

                await _appDbContext.AddAsync(data);

                await _appDbContext.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpPost("deny-access")]
        public async Task<IActionResult> DenyAccess([FromBody] GrantDenyAccessInfo info)
        {
            var exist = await _appDbContext.ParentClinic.FirstOrDefaultAsync(e => e.ParentId == info.ParentId && e.ClinicId == info.ClinicId);

            if (exist != null)
            {
                _appDbContext.Remove(exist);

                await _appDbContext.SaveChangesAsync();
            }

            return Ok();
        }

        public class AddBusinessHourInfo
        {
            [Required]
            public string ClinicId { get; set; }
            [Required]
            public string DaysOfWeek { get; set; }
            [Required]
            public DateTime StartTime { get; set; }
            [Required]
            public DateTime EndTime { get; set; }
        }

        public class EditBusinessHourInfo
        {
            [Required]
            public string ClinicBusinessHourId { get; set; }
            [Required]
            public string DaysOfWeek { get; set; }
            [Required]
            public DateTime StartTime { get; set; }
            [Required]
            public DateTime EndTime { get; set; }
        }

        public class GrantDenyAccessInfo
        {
            [Required]
            public string ClinicId { get; set; }
            [Required]
            public string ParentId { get; set; }
        }
    }
}
