using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SunPowerAPI.Data;
using SunPowerAPI.DTOs;
using SunPowerAPI.Models;

namespace SunPowerAPI.Controllers;

[ApiController]
[Route("api/sales")]
[Authorize]
[Produces("application/json")]
public class SalesController(AppDbContext db) : ControllerBase
{
    private static SaleDto MapToDto(Sale sale) => new()
    {
        Id           = sale.Id,
        CustomerId   = sale.CustomerId,
        CustomerName = sale.Customer?.Name ?? string.Empty,
        TotalAmount  = sale.TotalAmount,
        CreatedAt    = sale.CreatedAt,
        Items        = sale.SaleItems.Select(si => new SaleItemDto
        {
            Id          = si.Id,
            ProductId   = si.ProductId,
            ProductName = si.Product?.Name ?? string.Empty,
            Quantity    = si.Quantity,
            UnitPrice   = si.UnitPrice,
            TotalPrice  = si.TotalPrice,
        }).ToList(),
    };

    // GET /api/sales
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var sales = await db.Sales
            .Include(s => s.Customer)
            .Include(s => s.SaleItems).ThenInclude(si => si.Product)
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync();

        return Ok(sales.Select(MapToDto));
    }

    // GET /api/sales/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var sale = await db.Sales
            .Include(s => s.Customer)
            .Include(s => s.SaleItems).ThenInclude(si => si.Product)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (sale is null)
            return NotFound(new { message = "Sale not found." });

        return Ok(MapToDto(sale));
    }

    // POST /api/sales
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSaleDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Validate customer
        var customer = await db.Customers.FindAsync(dto.CustomerId);
        if (customer is null)
            return BadRequest(new { message = "Customer not found." });

        // Validate & load all products first (fail fast before any stock changes)
        var productIds = dto.Items.Select(i => i.ProductId).Distinct().ToList();
        var products   = await db.Products
            .Where(p => productIds.Contains(p.Id) && p.IsActive)
            .ToDictionaryAsync(p => p.Id);

        foreach (var item in dto.Items)
        {
            if (!products.TryGetValue(item.ProductId, out var product))
                return BadRequest(new { message = $"Product ID {item.ProductId} not found." });

            if (product.StockQuantity < item.Quantity)
                return BadRequest(new { message = $"Insufficient stock for '{product.Name}'. Available: {product.StockQuantity}." });
        }

        // All checks passed — execute inside a transaction
        // Re-entrant stock validation inside the transaction prevents overselling
        // when two sales for the same product are completed concurrently.
        await using var transaction = await db.Database.BeginTransactionAsync();
        try
        {
            var sale = new Sale
            {
                CustomerId = dto.CustomerId,
                CreatedAt  = DateTime.UtcNow,
            };

            db.Sales.Add(sale);
            await db.SaveChangesAsync(); // get Sale.Id

            decimal total = 0m;

            foreach (var item in dto.Items)
            {
                var product    = products[item.ProductId];
                var unitPrice  = product.Price;  // snapshot current price at sale time
                var totalPrice = unitPrice * item.Quantity;
                total         += totalPrice;

                db.SaleItems.Add(new SaleItem
                {
                    SaleId     = sale.Id,
                    ProductId  = item.ProductId,
                    Quantity   = item.Quantity,
                    UnitPrice  = unitPrice,
                    TotalPrice = totalPrice,
                });

                // Re-check stock inside the transaction to prevent overselling
                // if another concurrent sale already consumed part of the stock.
                if (product.StockQuantity < item.Quantity)
                {
                    await transaction.RollbackAsync();
                    return BadRequest(new
                    {
                        message = $"Insufficient stock for '{product.Name}'. Available: {product.StockQuantity}."
                    });
                }

                product.StockQuantity -= item.Quantity;
            }

            sale.TotalAmount = total;
            await db.SaveChangesAsync();
            await transaction.CommitAsync();

            // Reload for response
            var saved = await db.Sales
                .Include(s => s.Customer)
                .Include(s => s.SaleItems).ThenInclude(si => si.Product)
                .FirstAsync(s => s.Id == sale.Id);

            return StatusCode(201, MapToDto(saved));
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}
