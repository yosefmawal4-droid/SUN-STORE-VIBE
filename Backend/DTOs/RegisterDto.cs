using System.ComponentModel.DataAnnotations;

namespace SunPowerAPI.DTOs;

public class RegisterDto
{
    [Required(ErrorMessage = "FullName is required.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "FullName must be between 2 and 100 characters.")]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required.")]
    [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters.")]
    [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$",
        ErrorMessage = "Password must contain uppercase, lowercase, digit, and special character.")]
    public string Password { get; set; } = string.Empty;
}
