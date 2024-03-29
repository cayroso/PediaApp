﻿using App.CQRS.Staffs.Common.Queries.Query;
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

namespace App.CQRS.Staffs.Common.Queries.Handler
{
    public sealed class StaffCommonQueryHandler :
        IQueryHandler<GetStaffByIdQuery, GetStaffByIdQuery.Staff>,
        IQueryHandler<SearchStaffQuery, Paged<SearchStaffQuery.Staff>>
    {
        readonly AppDbContext _appDbContext;
        public StaffCommonQueryHandler(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        async Task<GetStaffByIdQuery.Staff> IQueryHandler<GetStaffByIdQuery, GetStaffByIdQuery.Staff>.HandleAsync(GetStaffByIdQuery query, CancellationToken cancellationToken)
        {
            var sql = from s in _appDbContext.Users.AsNoTracking()

                      where s.UserId == query.StaffId

                      select new GetStaffByIdQuery.Staff
                      {
                          StaffId = s.UserId,
                          UrlProfilePicture = s.Image == null ? null : s.Image.Url,
                          FirstName = s.FirstName,
                          MiddleName = s.MiddleName,
                          LastName = s.LastName,
                          Email = s.Email,
                          PhoneNumber = s.PhoneNumber,
                          Token = s.ConcurrencyToken,

                          Roles = s.UserRoles.Select(e => new GetStaffByIdQuery.Role
                          {
                              RoleId = e.Role.RoleId,
                              Name = e.Role.Name
                          })

                      };

            var dto = await sql.FirstOrDefaultAsync();

            return dto;
        }

        async Task<Paged<SearchStaffQuery.Staff>> IQueryHandler<SearchStaffQuery, Paged<SearchStaffQuery.Staff>>.HandleAsync(SearchStaffQuery query, CancellationToken cancellationToken)
        {
            var sql = from s in _appDbContext.Staffs
                        .Include(e => e.User)
                            .ThenInclude(e => e.Image)
                        .Include(e => e.User)
                            .ThenInclude(e => e.UserRoles)
                        .AsNoTracking()
                          //join cs in _appDbContext.ClinicStaffs.AsNoTracking() on s.StaffId equals cs.StaffId

                      where s.Clinics.Any(e => e.ClinicId == query.ClinicId)

                      select new SearchStaffQuery.Staff
                      {
                          StaffId = s.User.UserId,
                          UrlProfilePicture = s.User.Image == null ? null : s.User.Image.Url,
                          FirstName = s.User.FirstName,
                          MiddleName = s.User.MiddleName,
                          LastName = s.User.LastName,
                          Email = s.User.Email,
                          PhoneNumber = s.User.PhoneNumber,
                          Roles = s.User.UserRoles.Select(e => e.Role.Name)
                      };
            //var sql = from ps in _appDbContext.ClinicStaffs
            //                            .Include(e => e.Staff)
            //                                .ThenInclude(e => e.User)
            //                                    .ThenInclude(e => e.Image)
            //                            .AsNoTracking()
            //          where ps.ClinicId == query.ClinicId

            //          select new SearchStaffQuery.Staff
            //          {
            //              StaffId = ps.Staff.User.UserId,
            //              UrlProfilePicture = ps.Staff.User.Image == null ? null : ps.Staff.User.Image.Url,
            //              FirstName = ps.Staff.User.FirstName,
            //              MiddleName = ps.Staff.User.MiddleName,
            //              LastName = ps.Staff.User.LastName,
            //              Email = ps.Staff.User.Email,
            //              PhoneNumber = ps.Staff.User.PhoneNumber,
            //              Roles = ps.Staff.User.UserRoles.Select(e => e.Role.Name)
            //          };

            var dto = await sql.ToPagedItemsAsync(query.PageIndex, query.PageSize, cancellationToken);

            return dto;
        }
    }
}
