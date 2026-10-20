namespace SunPowerAPI.DTOs;

public class DashboardDto
{
    public int TotalProducts { get; set; }
    public int TotalCustomers { get; set; }
    public int TotalSales { get; set; }
    public decimal TotalRevenue { get; set; }
    public decimal TotalInventoryValue { get; set; }
    public int LowStockCount { get; set; }
    public int OutOfStockCount { get; set; }
    public List<LowStockProductDto> LowStockProducts { get; set; } = new();
    public List<RecentSaleDto> RecentSales { get; set; } = new();
}

public class LowStockProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int StockQuantity { get; set; }
    public int MinimumStock { get; set; }
    public string Status { get; set; } = string.Empty;
}

public class RecentSaleDto
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; }
}
