namespace SunPowerAPI.DTOs;

/// <summary>
/// Safe user representation — never exposes PasswordHash.
/// </summary>
public class UserDto
{
    public int    Id       { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email    { get; set; } = string.Empty;
}
