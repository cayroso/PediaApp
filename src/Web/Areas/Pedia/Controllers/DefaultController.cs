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

namespace Web.Areas.Pedia.Controllers
{
    [Authorize(Policy = ApplicationRoles.PediaRoleName)]
    [ApiController]
    [Route("api/pedias/[controller]")]
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

            var startWeek = now.AddDays(-(int)now.DayOfWeek);
            var endWeek = startWeek.AddDays(7);

            var startLastWeek = startWeek.AddDays(-7);
            var endLastWeek = startWeek;

            var startToday = now.Date;
            var endToday = startToday.AddDays(1);

            var startYesterday = now.Date.AddDays(-1);
            var endYesterday = now.Date;


            var appointmentHistories = await appDbContext.AppointmentTimelines
                .AsNoTracking()
                .Where(e => e.DateTimeline >= startMonth && e.DateTimeline <= endMonth)
                .ToListAsync();

            var appointmentHistoryWeek = appointmentHistories.Where(e => e.DateTimeline >= startWeek && e.DateTimeline <= endWeek);
            var appointmentHistoryLastWeek = appointmentHistories.Where(e => e.DateTimeline >= startLastWeek && e.DateTimeline <= endLastWeek);

            //  this month # of appointments requested, cancelled, completed
            var monthRequested = appointmentHistories.Where(e => e.Status == Data.Enums.EnumAppointmentStatus.ClinicRequested
                    || e.Status == Data.Enums.EnumAppointmentStatus.ParentRequested);

            var monthCancelled = appointmentHistories.Where(e => e.Status == Data.Enums.EnumAppointmentStatus.ClinicCancelled
                    || e.Status == Data.Enums.EnumAppointmentStatus.ParentCancelled);

            var monthCompleted = appointmentHistories.Where(e => e.Status == Data.Enums.EnumAppointmentStatus.Completed);

            //  this week # of appointments requested, cancelled, completed
            var weekRequested = appointmentHistoryWeek.Where(e => e.Status == Data.Enums.EnumAppointmentStatus.ClinicRequested
                    || e.Status == Data.Enums.EnumAppointmentStatus.ParentRequested);

            var weekCancelled = appointmentHistoryWeek.Where(e => e.Status == Data.Enums.EnumAppointmentStatus.ClinicCancelled
                    || e.Status == Data.Enums.EnumAppointmentStatus.ParentCancelled);

            var weekCompleted = appointmentHistoryWeek.Where(e => e.Status == Data.Enums.EnumAppointmentStatus.Completed);

            //  last week # of appointments requested, cancelled, completed
            var lastWeekRequested = appointmentHistoryLastWeek.Where(e => e.Status == Data.Enums.EnumAppointmentStatus.ClinicRequested
                    || e.Status == Data.Enums.EnumAppointmentStatus.ParentRequested);

            var lastWeekCancelled = appointmentHistoryLastWeek.Where(e => e.Status == Data.Enums.EnumAppointmentStatus.ClinicCancelled
                    || e.Status == Data.Enums.EnumAppointmentStatus.ParentCancelled);

            var lastWeekCompleted = appointmentHistoryLastWeek.Where(e => e.Status == Data.Enums.EnumAppointmentStatus.Completed);

            //  todays upcoming appointments, accepted
            var upcomingAppointments = await appDbContext.Appointments
                    .Include(e => e.Child)
                        .ThenInclude(e => e.Parent)
                            .ThenInclude(e => e.User)
                    .AsNoTracking()
                    .Where(e => e.DateStart >= DateTime.UtcNow && e.Status == Data.Enums.EnumAppointmentStatus.Accepted)
                    .ToListAsync();

            var dto = new
            {
                monthRequested = monthRequested.Count(),
                monthCancelled = monthCancelled.Count(),
                monthCompleted = monthCompleted.Count(),

                weekRequested = weekRequested.Count(),
                weekCancelled = weekCancelled.Count(),
                weekCompleted = weekCompleted.Count(),

                lastWeekRequested = lastWeekRequested.Count(),
                lastWeekCancelled = lastWeekCancelled.Count(),
                lastWeekCompleted = lastWeekCompleted.Count(),

                upcomingAppointments
            };


            return Ok(dto);
        }

        public class DashboardView
        {

        }
    }
}
