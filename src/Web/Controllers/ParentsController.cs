using App.CQRS;
using App.CQRS.Clinics.Common.Queries.Query;
using Data.App.DbContext;
using Data.App.Models.Users;
using Data.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ParentsController : BaseController
    {
        readonly IQueryHandlerDispatcher _queryHandlerDispatcher;
        readonly ICommandHandlerDispatcher _commandHandlerDispatcher;
        readonly AppDbContext _appDbContext;

        public ParentsController(
            IQueryHandlerDispatcher queryHandlerDispatcher,
            ICommandHandlerDispatcher commandHandlerDispatcher,
            AppDbContext appDbContext)
        {
            _queryHandlerDispatcher = queryHandlerDispatcher ?? throw new ArgumentNullException(nameof(queryHandlerDispatcher));
            _commandHandlerDispatcher = commandHandlerDispatcher ?? throw new ArgumentNullException(nameof(commandHandlerDispatcher));
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        [HttpGet]
        public async Task<IActionResult> GetParents(string c, int p, int s, string sf, int so)
        {
            var query = new SearchParentByClinicIdQuery("", TenantId, UserId, ClinicId, c, p, s, sf, so);

            var dto = await _queryHandlerDispatcher.HandleAsync<SearchParentByClinicIdQuery, Paged<SearchParentByClinicIdQuery.Parent>>(query);

            return Ok(dto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetChildren(string id)
        {
            var query = new GetParentByIdQuery("", TenantId, UserId, id);

            var dto = await _queryHandlerDispatcher.HandleAsync<GetParentByIdQuery, GetParentByIdQuery.Parent>(query);

            return Ok(dto);
        }


    }

}
