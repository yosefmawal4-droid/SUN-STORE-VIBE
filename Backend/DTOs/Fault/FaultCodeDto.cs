using System.ComponentModel.DataAnnotations;

namespace SunPowerAPI.DTOs;

/// <summary>
/// Public contract for the fault-code diagnosis feature.
/// </summary>
public class FaultCodeDto
{
    public int Id { get; set; }

    /// <summary>Inverter brand (e.g. "SUNON").</summary>
    [Required]
    [MaxLength(100)]
    public string Brand { get; set; } = string.Empty;

    /// <summary>Inverter model (e.g. "ECO-4.2KW" / "ECO-6.2KW").</summary>
    [Required]
    [MaxLength(100)]
    public string Model { get; set; } = string.Empty;

    /// <summary>Manufacturer fault/warning code. String to preserve leading zeros.</summary>
    [Required]
    [MaxLength(20)]
    public string Code { get; set; } = string.Empty;

    /// <summary>Whether the record is a fault error or a non-critical warning.</summary>
    [Required]
    [MaxLength(20)]
    public string Type { get; set; } = string.Empty;

    /// <summary>Human-readable description of the code.</summary>
    [Required]
    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    /// <summary>Possible root causes / triggering conditions.</summary>
    [MaxLength(1000)]
    public string? PossibleCauses { get; set; }

    /// <summary>Recommended action / next step.</summary>
    [MaxLength(1000)]
    public string? RecommendedAction { get; set; }

    /// <summary>Safety warning for technicians working on the unit.</summary>
    [MaxLength(1000)]
    public string? SafetyWarning { get; set; }

    /// <summary>Manufacturer source / manual reference for verification.</summary>
    [MaxLength(200)]
    public string? ManualReference { get; set; }

    /// <summary>Data-quality flag: true if code semantics are manufacturer-verified.</summary>
    public bool Verified { get; set; }
}
