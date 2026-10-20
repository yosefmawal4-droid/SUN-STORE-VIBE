using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SunPowerAPI.Data;
using SunPowerAPI.Interfaces;
using SunPowerAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// ═══════════════════════════════════════════════════════
// 1. Database — Entity Framework Core + SQL Server
// ═══════════════════════════════════════════════════════
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// ═══════════════════════════════════════════════════════
// 2. DI — Services
// ═══════════════════════════════════════════════════════
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<
    SunPowerAPI.Interfaces.IFaultCodeService,
    SunPowerAPI.Services.FaultCodeService>();

// ═══════════════════════════════════════════════════════
// 3. JWT Authentication
// ═══════════════════════════════════════════════════════
var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtKey     = jwtSection["Key"]!;

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme    = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer           = true,
            ValidateAudience         = true,
            ValidateLifetime         = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer              = jwtSection["Issuer"],
            ValidAudience            = jwtSection["Audience"],
            IssuerSigningKey         = new SymmetricSecurityKey(
                                           Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew                = TimeSpan.Zero,
        };
    });

builder.Services.AddAuthorization();

// ═══════════════════════════════════════════════════════
// 4. CORS — allow Expo / React Native dev origins
// ═══════════════════════════════════════════════════════
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? [];

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
        policy.AllowAnyOrigin()   // Expo Go uses dynamic IPs
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// ═══════════════════════════════════════════════════════
// 5. Controllers
// ═══════════════════════════════════════════════════════
builder.Services.AddControllers();

// ═══════════════════════════════════════════════════════
// 6. Swagger / OpenAPI — with JWT Bearer support
// ═══════════════════════════════════════════════════════
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title       = "SunPower API",
        Version     = "v1",
        Description = "Authentication API for SunPower mobile app",
    });

    // JWT Bearer button in Swagger UI
    var securityScheme = new OpenApiSecurityScheme
    {
        Name         = "Authorization",
        Description  = "Enter: Bearer {your_token}",
        In           = ParameterLocation.Header,
        Type         = SecuritySchemeType.Http,
        Scheme       = "bearer",
        BearerFormat = "JWT",
        Reference    = new OpenApiReference
        {
            Id   = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme,
        },
    };

    options.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { securityScheme, Array.Empty<string>() }
    });
});

// ═══════════════════════════════════════════════════════
// Build
// ═══════════════════════════════════════════════════════
var app = builder.Build();

// ═══════════════════════════════════════════════════════
// 7. Middleware pipeline — ORDER MATTERS
// ═══════════════════════════════════════════════════════
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SunPower API v1");
        c.RoutePrefix = "swagger";
    });
}

// Global exception handler — never expose stack traces
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode  = 500;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(
            new { message = "An unexpected error occurred." });
    });
});

app.UseCors("FrontendPolicy");        // CORS before auth
app.UseAuthentication();              // must come before UseAuthorization
app.UseAuthorization();

app.MapControllers();

// ═══════════════════════════════════════════════════════
// 8. Auto-apply migrations on startup (dev convenience)
// ═══════════════════════════════════════════════════════
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (app.Environment.IsDevelopment())
        await db.Database.MigrateAsync();

    var seedCodes = SunPowerAPI.Seed.FaultCodeSeedData.GetFaultCodes();

    foreach (var item in seedCodes)
    {
        var exists = await db.FaultCodes.AnyAsync(f =>
            f.Brand == item.Brand &&
            f.Model == item.Model &&
            f.Code == item.Code);

        if (!exists)
            db.FaultCodes.Add(item);
    }

    await db.SaveChangesAsync();
}

app.Run();