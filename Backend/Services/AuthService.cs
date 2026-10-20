using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SunPowerAPI.Data;
using SunPowerAPI.DTOs;
using SunPowerAPI.Interfaces;
using SunPowerAPI.Models;

namespace SunPowerAPI.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;
    private readonly PasswordHasher<User> _hasher = new();

    public AuthService(AppDbContext db, IConfiguration config)
    {
        _db     = db;
        _config = config;
    }

    // ──────────────────────────────────────────────────
    // Register
    // ──────────────────────────────────────────────────
    public async Task<(bool Success, string? Error)> RegisterAsync(RegisterDto dto)
    {
        // Check duplicate email (case-insensitive)
        bool emailExists = await _db.Users
            .AnyAsync(u => u.Email.ToLower() == dto.Email.ToLower());

        if (emailExists)
            return (false, "Email already exists.");

        var user = new User
        {
            FullName  = dto.FullName.Trim(),
            Email     = dto.Email.Trim().ToLower(),
            CreatedAt = DateTime.UtcNow,
            IsActive  = true,
        };

        // Hash password using ASP.NET Core PasswordHasher — never store plain text
        user.PasswordHash = _hasher.HashPassword(user, dto.Password);

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return (true, null);
    }

    // ──────────────────────────────────────────────────
    // Login
    // ──────────────────────────────────────────────────
    public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
    {
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email.Trim().ToLower());

        // Return same generic error whether user not found or password wrong
        // to avoid leaking which emails are registered
        if (user is null || !user.IsActive)
            return null;

        var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
        if (result == PasswordVerificationResult.Failed)
            return null;

        var token = GenerateJwt(user);

        return new AuthResponseDto
        {
            Token = token,
            User  = MapToDto(user),
        };
    }

    // ──────────────────────────────────────────────────
    // Current User
    // ──────────────────────────────────────────────────
    public async Task<UserDto?> GetCurrentUserAsync(int userId)
    {
        var user = await _db.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == userId && u.IsActive);

        return user is null ? null : MapToDto(user);
    }

    // ──────────────────────────────────────────────────
    // Private helpers
    // ──────────────────────────────────────────────────
    private string GenerateJwt(User user)
    {
        var jwtSection = _config.GetSection("Jwt");

        var key     = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSection["Key"]!));
        var creds   = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddMinutes(
            double.Parse(jwtSection["ExpiresInMinutes"] ?? "60"));

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub,   user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Name,  user.FullName),
            new Claim(JwtRegisteredClaimNames.Jti,   Guid.NewGuid().ToString()),
        };

        var token = new JwtSecurityToken(
            issuer:             jwtSection["Issuer"],
            audience:           jwtSection["Audience"],
            claims:             claims,
            expires:            expires,
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static UserDto MapToDto(User user) => new()
    {
        Id       = user.Id,
        FullName = user.FullName,
        Email    = user.Email,
    };
}
