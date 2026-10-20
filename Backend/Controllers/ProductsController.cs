using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SunPowerAPI.Data;
using SunPowerAPI.DTOs;
using SunPowerAPI.Models;

namespace SunPowerAPI.Controllers;

[ApiController]
[Route("api/products")]
[Authorize]
[Produces("application/json")]
public class ProductsController(AppDbContext db) : ControllerBase
{
    private static string GetStockStatus(Product p) =>
        p.StockQuantity == 0
            ? "OUT_OF_STOCK"
            : p.StockQuantity <= p.MinimumStock
                ? "LOW_STOCK"
                : "IN_STOCK";

    private static ProductDto MapToDto(Product p) => new()
    {
        Id            = p.Id,
        Name          = p.Name,
        Description   = p.Description,
        CategoryId    = p.CategoryId,
        CategoryName  = p.Category?.Name ?? string.Empty,
        Price         = p.Price,
        CostPrice     = p.CostPrice,
        StockQuantity = p.StockQuantity,
        MinimumStock  = p.MinimumStock,
        ImageUrl      = p.ImageUrl,
        IsActive      = p.IsActive,
        CreatedAt     = p.CreatedAt,
        StockStatus   = GetStockStatus(p),
    };

    // GET /api/products
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] int? categoryId)
    {
        var query = db.Products
            .Include(p => p.Category)
            .Where(p => p.IsActive);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.Name.Contains(search) || (p.Description != null && p.Description.Contains(search)));

        if (categoryId.HasValue)
            query = query.Where(p => p.CategoryId == categoryId.Value);

        var products = await query.OrderBy(p => p.Name).ToListAsync();
        return Ok(products.Select(MapToDto));
    }

    // GET /api/products/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await db.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product is null)
            return NotFound(new { message = "Product not found." });

        return Ok(MapToDto(product));
    }

    // POST /api/products
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var categoryExists = await db.Categories.AnyAsync(c => c.Id == dto.CategoryId);
        if (!categoryExists)
            return BadRequest(new { message = "Invalid category." });

        var product = new Product
        {
            Name          = dto.Name.Trim(),
            Description   = dto.Description?.Trim(),
            CategoryId    = dto.CategoryId,
            Price         = dto.Price,
            CostPrice     = dto.CostPrice,
            StockQuantity = dto.StockQuantity,
            MinimumStock  = dto.MinimumStock,
            ImageUrl      = dto.ImageUrl,
            IsActive      = dto.IsActive,
            CreatedAt     = DateTime.UtcNow,
        };

        db.Products.Add(product);
        await db.SaveChangesAsync();

        // Reload with category
        await db.Entry(product).Reference(p => p.Category).LoadAsync();
        return StatusCode(201, MapToDto(product));
    }

    // PUT /api/products/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var product = await db.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
        if (product is null)
            return NotFound(new { message = "Product not found." });

        var categoryExists = await db.Categories.AnyAsync(c => c.Id == dto.CategoryId);
        if (!categoryExists)
            return BadRequest(new { message = "Invalid category." });

        product.Name          = dto.Name.Trim();
        product.Description   = dto.Description?.Trim();
        product.CategoryId    = dto.CategoryId;
        product.Price         = dto.Price;
        product.CostPrice     = dto.CostPrice;
        product.StockQuantity = dto.StockQuantity;
        product.MinimumStock  = dto.MinimumStock;
        product.ImageUrl      = dto.ImageUrl;
        product.IsActive      = dto.IsActive;

        await db.SaveChangesAsync();
        await db.Entry(product).Reference(p => p.Category).LoadAsync();
        return Ok(MapToDto(product));
    }

    // DELETE /api/products/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null)
            return NotFound(new { message = "Product not found." });

        // Soft delete to preserve sale history
        product.IsActive = false;
        await db.SaveChangesAsync();
        return Ok(new { message = "Product deleted." });
    }
}
