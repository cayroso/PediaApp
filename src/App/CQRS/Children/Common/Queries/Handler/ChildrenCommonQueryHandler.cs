using App.CQRS.Children.Common.Queries.Query;
using Data.App.DbContext;
using Data.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Children.Common.Queries.Handler
{
    public sealed class ChildrenCommonQueryHandler :
        IQueryHandler<GetChildByIdQuery, GetChildByIdQuery.Child>,
        IQueryHandler<SearchChildrenQuery, Paged<SearchChildrenQuery.Child>>
    {
        readonly AppDbContext _appDbContext;
        public ChildrenCommonQueryHandler(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        async Task<GetChildByIdQuery.Child> IQueryHandler<GetChildByIdQuery, GetChildByIdQuery.Child>.HandleAsync(GetChildByIdQuery query)
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
                          MedicalEntries = c.MedicalEntries.Select(e => new GetChildByIdQuery.ChildMedicalEntry
                          {
                              Age = e.Age,
                              Height = e.Height,
                              Weight = e.Weight,
                              Summary = e.Summary,
                              DateCreated = e.DateCreated
                          })
                      };

            var dto = await sql.FirstOrDefaultAsync();

            return dto;
        }

        async Task<Paged<SearchChildrenQuery.Child>> IQueryHandler<SearchChildrenQuery, Paged<SearchChildrenQuery.Child>>.HandleAsync(SearchChildrenQuery query)
        {
            var sql = from c in _appDbContext.Children.AsNoTracking()

                      select new SearchChildrenQuery.Child
                      {
                          ChildId = c.ChildId,
                          Parent = new SearchChildrenQuery.Parent
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
