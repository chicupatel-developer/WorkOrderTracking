using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MVCCore.Auth.Areas.Identity.Data;
using MVCCore.Auth.Data;

[assembly: HostingStartup(typeof(MVCCore.Auth.Areas.Identity.IdentityHostingStartup))]
namespace MVCCore.Auth.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<AuthContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("DbContextConnection")));

                services.AddIdentity<ApplicationUser, IdentityRole>(options =>
                {
                    options.SignIn.RequireConfirmedAccount = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                })
                    .AddDefaultUI()
                    .AddEntityFrameworkStores<AuthContext>()
                    .AddDefaultTokenProviders();

                #region authorization policy
                services.AddAuthorization(options =>
                {
                    options.AddPolicy("Admin",
                        authBuilder =>
                        {
                            authBuilder.RequireRole("Admin");
                        });
                    options.AddPolicy("Operator",
                     authBuilder =>
                     {
                         authBuilder.RequireRole("Operator");
                     });
                });
                #endregion



            });
        }
    }
}