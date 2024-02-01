using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scheduler;
using Scheduler.Authorization;
using Scheduler.Authorization.Handlers;
using Scheduler.Common.Constants;
using Scheduler.Common.Settings;
using Scheduler.Data;
using Scheduler.Data.Repositories;
using Scheduler.Models;
using Scheduler.Services.Interfaces;
using Scheduler.Services.Mapping;
using Scheduler.Services.Services;
using System.Reflection;
using System.Security.Claims;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SchedulerDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<ApplicationUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<SchedulerDbContext>()
    .AddClaimsPrincipalFactory<UserClaimsPrincipalFactory>();

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, SchedulerDbContext>(options =>
    {
        options.IdentityResources["openid"].UserClaims.Add(ClaimTypes.Role);
        options.ApiResources.Single().UserClaims.Add(ClaimTypes.Role);

        options.IdentityResources["openid"].UserClaims.Add(ClaimNames.ClinicId);
        options.ApiResources.Single().UserClaims.Add(ClaimNames.ClinicId);
    });

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicies();
});

builder.Services.AddAutoMapper(typeof(Program));
AutoMapperConfig.RegisterMappings(typeof(AutoMapperConfig).GetTypeInfo().Assembly);

builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));
var corsSettings = builder.Configuration.GetSection("CorsSettings").Get<CorsSettings>();
if (corsSettings != null)
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificDomains",
            builder => builder.WithOrigins(corsSettings.AllowedDomains.ToArray())
                .AllowAnyMethod()
                .AllowAnyHeader());
    });
}

builder.Services.AddHttpContextAccessor();
builder.Services.AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });
builder.Services.AddRazorPages();

#region Service Registration

builder.Services.AddSingleton<IAuthorizationHandler, RoleAuthorizationHandler>();
builder.Services.AddScoped<UserClaimsPrincipalFactory>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IClinicService, ClinicService>();
builder.Services.AddScoped<IDoctorService, DoctorService>();
builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<IAppointmentTypeService, AppointmentTypeService>();
builder.Services.AddScoped<IEmailService, EmailService>();

#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.UseIdentityServer();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html"); ;

app.Run();
