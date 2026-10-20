using Microsoft.EntityFrameworkCore;
using SunPowerAPI.Models;
using SunPowerAPI.Models.Fault;

namespace SunPowerAPI.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User>     Users     => Set<User>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product>  Products  => Set<Product>();
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Sale>     Sales     => Set<Sale>();
    public DbSet<SaleItem> SaleItems => Set<SaleItem>();

    // ── NEW: Fault Diagnosis Center ───────────────────────────────
    public DbSet<FaultCode> FaultCodes => Set<FaultCode>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ── User ──────────────────────────────────────────────
        modelBuilder.Entity<User>(e =>
        {
            e.HasKey(u => u.Id);
            e.Property(u => u.FullName).IsRequired().HasMaxLength(100);
            e.Property(u => u.Email).IsRequired().HasMaxLength(256);
            e.HasIndex(u => u.Email).IsUnique();
            e.Property(u => u.PasswordHash).IsRequired();
            e.Property(u => u.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            e.Property(u => u.IsActive).HasDefaultValue(true);
        });

        // ── Category ──────────────────────────────────────────
        modelBuilder.Entity<Category>(e =>
        {
            e.HasKey(c => c.Id);
            e.Property(c => c.Name).IsRequired().HasMaxLength(100);
            e.Property(c => c.Description).HasMaxLength(500);
        });

        // ── Product ───────────────────────────────────────────
        modelBuilder.Entity<Product>(e =>
        {
            e.HasKey(p => p.Id);
            e.Property(p => p.Name).IsRequired().HasMaxLength(200);
            e.Property(p => p.Description).HasMaxLength(1000);
            e.Property(p => p.Price).HasColumnType("decimal(18,2)");
            e.Property(p => p.CostPrice).HasColumnType("decimal(18,2)");
            e.Property(p => p.IsActive).HasDefaultValue(true);
            e.Property(p => p.MinimumStock).HasDefaultValue(5);
            e.Property(p => p.CreatedAt).HasDefaultValueSql("GETUTCDATE()");

            // ── Solar system technical specifications (all optional / nullable) ──
            e.Property(p => p.PanelWattage).HasColumnType("int");
            e.Property(p => p.PanelEfficiency).HasColumnType("float");
            e.Property(p => p.PanelNotes).HasMaxLength(1000);

            e.Property(p => p.BatteryNominalVoltage).HasColumnType("int");
            e.Property(p => p.BatteryCapacityAh).HasColumnType("int");
            e.Property(p => p.BatteryEnergyKwh).HasColumnType("float");
            e.Property(p => p.BatteryChemistry).HasMaxLength(50);
            e.Property(p => p.BatteryNotes).HasMaxLength(1000);

            e.Property(p => p.InverterRatedPowerKw).HasColumnType("float");
            e.Property(p => p.InverterPhase).HasMaxLength(10);
            e.Property(p => p.InverterCategory).HasMaxLength(20);
            e.Property(p => p.InverterBatteryVoltageCompatibility).HasColumnType("int");
            e.Property(p => p.InverterPvInputVoltage).HasColumnType("int");
            e.Property(p => p.InverterMaxPvPower).HasColumnType("float");
            e.Property(p => p.InverterMpptVoltage).HasMaxLength(100);
            e.Property(p => p.InverterNotes).HasMaxLength(1000);

            e.HasOne(p => p.Category)
             .WithMany(c => c.Products)
             .HasForeignKey(p => p.CategoryId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ── Customer ──────────────────────────────────────────
        modelBuilder.Entity<Customer>(e =>
        {
            e.HasKey(c => c.Id);
            e.Property(c => c.Name).IsRequired().HasMaxLength(150);
            e.Property(c => c.Phone).HasMaxLength(20);
            e.Property(c => c.Address).HasMaxLength(300);
            e.Property(c => c.Notes).HasMaxLength(500);
            e.Property(c => c.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        // ── Sale ──────────────────────────────────────────────
        modelBuilder.Entity<Sale>(e =>
        {
            e.HasKey(s => s.Id);
            e.Property(s => s.TotalAmount).HasColumnType("decimal(18,2)");
            e.Property(s => s.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            e.HasOne(s => s.Customer)
             .WithMany(c => c.Sales)
             .HasForeignKey(s => s.CustomerId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ── SaleItem ──────────────────────────────────────────
        modelBuilder.Entity<SaleItem>(e =>
        {
            e.HasKey(si => si.Id);
            e.Property(si => si.UnitPrice).HasColumnType("decimal(18,2)");
            e.Property(si => si.TotalPrice).HasColumnType("decimal(18,2)");
            e.HasOne(si => si.Sale)
             .WithMany(s => s.SaleItems)
             .HasForeignKey(si => si.SaleId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(si => si.Product)
             .WithMany(p => p.SaleItems)
             .HasForeignKey(si => si.ProductId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ── Fault Code ────────────────────────────────────────────
        modelBuilder.Entity<FaultCode>(e =>
        {
            e.HasKey(f => f.Id);
            e.Property(f => f.Brand).IsRequired().HasMaxLength(100);
            e.Property(f => f.Model).IsRequired().HasMaxLength(100);
            // String to preserve leading zeros (e.g. "0105", "E0001")
            e.Property(f => f.Code).IsRequired().HasMaxLength(20);
            e.Property(f => f.Type).IsRequired().HasMaxLength(20);
            e.Property(f => f.Description).IsRequired().HasMaxLength(500);
            e.Property(f => f.PossibleCauses).HasMaxLength(1000);
            e.Property(f => f.RecommendedAction).HasMaxLength(1000);
            e.Property(f => f.SafetyWarning).HasMaxLength(1000);
            e.Property(f => f.ManualReference).HasMaxLength(200);
            e.HasIndex(f => f.Code).HasDatabaseName("IX_FaultCode_Code");
            e.HasIndex(f => new { f.Brand, f.Model }).HasDatabaseName("IX_FaultCode_BrandModel");
            e.HasIndex(f => f.Type);
        });
        // ── Seed Data ──
     
modelBuilder.Entity<Category>().HasData(
    new Category { Id = 1, Name = "Solar Panels", Description = "High-efficiency monocrystalline and polycrystalline solar panels" },
    new Category { Id = 2, Name = "Batteries", Description = "Deep cycle and lithium storage batteries" },
    new Category { Id = 3, Name = "Inverters", Description = "Pure sine wave and modified inverters" },
    new Category { Id = 4, Name = "Cables", Description = "Solar cables, connectors, and wiring accessories" },
    new Category { Id = 5, Name = "Accessories", Description = "Charge controllers, mounting, and installation accessories" }
);


        modelBuilder.Entity<Product>().HasData(
            // Solar Panels
            new Product
            {
                Id = 1, Name = "Monocrystalline Panel 400W", Description = "High efficiency 400W mono panel, 22% efficiency",
                CategoryId = 1, Price = 850m, CostPrice = 600m, StockQuantity = 50, MinimumStock = 10, IsActive = true,
                CreatedAt = new DateTime(2026, 1, 1),
                PanelWattage = 400, PanelEfficiency = 22.0, PanelNotes = "22% efficiency monocrystalline cell"
            },
            new Product
            {
                Id = 2, Name = "Polycrystalline Panel 300W", Description = "Reliable 300W poly panel for budget systems",
                CategoryId = 1, Price = 550m, CostPrice = 380m, StockQuantity = 35, MinimumStock = 10, IsActive = true,
                CreatedAt = new DateTime(2026, 1, 1),
                PanelWattage = 300, PanelEfficiency = 18.0, PanelNotes = "18% efficiency polycrystalline cell"
            },
            new Product
            {
                Id = 3, Name = "Monocrystalline Panel 550W", Description = "Premium 550W half-cut cell technology",
                CategoryId = 1, Price = 1100m, CostPrice = 780m, StockQuantity = 20, MinimumStock = 5, IsActive = true,
                CreatedAt = new DateTime(2026, 1, 1),
                PanelWattage = 550, PanelEfficiency = 23.0, PanelNotes = "23% efficiency half-cut mono cell"
            },
            // Batteries
            new Product { Id = 4,  Name = "Lithium Battery 100Ah 48V",   Description = "LiFePO4 battery, 6000+ cycle life",                CategoryId = 2, Price = 2200m, CostPrice = 1600m, StockQuantity = 15, MinimumStock = 3,  IsActive = true, CreatedAt = new DateTime(2026,1,1) },
            new Product { Id = 5,  Name = "AGM Battery 200Ah 12V",       Description = "Maintenance-free deep cycle AGM battery",           CategoryId = 2, Price = 950m,  CostPrice = 680m,  StockQuantity = 25, MinimumStock = 5,  IsActive = true, CreatedAt = new DateTime(2026,1,1) },
            new Product { Id = 6,  Name = "Lithium Battery 200Ah 24V",   Description = "Compact lithium pack for mid-size systems",         CategoryId = 2, Price = 3100m, CostPrice = 2200m, StockQuantity = 4,  MinimumStock = 3,  IsActive = true, CreatedAt = new DateTime(2026,1,1) },
            // Inverters
            new Product { Id = 7,  Name = "Hybrid Inverter 5KW",         Description = "MPPT hybrid inverter with WiFi monitoring",         CategoryId = 3, Price = 3500m, CostPrice = 2500m, StockQuantity = 10, MinimumStock = 3,  IsActive = true, CreatedAt = new DateTime(2026,1,1) },
            new Product { Id = 8,  Name = "Pure Sine Inverter 3KW",      Description = "Pure sine wave off-grid inverter",                  CategoryId = 3, Price = 1800m, CostPrice = 1200m, StockQuantity = 8,  MinimumStock = 3,  IsActive = true, CreatedAt = new DateTime(2026,1,1) },
            new Product { Id = 9,  Name = "Micro Inverter 600W",         Description = "Panel-level micro inverter for grid-tie systems",   CategoryId = 3, Price = 750m,  CostPrice = 520m,  StockQuantity = 2,  MinimumStock = 5,  IsActive = true, CreatedAt = new DateTime(2026,1,1) },
            // Cables
            new Product { Id = 10, Name = "Solar Cable 6mm² (50m)",      Description = "UV-resistant double insulated solar cable",         CategoryId = 4, Price = 280m,  CostPrice = 180m,  StockQuantity = 60, MinimumStock = 15, IsActive = true, CreatedAt = new DateTime(2026,1,1) },
            new Product { Id = 11, Name = "MC4 Connector Pair (10pcs)",  Description = "Waterproof MC4 solar connectors",                  CategoryId = 4, Price = 45m,   CostPrice = 25m,   StockQuantity = 0,  MinimumStock = 20, IsActive = true, CreatedAt = new DateTime(2026,1,1) },
            // Accessories
            new Product { Id = 12, Name = "MPPT Charge Controller 60A",  Description = "60A MPPT solar charge controller with LCD",        CategoryId = 5, Price = 620m,  CostPrice = 420m,  StockQuantity = 18, MinimumStock = 5,  IsActive = true, CreatedAt = new DateTime(2026,1,1) },
            new Product { Id = 13, Name = "Mounting Rail Kit (4m)",      Description = "Aluminum mounting rails for rooftop installation",  CategoryId = 5, Price = 320m,  CostPrice = 200m,  StockQuantity = 30, MinimumStock = 10, IsActive = true, CreatedAt = new DateTime(2026,1,1) }
        );

        modelBuilder.Entity<Customer>().HasData(
            new Customer { Id = 1, Name = "أحمد محمد الزهراني",  Phone = "+966501234567", Address = "الرياض، حي النزهة", Notes = "عميل منتظم، يفضل التواصل عبر الواتساب", CreatedAt = new DateTime(2026,1,5) },
            new Customer { Id = 2, Name = "شركة الفجر للمقاولات", Phone = "+966112345678", Address = "جدة، طريق الملك فهد",  Notes = "مشاريع تجارية كبيرة",                    CreatedAt = new DateTime(2026,1,10) },
            new Customer { Id = 3, Name = "خالد عبدالله العتيبي",  Phone = "+966553456789", Address = "الدمام، حي الفيصلية", Notes = "",                                        CreatedAt = new DateTime(2026,2,1) },
            new Customer { Id = 4, Name = "مزرعة النخيل الذهبية",  Phone = "+966504567890", Address = "القصيم، بريدة",        Notes = "نظام طاقة شمسية زراعي",                  CreatedAt = new DateTime(2026,2,15) },
            new Customer { Id = 5, Name = "سارة يوسف القحطاني",   Phone = "+966567890123", Address = "مكة المكرمة، العزيزية", Notes = "مشروع سكني منزلي",                       CreatedAt = new DateTime(2026,3,1) }
        );
    }
}


