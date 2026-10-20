namespace SunPowerAPI.Models.Fault;

/// <summary>
/// Represents a manufacturer fault or warning code for a specific inverter brand/model.
/// The Code is stored as a string to preserve leading zeros (e.g., "0105", "E0001").
/// </summary>
public class FaultCode
{
    public int Id { get; set; }

    /// <summary>Inverter brand (e.g. "SUNON").</summary>
    public string Brand { get; set; } = string.Empty;

    /// <summary>Inverter model (e.g. "ECO-4.2KW" / "ECO-6.2KW").</summary>
    public string Model { get; set; } = string.Empty;

    /// <summary>Manufacturer fault/warning code. Stored as string to preserve leading zeros.</summary>
    public string Code { get; set; } = string.Empty;

    /// <summary>Whether the record is a fault error or a non-critical warning.</summary>
    public string Type { get; set; } = string.Empty;

    /// <summary>Human-readable description of the code.</summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>Possible root causes / triggering conditions.</summary>
    public string? PossibleCauses { get; set; }

    /// <summary>Recommended action / next step.</summary>
    public string? RecommendedAction { get; set; }

    /// <summary>Safety warning for technicians working on the unit.</summary>
    public string? SafetyWarning { get; set; }

    /// <summary>Manufacturer source / manual reference for verification.</summary>
    public string? ManualReference { get; set; }

    /// <summary>Data-quality flag: true if code semantics are manufacturer-verified.</summary>
    public bool Verified { get; set; }
}
