using App.CQRS.Clinics.Common.Queries.Query;
using Cayent.Core.Common;
using Cayent.Core.CQRS.Queries;
using Data.App.DbContext;
using Data.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cayent.Core.Common.Extensions;

namespace App.CQRS.Clinics.Common.Queries.Handler
{
    public sealed class ClinicCommonQueryHandler :
        IQueryHandler<GetClinicByIdQuery, GetClinicByIdQuery.Clinic>,
        IQueryHandler<SearchClinicQuery, Paged<SearchClinicQuery.Clinic>>
    {
        readonly AppDbContext _appDbContext;
        public ClinicCommonQueryHandler(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        async Task<GetClinicByIdQuery.Clinic> IQueryHandler<GetClinicByIdQuery, GetClinicByIdQuery.Clinic>.HandleAsync(GetClinicByIdQuery query, CancellationToken cancellationToken)
        {
            var sql = from c in _appDbContext.Clinics.Include(e => e.ParentClinics).AsNoTracking()

                      where c.ClinicId == query.ClinicId

                      select new GetClinicByIdQuery.Clinic
                      {
                          ClinicId = c.ClinicId,
                          Allowed = c.ParentClinics.Any(e => e.ParentId == query.UserId),
                          Name = c.Name,
                          PhoneNumber = c.PhoneNumber,
                          Email = c.Email,
                          MobileNumber = c.MobileNumber,
                          Address = c.Address,
                          GeoX = c.GeoX,
                          GeoY = c.GeoY,
                          BusinessHours = c.BusinessHours.Select(e => new GetClinicByIdQuery.BusinessHour
                          {
                              ClinicBusinessHourId = e.ClinicBusinessHourId,
                              DaysOfWeek = e.DaysOfWeek,
                              StartTime = e.StartTime,
                              EndTime = e.EndTime,
                          }),
                          Token = c.ConcurrencyToken
                      };

            var dto = await sql.FirstOrDefaultAsync();

            return dto;
        }

        async Task<Paged<SearchClinicQuery.Clinic>> IQueryHandler<SearchClinicQuery, Paged<SearchClinicQuery.Clinic>>.HandleAsync(SearchClinicQuery query, CancellationToken cancellationToken)
        {
            var sql = from c in _appDbContext.Clinics.Include(e => e.ParentClinics).AsNoTracking()

                      select new SearchClinicQuery.Clinic
                      {
                          ClinicId = c.ClinicId,
                          Allowed = c.ParentClinics.Any(e => e.ParentId == query.UserId),
                          Name = c.Name,
                          Address = c.Address,
                          BusinessHours = c.BusinessHours.Select(e => new SearchClinicQuery.BusinessHour
                          {
                              DaysOfWeek = e.DaysOfWeek,
                              StartTime = e.StartTime,
                              EndTime = e.EndTime
                          })
                      };

            var dto = await sql.ToPagedItemsAsync(query.PageIndex, query.PageSize);

            return dto;
        }
    }
}
