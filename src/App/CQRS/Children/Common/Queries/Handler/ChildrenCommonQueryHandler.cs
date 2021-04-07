using App.CQRS.Children.Common.Queries.Query;
using Cayent.Core.Common;
using Cayent.Core.CQRS.Queries;
using Data.App.DbContext;
using Data.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cayent.Core.Common.Extensions;

namespace App.CQRS.Children.Common.Queries.Handler
{
    public sealed class ChildrenCommonQueryHandler :
        IQueryHandler<GetChildByIdQuery, GetChildByIdQuery.Child>,
        IQueryHandler<GetMedicalEntryByIdQuery, GetMedicalEntryByIdQuery.ChildMedicalEntry>,
        IQueryHandler<SearchChildrenByClinicQuery, Paged<SearchChildrenByClinicQuery.Child>>,
        IQueryHandler<SearchChildrenByParentIdQuery, Paged<SearchChildrenByParentIdQuery.Child>>
    {
        readonly AppDbContext _appDbContext;
        public ChildrenCommonQueryHandler(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        async Task<GetChildByIdQuery.Child> IQueryHandler<GetChildByIdQuery, GetChildByIdQuery.Child>.HandleAsync(GetChildByIdQuery query, CancellationToken cancellationToken)
        {
            var sql = from c in _appDbContext.Children.AsNoTracking()

                      where c.ChildId == query.ChildId

                      select new GetChildByIdQuery.Child
                      {
                          ChildId = c.ChildId,
                          Parent = new GetChildByIdQuery.Parent
                          {
                              ParentId = c.Parent.ParentId,
                              Name = c.Parent.User.FirstLastName,
                              PhoneNumber = c.Parent.User.PhoneNumber,
                              Email = c.Parent.User.Email,
                          },
                          Gender = c.Gender,
                          ImageUrl = c.Image.Url,
                          FirstName = c.FirstName,
                          MiddleName = c.MiddleName,
                          LastName = c.LastName,
                          DateOfBirth = c.DateOfBirth,
                          DateCreated = c.DateCreated,
                          Token = c.ConcurrencyToken,
                          MedicalEntries = c.MedicalEntries.OrderBy(e => e.DateCreated).Select(e => new GetChildByIdQuery.ChildMedicalEntry
                          {
                              ChildMedicalEntryId = e.ChildMedicalEntryId,
                              Age = e.Age,
                              Height = e.Height,
                              Weight = e.Weight,
                              ChestCircumference = e.ChestCircumference,
                              HeadCircumference = e.HeadCircumference,
                              DateReturn = e.DateReturn,
                              Summary = e.Summary,
                              DateCreated = e.DateCreated
                          })
                      };

            var dto = await sql.FirstOrDefaultAsync();

            return dto;
        }

        async Task<GetMedicalEntryByIdQuery.ChildMedicalEntry> IQueryHandler<GetMedicalEntryByIdQuery, GetMedicalEntryByIdQuery.ChildMedicalEntry>.HandleAsync(GetMedicalEntryByIdQuery query, CancellationToken cancellation)
        {
            var sql = from me in _appDbContext.ChildMedicalEntries.AsNoTracking()

                      where me.ChildMedicalEntryId == query.ChildMedicalEntryId

                      select new GetMedicalEntryByIdQuery.ChildMedicalEntry
                      {
                          Age = me.Age,
                          Height = me.Height,
                          Weight = me.Weight,
                          HeadCircumference = me.HeadCircumference,
                          ChestCircumference = me.ChestCircumference,
                          Summary = me.Summary,
                          DateCreated = me.DateCreated,
                          DateReturn = me.DateReturn,
                          Token = me.ConcurrencyToken
                      };

            var dto = await sql.FirstOrDefaultAsync();

            return dto;
        }

        async Task<Paged<SearchChildrenByClinicQuery.Child>> IQueryHandler<SearchChildrenByClinicQuery, Paged<SearchChildrenByClinicQuery.Child>>.HandleAsync(SearchChildrenByClinicQuery query, CancellationToken cancellation)
        {
            var sql = from c in _appDbContext.Children.AsNoTracking()
                      join pc in _appDbContext.ParentClinic.AsNoTracking() on c.ParentId equals pc.ParentId
                      //join cc in _appDbContext.clin.AsNoTracking() on c.ChildId equals cc.ChildId

                      where pc.ClinicId == query.ClinicId

                      select new SearchChildrenByClinicQuery.Child
                      {
                          ChildId = c.ChildId,
                          Parent = new SearchChildrenByClinicQuery.Parent
                          {
                              ParentId = c.Parent.ParentId,
                              Name = c.Parent.User.FirstLastName,
                              PhoneNumber = c.Parent.User.PhoneNumber,
                              Email = c.Parent.User.Email,
                          },
                          Gender = c.Gender,
                          ImageUrl = c.Image.Url,
                          FirstName = c.FirstName,
                          MiddleName = c.MiddleName,
                          LastName = c.LastName,
                          DateOfBirth = c.DateOfBirth,
                      };

            var dto = await sql.ToPagedItemsAsync(query.PageIndex, query.PageSize);

            return dto;
        }

        async Task<Paged<SearchChildrenByParentIdQuery.Child>> IQueryHandler<SearchChildrenByParentIdQuery, Paged<SearchChildrenByParentIdQuery.Child>>.HandleAsync(SearchChildrenByParentIdQuery query, CancellationToken cancellation)
        {
            var sql = from c in _appDbContext.Children.AsNoTracking()

                      where c.ParentId == query.ParentId

                      select new SearchChildrenByParentIdQuery.Child
                      {
                          ChildId = c.ChildId,
                          Parent = new SearchChildrenByParentIdQuery.Parent
                          {
                              ParentId = c.Parent.ParentId,
                              Name = c.Parent.User.FirstLastName,
                              PhoneNumber = c.Parent.User.PhoneNumber,
                              Email = c.Parent.User.Email,
                          },
                          Gender = c.Gender,
                          ImageUrl = c.Image.Url,
                          FirstName = c.FirstName,
                          MiddleName = c.MiddleName,
                          LastName = c.LastName,
                          DateOfBirth = c.DateOfBirth,
                      };

            var dto = await sql.ToPagedItemsAsync(query.PageIndex, query.PageSize);

            return dto;
        }


    }
}
