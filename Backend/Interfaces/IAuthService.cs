using SunPowerAPI.DTOs;

namespace SunPowerAPI.Interfaces;

public interface IAuthService
{
    /// <summary>Register a new user. Returns null if email already exists.</summary>
    Task<(bool Success, string? Error)> RegisterAsync(RegisterDto dto);

    /// <summary>Validate credentials and return JWT + user info. Returns null on failure.</summary>
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);

    /// <summary>Get safe user info by id extracted from JWT claims.</summary>
    Task<UserDto?> GetCurrentUserAsync(int userId);
}
