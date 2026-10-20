namespace SunPowerAPI.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    // ── Category ──────────────────────────────────────────────────────────
    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    // ── Pricing / stock ───────────────────────────────────────────────────
    public decimal Price { get; set; }
    public decimal CostPrice { get; set; }
    public int StockQuantity { get; set; }
    public int MinimumStock { get; set; } = 5;
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // ── Solar system technical specifications (nullable — optional data) ──
    // Panel
    public int? PanelWattage { get; set; }                       // W peak
    public double? PanelEfficiency { get; set; }                  // % (optional)
    public string? PanelNotes { get; set; }

    // Battery
    public int? BatteryNominalVoltage { get; set; }              // V
    public int? BatteryCapacityAh { get; set; }                  // Ah
    public double? BatteryEnergyKwh { get; set; }                 // kWh (optional)
    public string? BatteryChemistry { get; set; }                // e.g. LiFePO4, AGM
    public string? BatteryNotes { get; set; }

    // Inverter
    public double? InverterRatedPowerKw { get; set; }            // kW
    public string? InverterPhase { get; set; }                   // 1, 2, 3
    public string? InverterCategory { get; set; }                // hybrid / off-grid / on-grid
    public int? InverterBatteryVoltageCompatibility { get; set; }// V
    public int? InverterPvInputVoltage { get; set; }             // V DC max
    public double? InverterMaxPvPower { get; set; }               // W max PV input
    public string? InverterMpptVoltage { get; set; }             // MPPT voltage range (free-form)
    public string? InverterNotes { get; set; }

    // ── Navigation ────────────────────────────────────────────────────────
    public ICollection<SaleItem> SaleItems { get; set; } = new List<SaleItem>();
}
