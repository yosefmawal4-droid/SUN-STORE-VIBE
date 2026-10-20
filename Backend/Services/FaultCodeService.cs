
using Microsoft.EntityFrameworkCore;
using SunPowerAPI.Data;
using SunPowerAPI.DTOs;
using SunPowerAPI.Interfaces;
using SunPowerAPI.Models;

namespace SunPowerAPI.Services;

public class FaultCodeService(AppDbContext db) : IFaultCodeService
{
    public async Task<IEnumerable<FaultCodeDto>> GetFaultCodesAsync(
        string? brand, string? model, string? code, string? type)
    {
        var query = db.FaultCodes.AsQueryable();

        if (!string.IsNullOrWhiteSpace(brand))
        {
            var value = brand.Trim();
            query = query.Where(f => f.Brand == value);
        }

        if (!string.IsNullOrWhiteSpace(model))
        {
            var value = model.Trim();
            query = query.Where(f => f.Model == value);
        }

        if (!string.IsNullOrWhiteSpace(code))
        {
            var value = code.Trim();
            query = query.Where(f => f.Code == value);
        }

        if (!string.IsNullOrWhiteSpace(type))
        {
            var value = type.Trim();
            query = query.Where(f => f.Type == value);
        }

        return await query
            .OrderByDescending(f => f.Verified)
            .ThenBy(f => f.Brand)
            .ThenBy(f => f.Model)
            .ThenBy(f => f.Code)
            .Select(f => new FaultCodeDto
            {
                Id = f.Id,
                Brand = f.Brand,
                Model = f.Model,
                Code = f.Code,
                Type = f.Type,
                Description = f.Description,
                PossibleCauses = f.PossibleCauses,
                RecommendedAction = f.RecommendedAction,
                SafetyWarning = f.SafetyWarning,
                ManualReference = f.ManualReference,
                Verified = f.Verified,
            })
            .ToListAsync();
    }

    public async Task<FaultCodeDto?> GetFaultCodeByIdAsync(int id)
    {
        return await db.FaultCodes
            .Where(f => f.Id == id)
            .Select(f => new FaultCodeDto
            {
                Id = f.Id,
                Brand = f.Brand,
                Model = f.Model,
                Code = f.Code,
                Type = f.Type,
                Description = f.Description,
                PossibleCauses = f.PossibleCauses,
                RecommendedAction = f.RecommendedAction,
                SafetyWarning = f.SafetyWarning,
                ManualReference = f.ManualReference,
                Verified = f.Verified,
            })
            .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<string>> GetBrandsAsync()
    {
        return await db.FaultCodes
            .Select(f => f.Brand)
            .Where(b => !string.IsNullOrWhiteSpace(b))
            .Distinct()
            .OrderBy(b => b)
            .ToListAsync();
    }

    public async Task<IEnumerable<string>> GetModelsAsync(string brand)
    {
        var normalizedBrand = brand.Trim();

        return await db.FaultCodes
            .Where(f => f.Brand == normalizedBrand)
            .Select(f => f.Model)
            .Where(m => !string.IsNullOrWhiteSpace(m))
            .Distinct()
            .OrderBy(m => m)
            .ToListAsync();
    }
}
