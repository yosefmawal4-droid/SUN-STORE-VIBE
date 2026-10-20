using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SunPowerAPI.Data;
using SunPowerAPI.DTOs;

namespace SunPowerAPI.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize]
[Produces("application/json")]
public class DashboardController(AppDbContext db) : ControllerBase
{
    // GET /api/dashboard
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var products  = await db.Products.Where(p => p.IsActive).ToListAsync();
        var customers = await db.Customers.CountAsync();
        var sales     = await db.Sales.ToListAsync();

        var totalRevenue        = sales.Sum(s => s.TotalAmount);
        var totalInventoryValue = products.Sum(p => p.Price * p.StockQuantity);

        var lowStock = products
            .Where(p => p.StockQuantity > 0 && p.StockQuantity <= p.MinimumStock)
            .Select(p => new LowStockProductDto
            {
                Id            = p.Id,
                Name          = p.Name,
                StockQuantity = p.StockQuantity,
                MinimumStock  = p.MinimumStock,
                Status        = "LOW_STOCK",
            })
            .ToList();

        var outOfStock = products
            .Where(p => p.StockQuantity == 0)
            .Select(p => new LowStockProductDto
            {
                Id            = p.Id,
                Name          = p.Name,
                StockQuantity = p.StockQuantity,
                MinimumStock  = p.MinimumStock,
                Status        = "OUT_OF_STOCK",
            })
            .ToList();

        var allAlerts = outOfStock.Concat(lowStock).ToList();

        var recentSales = await db.Sales
            .Include(s => s.Customer)
            .OrderByDescending(s => s.CreatedAt)
            .Take(5)
            .Select(s => new RecentSaleDto
            {
                Id           = s.Id,
                CustomerName = s.Customer != null ? s.Customer.Name : "Unknown",
                TotalAmount  = s.TotalAmount,
                CreatedAt    = s.CreatedAt,
            })
            .ToListAsync();

        return Ok(new DashboardDto
        {
            TotalProducts       = products.Count,
            TotalCustomers      = customers,
            TotalSales          = sales.Count,
            TotalRevenue        = totalRevenue,
            TotalInventoryValue = totalInventoryValue,
            LowStockCount       = lowStock.Count,
            OutOfStockCount     = outOfStock.Count,
            LowStockProducts    = allAlerts,
            RecentSales         = recentSales,
        });
    }
}
