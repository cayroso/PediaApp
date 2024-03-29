﻿using App.CQRS.Clinics.Common.Queries.Query;
using Cayent.Core.Common;
using Cayent.Core.CQRS.Queries;
using Data.App.DbContext;
using Data.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Cayent.Core.Common.Extensions;
using System.Threading;

namespace App.CQRS.Clinics.Common.Queries.Handler
{
    public sealed class ParentCommonQueryHandler :
        IQueryHandler<GetParentByIdQuery, GetParentByIdQuery.Parent>,
        IQueryHandler<SearchParentByClinicIdQuery, Paged<SearchParentByClinicIdQuery.Parent>>
    {
        readonly AppDbContext _appDbContext;
        public ParentCommonQueryHandler(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        async Task<GetParentByIdQuery.Parent> IQueryHandler<GetParentByIdQuery, GetParentByIdQuery.Parent>.HandleAsync(GetParentByIdQuery query, CancellationToken cancellationToken)
        {
            var sql = from p in _appDbContext.Parents.Include(e => e.User).AsNoTracking()

                      where p.ParentId == query.ParentId

                      select new GetParentByIdQuery.Parent
                      {
                          ParentId = p.ParentId,
                          Name = p.User.FirstLastName,
                          ImageUrl = p.User.Image.Url,
                          PhoneNumber = p.User.PhoneNumber,
                          Email = p.User.Email,
                          Children = p.Children.Select(e => new GetParentByIdQuery.Child
                          {
                              ChildId = e.ChildId,
                              ImageUrl = e.Image.Url,
                              Name = e.FirstLastName,
                              Gender = e.Gender,
                              DateOfBirth = e.DateOfBirth,
                          }),
                          Token = p.User.ConcurrencyToken
                      };

            var dto = await sql.FirstOrDefaultAsync();

            return dto;
        }

        async Task<Paged<SearchParentByClinicIdQuery.Parent>> IQueryHandler<SearchParentByClinicIdQuery, Paged<SearchParentByClinicIdQuery.Parent>>.HandleAsync(SearchParentByClinicIdQuery query, CancellationToken cancellationToken)
        {
            var sql = from p in _appDbContext.Parents.Include(e => e.ParentClinics).AsNoTracking()

                      where string.IsNullOrWhiteSpace(query.ClinicId) || p.ParentClinics.Any(e => e.ClinicId == query.ClinicId)

                      select new SearchParentByClinicIdQuery.Parent
                      {
                          ParentId = p.ParentId,
                          Name = p.User.FirstLastName,
                          ImageUrl = p.User.Image.Url,
                          PhoneNumber = p.User.PhoneNumber,
                          Email = p.User.Email,
                          NumberOfChildren = p.Children.Count()
                      };

            var dto = await sql.ToPagedItemsAsync(query.PageIndex, query.PageSize);

            return dto;
        }
    }
}
