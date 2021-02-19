using App.CQRS.Appointments.Common.Queries.Query;
using Data.App.DbContext;
using Data.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.CQRS.Appointments.Common.Queries.Handler
{
    public sealed class AppointmentCommonQueryHandler :
        IQueryHandler<GetAppointmentByIdQuery, GetAppointmentByIdQuery.Appointment>,
        IQueryHandler<SearchAppointmentQuery, Paged<SearchAppointmentQuery.Appointment>>
    {
        readonly AppDbContext _appDbContext;
        public AppointmentCommonQueryHandler(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        async Task<GetAppointmentByIdQuery.Appointment> IQueryHandler<GetAppointmentByIdQuery, GetAppointmentByIdQuery.Appointment>.HandleAsync(GetAppointmentByIdQuery query)
        {
            var sql = from a in _appDbContext.Appointments.AsNoTracking()

                      where a.AppointmentId == query.AppointmentId

                      select new GetAppointmentByIdQuery.Appointment
                      {
                          AppointmentId = a.AppointmentId,
                          Type = a.Type,
                          Status = a.Status,
                          StatusReason = a.StatusReason,
                          DateStart = a.DateStart,
                          DateEnd = a.DateEnd,
                          DateCreated = a.DateCreated,
                          Clinic = new GetAppointmentByIdQuery.Clinic
                          {
                              ClinicId = a.Clinic.ClinicId,
                              Name = a.Clinic.Name,
                              PhoneNumber = a.Clinic.PhoneNumber,
                              MobileNumber = a.Clinic.MobileNumber,
                              Email = a.Clinic.Email,
                              OpeningHours = a.Clinic.OpeningHours,
                              Address = a.Clinic.Address
                          },
                          Child = new GetAppointmentByIdQuery.Child
                          {
                              ChildId = a.Child.ChildId,
                              ImageUrl = a.Child.Image.Url,
                              FirstName = a.Child.FirstName,
                              MiddleName = a.Child.MiddleName,
                              LastName = a.Child.LastName,
                              DateOfBirth = a.Child.DateOfBirth,
                              Gender = a.Child.Gender,
                          },
                          Parent = new GetAppointmentByIdQuery.Parent
                          {
                              ParentId = a.Child.Parent.ParentId,
                              ImageUrl = a.Child.Parent.User.Image.Url,
                              Name = a.Child.Parent.User.FirstLastName,
                              PhoneNumber = a.Child.Parent.User.PhoneNumber,
                              Email = a.Child.Parent.User.Email,
                          },


                          Token = a.ConcurrencyToken
                      };

            var dto = await sql.FirstOrDefaultAsync();

            return dto;
        }

        async Task<Paged<SearchAppointmentQuery.Appointment>> IQueryHandler<SearchAppointmentQuery, Paged<SearchAppointmentQuery.Appointment>>.HandleAsync(SearchAppointmentQuery query)
        {
            var sql = from a in _appDbContext.Appointments.AsNoTracking()

                      where a.ClinicId == query.ClinicId || a.Child.ParentId == query.ParentId

                      select new SearchAppointmentQuery.Appointment
                      {
                          AppointmentId = a.AppointmentId,
                          Clinic = new SearchAppointmentQuery.Clinic
                          {
                              ClinicId = a.Clinic.ClinicId,
                              Name = a.Clinic.Name,
                          },
                          Child = new SearchAppointmentQuery.Child
                          {
                              ChildId = a.Child.ChildId,
                              ImageUrl = a.Child.Image.Url,
                              Name = $"{a.Child.FirstName} {a.Child.MiddleName} {a.Child.LastName}",
                          },
                          Parent = new SearchAppointmentQuery.Parent
                          {
                              ParentId = a.Child.Parent.ParentId,
                              ImageUrl = a.Child.Parent.User.Image.Url,
                              Name = a.Child.Parent.User.FirstLastName,
                              PhoneNumber = a.Child.Parent.User.PhoneNumber,
                              Email = a.Child.Parent.User.Email,
                          },
                          Type = a.Type,
                          Status = a.Status,
                          StatusReason = a.StatusReason,
                          DateStart = a.DateStart,
                          DateEnd = a.DateEnd,
                          DateCreated = a.DateCreated,
                      };

            var dto = await sql.ToPagedItemsAsync(query.PageIndex, query.PageSize);

            return dto;
        }
    }
}
