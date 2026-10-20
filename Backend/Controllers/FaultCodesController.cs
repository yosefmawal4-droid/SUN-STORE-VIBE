using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SunPowerAPI.Data;
using SunPowerAPI.DTOs;
using SunPowerAPI.Interfaces;

namespace SunPowerAPI.Controllers;

/// <summary>
/// Fault Diagnosis Center API.
/// Provides manufacturer fault/warning code lookup by brand, model, code, and type.
/// </summary>
[ApiController]
[Route("api/faultcodes")]
[Produces("application/json")]
public class FaultCodesController(AppDbContext db, IFaultCodeService faultCodeService) : ControllerBase
{
    // GET /api/faultcodes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<FaultCodeDto>>> Get(
        [FromQuery] string? brand,
        [FromQuery] string? model,
        [FromQuery] string? code,
        [FromQuery] string? type)
    {
        var records = await faultCodeService.GetFaultCodesAsync(brand, model, code, type);
        return Ok(records);
    }

    // GET /api/faultcodes/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<FaultCodeDto>> GetById(int id)
    {
        var record = await faultCodeService.GetFaultCodeByIdAsync(id);
        if (record is null)
            return NotFound(new { message = "Fault code not found." });

        return Ok(record);
    }

    // GET /api/faultcodes/brands
    [HttpGet("brands")]
    public async Task<ActionResult<IEnumerable<string>>> GetBrands()
    {
        var brands = await faultCodeService.GetBrandsAsync();
        return Ok(brands);
    }

    // GET /api/faultcodes/models?brand=SUNON
    [HttpGet("models")]
    public async Task<ActionResult<IEnumerable<string>>> GetModels([FromQuery] string? brand)
    {
        if (string.IsNullOrWhiteSpace(brand))
            return BadRequest(new { message = "brand query parameter is required." });

        var models = await faultCodeService.GetModelsAsync(brand);
        return Ok(models);
    }
}
