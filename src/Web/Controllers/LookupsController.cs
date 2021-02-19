using App.CQRS;
using Data.App.DbContext;
using Data.App.Models.Users;
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
    public class LookupsController : BaseController
    {
        readonly IQueryHandlerDispatcher _queryHandlerDispatcher;
        readonly ICommandHandlerDispatcher _commandHandlerDispatcher;
        readonly AppDbContext _appDbContext;

        public LookupsController(
            IQueryHandlerDispatcher queryHandlerDispatcher,
            ICommandHandlerDispatcher commandHandlerDispatcher,
            AppDbContext appDbContext)
        {
            _queryHandlerDispatcher = queryHandlerDispatcher ?? throw new ArgumentNullException(nameof(queryHandlerDispatcher));
            _commandHandlerDispatcher = commandHandlerDispatcher ?? throw new ArgumentNullException(nameof(commandHandlerDispatcher));
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        [HttpGet("parents")]
        public async Task<IActionResult> GetParents()
        {
            var sql = from p in _appDbContext.Parents

                      select new
                      {
                          Id = p.ParentId,
                          Name = p.User.FirstLastName
                      };

            var dto = await sql.ToListAsync();

            return Ok(dto);
        }

        [HttpGet("parents/{id}/children")]
        public async Task<IActionResult> GetChildren(string id)
        {
            var sql = from c in _appDbContext.Children
                      where c.ParentId == id
                      select new
                      {
                          Id = c.ChildId,
                          Name = c.FirstLastName
                      };

            var dto = await sql.ToListAsync();

            return Ok(dto);
        }


    }

}
