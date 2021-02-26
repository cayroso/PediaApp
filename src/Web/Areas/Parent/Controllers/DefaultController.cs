using App.CQRS;
using Data.App.DbContext;
using Data.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Controllers;

namespace Web.Areas.Parent.Controllers
{
    [Authorize(Policy = ApplicationRoles.ParentRoleName)]
    [ApiController]
    [Route("api/parents/[controller]")]
    [Produces("application/json")]
    public class DefaultController : BaseController
    {
        readonly IQueryHandlerDispatcher _queryHandlerDispatcher;
        public DefaultController(IQueryHandlerDispatcher queryHandlerDispatcher)
        {
            _queryHandlerDispatcher = queryHandlerDispatcher ?? throw new ArgumentNullException(nameof(queryHandlerDispatcher));
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard([FromServices] AppDbContext appDbContext, int year, int month)
        {
            var now = DateTime.UtcNow;

            var startMonth = new DateTime(now.Year, now.Month, 1);
            var endMonth = startMonth.AddMonths(1);

            var appointments = await appDbContext.Appointments
                    .Include(e => e.Clinic)
                    .Include(e => e.Child)
                        .ThenInclude(e => e.Image)
                    .AsNoTracking()
                    .Where(e => e.Child.ParentId == UserId)
                    .Where(e => e.DateStart >= startMonth && e.DateEnd <= endMonth)
                    .OrderBy(e => e.DateStart).ThenBy(e => e.DateEnd)
                    .ToListAsync();

            //  needs approval
            var needsApprovalAppointments = appointments
                    .Where(e => e.Status == Data.Enums.EnumAppointmentStatus.ParentRequested
                    || e.Status == Data.Enums.EnumAppointmentStatus.ClinicRequested
                    )
                    .OrderBy(e => e.DateStart).ThenBy(e => e.DateEnd)
                    .ToList();

            //  overdue 
            var overdueAppointments = appointments
                    .Where(e => e.DateStart < DateTime.UtcNow && e.Status == Data.Enums.EnumAppointmentStatus.Accepted)
                    .OrderBy(e => e.DateStart).ThenBy(e => e.DateEnd)
                    .ToList();

            //  todays upcoming appointments, accepted
            var upcomingAppointments = appointments
                    .Where(e => e.DateStart >= DateTime.UtcNow && e.Status == Data.Enums.EnumAppointmentStatus.Accepted)
                    .OrderBy(e => e.DateStart).ThenBy(e => e.DateEnd)
                    .ToList();

            var dto = new
            {
                needsApprovalAppointments,
                overdueAppointments,
                upcomingAppointments
            };


            return Ok(dto);
        }

    }
}
