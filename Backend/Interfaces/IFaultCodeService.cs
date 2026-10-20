using SunPowerAPI.DTOs;
using SunPowerAPI.Models;

namespace SunPowerAPI.Interfaces;

/// <summary>
/// Service boundary for fault-code diagnosis queries.
/// </summary>
public interface IFaultCodeService
{
    Task<IEnumerable<FaultCodeDto>> GetFaultCodesAsync(string? brand, string? model, string? code, string? type);
    Task<FaultCodeDto?> GetFaultCodeByIdAsync(int id);
    Task<IEnumerable<string>> GetBrandsAsync();
    Task<IEnumerable<string>> GetModelsAsync(string brand);
}
