using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SunPowerAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddStoreEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CostPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    StockQuantity = table.Column<int>(type: "int", nullable: false),
                    MinimumStock = table.Column<int>(type: "int", nullable: false, defaultValue: 5),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sales_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SaleItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SaleId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SaleItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SaleItems_Sales_SaleId",
                        column: x => x.SaleId,
                        principalTable: "Sales",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "High-efficiency monocrystalline and polycrystalline solar panels", "Solar Panels" },
                    { 2, "Deep cycle and lithium storage batteries", "Batteries" },
                    { 3, "Pure sine wave and modified inverters", "Inverters" },
                    { 4, "Solar cables, connectors, and wiring accessories", "Cables" },
                    { 5, "Charge controllers, mounting, and installation accessories", "Accessories" }
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "Address", "CreatedAt", "Name", "Notes", "Phone" },
                values: new object[,]
                {
                    { 1, "الرياض، حي النزهة", new DateTime(2026, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "أحمد محمد الزهراني", "عميل منتظم، يفضل التواصل عبر الواتساب", "+966501234567" },
                    { 2, "جدة، طريق الملك فهد", new DateTime(2026, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "شركة الفجر للمقاولات", "مشاريع تجارية كبيرة", "+966112345678" },
                    { 3, "الدمام، حي الفيصلية", new DateTime(2026, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "خالد عبدالله العتيبي", "", "+966553456789" },
                    { 4, "القصيم، بريدة", new DateTime(2026, 2, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "مزرعة النخيل الذهبية", "نظام طاقة شمسية زراعي", "+966504567890" },
                    { 5, "مكة المكرمة، العزيزية", new DateTime(2026, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "سارة يوسف القحطاني", "مشروع سكني منزلي", "+966567890123" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "CostPrice", "CreatedAt", "Description", "ImageUrl", "IsActive", "MinimumStock", "Name", "Price", "StockQuantity" },
                values: new object[,]
                {
                    { 1, 1, 600m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "High efficiency 400W mono panel, 22% efficiency", null, true, 10, "Monocrystalline Panel 400W", 850m, 50 },
                    { 2, 1, 380m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Reliable 300W poly panel for budget systems", null, true, 10, "Polycrystalline Panel 300W", 550m, 35 },
                    { 3, 1, 780m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Premium 550W half-cut cell technology", null, true, 5, "Monocrystalline Panel 550W", 1100m, 20 },
                    { 4, 2, 1600m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "LiFePO4 battery, 6000+ cycle life", null, true, 3, "Lithium Battery 100Ah 48V", 2200m, 15 },
                    { 5, 2, 680m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Maintenance-free deep cycle AGM battery", null, true, 5, "AGM Battery 200Ah 12V", 950m, 25 },
                    { 6, 2, 2200m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Compact lithium pack for mid-size systems", null, true, 3, "Lithium Battery 200Ah 24V", 3100m, 4 },
                    { 7, 3, 2500m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "MPPT hybrid inverter with WiFi monitoring", null, true, 3, "Hybrid Inverter 5KW", 3500m, 10 },
                    { 8, 3, 1200m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Pure sine wave off-grid inverter", null, true, 3, "Pure Sine Inverter 3KW", 1800m, 8 },
                    { 9, 3, 520m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Panel-level micro inverter for grid-tie systems", null, true, 5, "Micro Inverter 600W", 750m, 2 },
                    { 10, 4, 180m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "UV-resistant double insulated solar cable", null, true, 15, "Solar Cable 6mm² (50m)", 280m, 60 },
                    { 11, 4, 25m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Waterproof MC4 solar connectors", null, true, 20, "MC4 Connector Pair (10pcs)", 45m, 0 },
                    { 12, 5, 420m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "60A MPPT solar charge controller with LCD", null, true, 5, "MPPT Charge Controller 60A", 620m, 18 },
                    { 13, 5, 200m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Aluminum mounting rails for rooftop installation", null, true, 10, "Mounting Rail Kit (4m)", 320m, 30 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleItems_ProductId",
                table: "SaleItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleItems_SaleId",
                table: "SaleItems",
                column: "SaleId");

            migrationBuilder.CreateIndex(
                name: "IX_Sales_CustomerId",
                table: "Sales",
                column: "CustomerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SaleItems");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Sales");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}
