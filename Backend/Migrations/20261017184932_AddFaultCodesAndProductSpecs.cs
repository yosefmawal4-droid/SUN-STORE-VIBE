using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SunPowerAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddFaultCodesAndProductSpecs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BatteryCapacityAh",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BatteryChemistry",
                table: "Products",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "BatteryEnergyKwh",
                table: "Products",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BatteryNominalVoltage",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BatteryNotes",
                table: "Products",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InverterBatteryVoltageCompatibility",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InverterCategory",
                table: "Products",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "InverterMaxPvPower",
                table: "Products",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InverterMpptVoltage",
                table: "Products",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InverterNotes",
                table: "Products",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InverterPhase",
                table: "Products",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InverterPvInputVoltage",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "InverterRatedPowerKw",
                table: "Products",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "PanelEfficiency",
                table: "Products",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PanelNotes",
                table: "Products",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PanelWattage",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FaultCodes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Brand = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Model = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    PossibleCauses = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    RecommendedAction = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    SafetyWarning = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ManualReference = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Verified = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FaultCodes", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, 22.0, "22% efficiency monocrystalline cell", 400 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, 18.0, "18% efficiency polycrystalline cell", 300 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, 23.0, "23% efficiency half-cut mono cell", 550 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                columns: new[] { "BatteryCapacityAh", "BatteryChemistry", "BatteryEnergyKwh", "BatteryNominalVoltage", "BatteryNotes", "InverterBatteryVoltageCompatibility", "InverterCategory", "InverterMaxPvPower", "InverterMpptVoltage", "InverterNotes", "InverterPhase", "InverterPvInputVoltage", "InverterRatedPowerKw", "PanelEfficiency", "PanelNotes", "PanelWattage" },
                values: new object[] { null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null });

            migrationBuilder.CreateIndex(
                name: "IX_FaultCode_BrandModel",
                table: "FaultCodes",
                columns: new[] { "Brand", "Model" });

            migrationBuilder.CreateIndex(
                name: "IX_FaultCode_Code",
                table: "FaultCodes",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_FaultCodes_Type",
                table: "FaultCodes",
                column: "Type");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FaultCodes");

            migrationBuilder.DropColumn(
                name: "BatteryCapacityAh",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "BatteryChemistry",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "BatteryEnergyKwh",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "BatteryNominalVoltage",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "BatteryNotes",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "InverterBatteryVoltageCompatibility",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "InverterCategory",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "InverterMaxPvPower",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "InverterMpptVoltage",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "InverterNotes",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "InverterPhase",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "InverterPvInputVoltage",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "InverterRatedPowerKw",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PanelEfficiency",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PanelNotes",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PanelWattage",
                table: "Products");
        }
    }
}
