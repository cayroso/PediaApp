﻿using App.CQRS.Clinics.Common.Queries.Query;
using Data.App.DbContext;
using Data.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        async Task<GetClinicByIdQuery.Clinic> IQueryHandler<GetClinicByIdQuery, GetClinicByIdQuery.Clinic>.HandleAsync(GetClinicByIdQuery query)
        {
            var sql = from c in _appDbContext.Clinics.AsNoTracking()

                      where c.ClinicId == query.ClinicId

                      select new GetClinicByIdQuery.Clinic
                      {
                          ClinicId = c.ClinicId,
                          Name = c.Name,
                          ClinicStatus = c.ClinicStatus,
                          PhoneNumber = c.PhoneNumber,
                          Email = c.Email,
                          MobileNumber = c.MobileNumber,
                          OpeningHours = c.OpeningHours,
                          Address = c.Address,
                          GeoX = c.GeoX,
                          GeoY = c.GeoY,
                          Token = c.ConcurrencyToken
                      };

            var dto = await sql.FirstOrDefaultAsync();

            return dto;
        }

        async Task<Paged<SearchClinicQuery.Clinic>> IQueryHandler<SearchClinicQuery, Paged<SearchClinicQuery.Clinic>>.HandleAsync(SearchClinicQuery query)
        {
            var sql = from c in _appDbContext.Clinics.AsNoTracking()

                      select new SearchClinicQuery.Clinic
                      {
                          ClinicId = c.ClinicId,
                          Name = c.Name,
                          ClinicStatus = c.ClinicStatus,
                          OpeningHours = c.OpeningHours,
                          Address = c.Address,
                      };

            var dto = await sql.ToPagedItemsAsync(query.PageIndex, query.PageSize);

            return dto;
        }
    }
}
