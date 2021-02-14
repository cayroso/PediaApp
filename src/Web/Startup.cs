using App.Hubs;
using Data.App.DbContext;
using Data.Constants;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Web.Middlewares;

namespace Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(opt => { });

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.Configure<RouteOptions>(opt =>
            {
                opt.LowercaseUrls = true;
                opt.AppendTrailingSlash = true;
            });

            services.AddLogging();

            services.AddSignalR().AddNewtonsoftJsonProtocol(options =>
            {
                //options.PayloadSerializerSettings.ContractResolver = new CamelCaseContractResolver();
                options.PayloadSerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                //options.PayloadSerializerSettings.DateFormatString = "yyyy-MM-ddTHH:mmZ";
                //options.PayloadSerializerSettings.Culture = cultureInfo;
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(ApplicationRoles.PediaRoleName, policy =>
                   policy.RequireAssertion(context =>
                       context.User.HasClaim(c =>
                       c.Type == System.Security.Claims.ClaimTypes.Role && c.Value == ApplicationRoles.PediaRoleName
                           )));

                options.AddPolicy(ApplicationRoles.StaffRoleName, policy =>
                   policy.RequireAssertion(context =>
                       context.User.HasClaim(c =>
                       c.Type == System.Security.Claims.ClaimTypes.Role && c.Value == ApplicationRoles.StaffRoleName
                           )));

                options.AddPolicy(ApplicationRoles.ParentRoleName, policy =>
                   policy.RequireAssertion(context =>
                       context.User.HasClaim(c =>
                       c.Type == System.Security.Claims.ClaimTypes.Role && c.Value == ApplicationRoles.ParentRoleName
                           )));


                //options.AddPolicy(ApplicationPermissions.ManageUserTasks, policy =>
                //   policy.RequireAssertion(context =>
                //       context.User.HasClaim(c =>
                //       c.Type == System.Security.Claims.ClaimTypes.Role &&
                //        (c.Value == ApplicationRoles.ManagerRoleName || c.Value == ApplicationRoles.AssistantRoleName)
                //           )));
            });


            var mvcBuilder = services.AddRazorPages(opt =>
            {

            }).AddNewtonsoftJson(opt =>
            {
                opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            })
            .AddRazorPagesOptions(opt =>
            {
                opt.Conventions.AuthorizeAreaFolder(ApplicationRoles.PediaRoleName, "/", ApplicationRoles.PediaRoleName);
                opt.Conventions.AuthorizeAreaFolder(ApplicationRoles.StaffRoleName, "/", ApplicationRoles.StaffRoleName);
                opt.Conventions.AuthorizeAreaFolder(ApplicationRoles.ParentRoleName, "/", ApplicationRoles.ParentRoleName);
            });



            //services.AddTransient<Hub<IUserTaskHubClient>, UserTaskHub>();
            //services.AddTransient<UserTaskHubClient>();

            //services.AddTransient<Hub<IOrderHubClient>, OrderHub>();
            //services.AddTransient<OrderHubClient>();

            services.AddMvc(opt =>
            {
                opt.EnableEndpointRouting = false;
            });

#if DEBUG
            mvcBuilder.AddRazorRuntimeCompilation();
#endif

#if !DEBUG
            services.AddProgressiveWebApp();
#endif
            services.AddScoped<App.Services.ChatService>();

            services.AddTransient<ChatHub>();
            services.AddTransient<TripHub>();

            StartupExtension.RegisterCQRS(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.Use(async (context, next) =>
            {
                var path = context.Request.Path.Value;

                ApplicationRoles.Items.ForEach(r =>
                {
                    var find = $"/{r.Id}/";

                    if (path.StartsWith(find))
                    {
                        context.Request.Path = find;
                    }
                });
                //if (context.Request.Path.Value.StartsWith("/pedia/"))
                //{
                //    context.Request.Path = "/pedia/";
                //}
                //else if (context.Request.Path.Value.StartsWith("/staff/"))
                //{
                //    context.Request.Path = "/staff/";
                //}
                //else if (context.Request.Path.Value.StartsWith("/parent/"))
                //{
                //    context.Request.Path = "/parent/";
                //}


                //context.Response.ContentType = "text/html";
                //await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));

                await next();
            });

            app.ConfigureCustomExceptionMiddleware();
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapControllers();

                endpoints.MapHub<ChatHub>("/chatHub");
                endpoints.MapHub<TripHub>("/tripHub"); 
            });
        }
    }
}
