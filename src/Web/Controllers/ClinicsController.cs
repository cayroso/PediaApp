using App.CQRS;
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
        public async Task<IActionResult> Search(string c, int p, int s, string sf, int so)
        {
            var query = new SearchClinicQuery("", TenantId, UserId, c, p, s, sf, so);

            var dto = await _queryHandlerDispatcher.HandleAsync<SearchClinicQuery, Paged<SearchClinicQuery.Clinic>>(query);

            return Ok(dto);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Search(string id)
        {
            var query = new GetClinicByIdQuery("", TenantId, UserId, id);

            var dto = await _queryHandlerDispatcher.HandleAsync<GetClinicByIdQuery, GetClinicByIdQuery.Clinic>(query);

            return Ok(dto);
        }

        [HttpGet("my-clinic")]
        public async Task<IActionResult> Get()
        {
            var query = new GetClinicByIdQuery("", TenantId, UserId, ClinicId);

            var dto = await _queryHandlerDispatcher.HandleAsync<GetClinicByIdQuery, GetClinicByIdQuery.Clinic>(query);

            return Ok(dto);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] EditClinicInfo info)
        {
            var cmd = new EditClinicCommand("", TenantId, UserId, info.ClinicId, info.Token, info.ClinicStatus,
                info.Name, info.PhoneNumber, info.MobileNumber, info.Email, info.OpeningHours,
                info.Address, info.GeoX, info.GeoY);

            await _commandHandlerDispatcher.HandleAsync(cmd);

            return Ok();
        }

        [HttpGet("parents")]
        public async Task<IActionResult> GetParents()
        {
            var sql = from parent in _appDbContext.Parents.AsNoTracking()

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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStaffs(string c, int p, int s, string sf, int so)
        {
            //var sql = from cs in _appDbContext.ClinicStaffs.AsNoTracking()
            //          join staff in _appDbContext.Staffs.AsNoTracking() on cs.StaffId equals staff.StaffId

            //          where cs.ClinicId == ClinicId

            //          select new
            //          {
            //              t.TeamId,
            //              t.Name,
            //              t.Description,
            //              t.DateCreated,
            //              t.DateUpdated,
            //              Members = t.Members.Select(e => new
            //              {
            //                  UserId = e.MemberId,
            //                  Name = e.Member.FirstLastName,
            //                  UrlProfilePicture = e.Member.Image.Url
            //              })
            //          };

            return Ok();
        }
    }
}
