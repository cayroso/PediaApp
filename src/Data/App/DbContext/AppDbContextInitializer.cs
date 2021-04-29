using System;
using System.Collections.Generic;
using System.Linq;
using Cayent.Core.Data.Chats;
using Cayent.Core.Data.Identity.Models.Users;
using Cayent.Core.Data.Users;
using Data.App.Models.Clinics;
using Data.App.Models.Parents;
using Data.App.Models.Users;
using Data.Constants;
using Data.Identity.DbContext;
using Data.Providers;
using Microsoft.AspNetCore.Identity;
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

            CreateDefaultClinicStaffs(identityWebContext, ctx, clinic);
            //CopyIdentityUserToApp(identityWebContext, ctx, clinic);

            ctx.Add(clinic);

            CreateParents(identityWebContext, ctx);

            identityWebContext.SaveChanges();
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

                appUser.UserRoles = userRoles.Where(e => e.RoleId != ApplicationRoles.Systems.Id)
                .Select(e => new UserRole
                {
                    UserId = e.UserId,
                    RoleId = e.RoleId
                }).ToList<UserRoleBase>();

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

        static void CreateDefaultClinicStaffs(IdentityWebContext identityWebContext, AppDbContext appDbContext, Clinic clinic)
        {
            for (var i = 1; i <= 3; i++)
            {
                var token = NewId();
                var email = $"clinic-user{i}@pediaapp.com";
                var user = new IdentityWebUser
                {
                    Id = $"clinic-user{i}",
                    UserName = email,
                    NormalizedUserName = email.ToUpper(),

                    Email = email,
                    NormalizedEmail = email.ToUpper(),
                    EmailConfirmed = true,
                    PhoneNumber = "+639198262335",
                    PhoneNumberConfirmed = true,

                    LockoutEnabled = false,
                    LockoutEnd = null,
                    PasswordHash = "AQAAAAEAACcQAAAAEKGIieH17t5bYXa5tUfxRwN9UIEwApTKbQBRaUtIHplIUG2OfYxvBS8uvKy5E2Stsg==",
                    SecurityStamp = "6SADCY3NMMLOHA2S26ZJCEWGHWSQUYRM",
                    TwoFactorEnabled = false,
                    AccessFailedCount = 0,
                    //TenantId = tenant.TenantId,
                    ConcurrencyStamp = token,
                    UserInformation = new UserInformation
                    {
                        FirstName = $"Clinc-User{i}",
                        MiddleName = $"Clinc-User{i}",
                        LastName = $"Clinc-User{i}",
                        ConcurrencyToken = token,
                        //Theme = "https://bootswatch.com/4/sketchy/bootstrap.min.css"
                    }
                };

                var userRoles = new List<IdentityUserRole<string>>();
                if (i == 1)
                {
                    var userRole1 = new IdentityUserRole<string>
                    {
                        UserId = user.Id,
                        RoleId = ApplicationRoles.Pedia.Id
                    };
                    userRoles.Add(userRole1);

                }
                var userRole2 = new IdentityUserRole<string>
                {
                    UserId = user.Id,
                    RoleId = ApplicationRoles.Staff.Id
                };
                userRoles.Add(userRole2);

                identityWebContext.AddRange(user);
                identityWebContext.AddRange(userRoles);

                var appUser = new User
                {
                    UserId = user.Id,
                    FirstName = user.UserInformation.FirstName,
                    MiddleName = user.UserInformation.MiddleName,
                    LastName = user.UserInformation.LastName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                };
                var appUserRoles = userRoles.Select(e => new UserRole
                {
                    UserId = user.Id,
                    RoleId = e.RoleId
                });

                var staff = new Staff
                {
                    StaffId = appUser.UserId
                };

                var staffs = userRoles.Select(e =>
                    new ClinicStaff
                    {
                        ClinicId = clinic.ClinicId,
                        RoleId = e.RoleId,
                        Staff = staff
                    });

                appDbContext.Add(appUser);
                appDbContext.AddRange(appUserRoles);
                appDbContext.AddRange(staffs);

            }

        }


        static string NewId()
        {
            return Guid.NewGuid().ToString().ToLower();
        }

        static void CreateParents(IdentityWebContext identityWebContext, AppDbContext appDbContext)
        {
            for (var i = 1; i <= 5; i++)
            {
                var token = NewId();
                var email = $"user{i}@pediaapp.com";
                var user = new IdentityWebUser
                {
                    Id = $"parent{i}",
                    UserName = email,
                    NormalizedUserName = email.ToUpper(),

                    Email = email,
                    NormalizedEmail = email.ToUpper(),
                    EmailConfirmed = true,
                    PhoneNumber = "+639198262335",
                    PhoneNumberConfirmed = true,

                    LockoutEnabled = false,
                    LockoutEnd = null,
                    PasswordHash = "AQAAAAEAACcQAAAAEKGIieH17t5bYXa5tUfxRwN9UIEwApTKbQBRaUtIHplIUG2OfYxvBS8uvKy5E2Stsg==",
                    SecurityStamp = "6SADCY3NMMLOHA2S26ZJCEWGHWSQUYRM",
                    TwoFactorEnabled = false,
                    AccessFailedCount = 0,
                    //TenantId = tenant.TenantId,
                    ConcurrencyStamp = token,
                    UserInformation = new UserInformation
                    {
                        FirstName = $"Parent{i}",
                        MiddleName = $"Parent{i}",
                        LastName = $"Parent{i}",
                        ConcurrencyToken = token,
                        //Theme = "https://bootswatch.com/4/sketchy/bootstrap.min.css"
                    }
                };
                var userRole = new IdentityUserRole<string>
                {
                    UserId = user.Id,
                    RoleId = ApplicationRoles.Parent.Id
                };

                identityWebContext.AddRange(user);
                identityWebContext.AddRange(userRole);

                var appUser = new User
                {
                    UserId = user.Id,
                    FirstName = user.UserInformation.FirstName,
                    MiddleName = user.UserInformation.MiddleName,
                    LastName = user.UserInformation.LastName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                };

                appDbContext.Add(appUser);

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
        }
    }
}
