using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunPowerAPI.DTOs;
using SunPowerAPI.Interfaces;

namespace SunPowerAPI.Controllers;

[ApiController]
[Route("api/auth")]
[Produces("application/json")]
public class AuthController(IAuthService authService) : ControllerBase
{
    // ──────────────────────────────────────────────────
    // POST /api/auth/register
    // ──────────────────────────────────────────────────
    /// <summary>Register a new user account.</summary>
    [HttpPost("register")]
    [ProducesResponseType(typeof(MessageDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(MessageDto), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(MessageDto), StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(new { errors = ModelState });

        var (success, error) = await authService.RegisterAsync(dto);

        if (!success)
        {
            // Email already exists → 409 Conflict
            return Conflict(new MessageDto(error ?? "Registration failed."));
        }

        return StatusCode(StatusCodes.Status201Created,
            new MessageDto("Registration successful."));
    }

    // ──────────────────────────────────────────────────
    // POST /api/auth/login
    // ──────────────────────────────────────────────────
    /// <summary>Authenticate user and receive JWT token.</summary>
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageDto), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(MessageDto), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(new { errors = ModelState });

        var response = await authService.LoginAsync(dto);

        if (response is null)
        {
            // Generic message — do not reveal whether email or password was wrong
            return Unauthorized(new MessageDto("Invalid email or password."));
        }

        return Ok(response);
    }

    // ──────────────────────────────────────────────────
    // GET /api/auth/me   [Authorize]
    // ──────────────────────────────────────────────────
    /// <summary>Get the currently authenticated user's profile.</summary>
    [HttpGet("me")]
    [Authorize]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(MessageDto), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Me()
    {
        // Extract user id from JWT Sub claim — never trust id from query/body
        var sub = User.FindFirstValue(ClaimTypes.NameIdentifier)
               ?? User.FindFirstValue("sub");

        if (sub is null || !int.TryParse(sub, out var userId))
            return Unauthorized(new MessageDto("Invalid token."));

        var user = await authService.GetCurrentUserAsync(userId);

        if (user is null)
            return NotFound(new MessageDto("User not found."));

        return Ok(user);
    }

    // ──────────────────────────────────────────────────
    // POST /api/auth/logout
    // ──────────────────────────────────────────────────
    /// <summary>
    /// Stateless JWT logout — instructs the Frontend to discard the token.
    /// No server-side token blacklist needed for this stage.
    /// </summary>
    [HttpPost("logout")]
    [Authorize]
    [ProducesResponseType(typeof(MessageDto), StatusCodes.Status200OK)]
    public IActionResult Logout()
    {
        // JWT is stateless: the actual invalidation is done on the client.
        // The Frontend should delete the stored token upon receiving this response.
        return Ok(new MessageDto("Logged out successfully."));
    }
}
