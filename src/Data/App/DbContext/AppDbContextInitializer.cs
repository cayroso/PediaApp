﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Data.App.Models.Chats;
using Data.App.Models.Clinics;
using Data.App.Models.Parents;
using Data.App.Models.Users;
using Data.Constants;
using Data.Identity.DbContext;
using Data.Identity.Models.Users;
using Data.Providers;
using Microsoft.EntityFrameworkCore;

namespace Data.App.DbContext
{
    public static class AppDbContextInitializer
    {
        static Random _rnd = new Random((int)DateTime.UtcNow.Ticks);

        public static void Initialize(IdentityWebContext identityWebContext, AppDbContext ctx, IEnumerable<ProvisionUserRole> provisionUserRoles)
        {
            if (ctx.Users.Any())
                return;

            var clinic = CreateClinic();

            CreateRoles(ctx, clinic);

            CopyIdentityUserToApp(identityWebContext, ctx, clinic);

            ctx.Add(clinic);

            ctx.SaveChanges();
        }

        static Clinic CreateClinic()
        {
            var clinicId = NewId();

            return new Clinic
            {
                ClinicId = clinicId,
                Name = "Default Clinic",
                Address = "123 Main Street",
                Chat = new Chat
                {
                    ChatId = clinicId,
                    Title = "Chat Group"
                },
                BusinessHours = new List<ClinicBusinessHour>
                {
                    new ClinicBusinessHour
                    {
                        DaysOfWeek="1,2,3,4,5,6",
                        StartTime = "09:00",
                        EndTime = "18:00"
                    }
                }
            };
        }

        static void CreateRoles(AppDbContext ctx, Clinic pharmacy)
        {
            var roles = ApplicationRoles.Items
                .Select(e => new Role
                {
                    RoleId = e.Id,
                    Name = e.Name,
                });

            ctx.AddRange(roles);
        }

        static void CopyIdentityUserToApp(IdentityWebContext identityWebContext, AppDbContext appDbContext, Clinic clinic)
        {
            var users = identityWebContext.Users.Include(e => e.UserInformation).ToList();

            var appUsers = new List<User>();

            users.ForEach(u =>
            {
                var appUser = new User
                {
                    UserId = u.Id,
                    FirstName = u.UserInformation.FirstName,
                    MiddleName = u.UserInformation.MiddleName,
                    LastName = u.UserInformation.LastName,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                };



                var userRoles = identityWebContext.UserRoles.Where(e => e.UserId == u.Id).ToList();

                appUser.UserRoles = userRoles.Select(e => new UserRole
                {
                    UserId = e.UserId,
                    RoleId = e.RoleId
                }).ToList();

                appUsers.Add(appUser);

                // if Clinic
                var staff = new Staff
                {
                    StaffId = appUser.UserId
                };

                userRoles.ForEach(ur =>
                {
                    if (ur.RoleId == ApplicationRoles.Pedia.Id || ur.RoleId == ApplicationRoles.Staff.Id)
                    {
                        var ownerOrStaff = new ClinicStaff
                        {
                            ClinicId = clinic.ClinicId,
                            RoleId = ur.RoleId,
                            Staff = staff
                        };

                        appDbContext.Add(ownerOrStaff);
                    }
                    if (ur.RoleId == ApplicationRoles.Parent.Id)
                    {
                        var parent = new Parent
                        {
                            ParentId = appUser.UserId,
                            Children = new List<Child>
                            {
                                new Child
                                {
                                    ChildId = NewId(),
                                    FirstName = appUser.FirstName,
                                    MiddleName = appUser.MiddleName,
                                    LastName = appUser.LastName + " II",
                                    DateOfBirth = DateTime.UtcNow.AddYears(-5),
                                    Gender = Enums.EnumGender.Male,
                                    ParentId = appUser.UserId,
                                }

                            }
                        };

                        appDbContext.Add(parent);
                    }
                });

                clinic.Chat.Receivers.Add(new ChatReceiver
                {
                    ChatId = clinic.Chat.ChatId,
                    ReceiverId = u.Id,
                });
            });

            appDbContext.AddRange(appUsers);
        }

        static List<Tuple<string, string, string, string>> GetNames()
        {
            var list = new List<Tuple<string, string, string, string>>();

            //list.Add(new Tuple<string, string, string, string>("Juan", "Dela Cruz", "09191234567", "105 Paz Street, Barangay 11, Balayan, Batangas City"));
            //list.Add(new Tuple<string, string, string, string>("Pening", "Garcia", "09191234567", "101 Subdivision 202 Street, Barangay, Town, City, Philippines"));
            //list.Add(new Tuple<string, string, string, string>("Nadia", "Cole", "09191234567", "301 Main Street, Barangay 3, Balayan, Batangas City"));
            //list.Add(new Tuple<string, string, string, string>("Chino", "Pacia", "09191234567", "202 Subdivision 303 Street, Barangay, Town, City, Philippines"));
            //list.Add(new Tuple<string, string, string, string>("Vina", "Ruruth", "09191234567", "501 Main Street, Barangay 5, Balayan, Batangas City"));
            //list.Add(new Tuple<string, string, string, string>("Lina", "Mutac", "09191234567", "601 Main Street, Barangay 6, Balayan, Batangas City"));

            list.Add(new Tuple<string, string, string, string>("Pening", "Garcia", "09191234567", "101 Subdivision 202 Street, Barangay, Town, City, Philippines"));
            list.Add(new Tuple<string, string, string, string>("Chino", "Pacia", "09191234567", "202 Subdivision 303 Street, Barangay, Town, City, Philippines"));

            return list;
        }

        static string NewId()
        {
            return Guid.NewGuid().ToString().ToLower();
        }

        static string NewCouponCode()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = _rnd;
            var result = new string(
                Enumerable.Repeat(chars, 8)
                          .Select(s => s[random.Next(s.Length)])
                          .ToArray());

            return result;
        }
    }
}
