using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SunPowerAPI.Data;
using SunPowerAPI.DTOs;
using SunPowerAPI.Models;

namespace SunPowerAPI.Controllers;

[ApiController]
[Route("api/categories")]
[Authorize]
[Produces("application/json")]
public class CategoriesController(AppDbContext db) : ControllerBase
{
    // GET /api/categories
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await db.Categories
            .Include(c => c.Products)
            .Select(c => new CategoryDto
            {
                Id           = c.Id,
                Name         = c.Name,
                Description  = c.Description,
                ProductCount = c.Products.Count(p => p.IsActive),
            })
            .OrderBy(c => c.Name)
            .ToListAsync();

        return Ok(categories);
    }

    // GET /api/categories/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var category = await db.Categories
            .Include(c => c.Products)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category is null)
            return NotFound(new { message = "Category not found." });

        return Ok(new CategoryDto
        {
            Id           = category.Id,
            Name         = category.Name,
            Description  = category.Description,
            ProductCount = category.Products.Count(p => p.IsActive),
        });
    }

    // POST /api/categories
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCategoryDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var category = new Category
        {
            Name        = dto.Name.Trim(),
            Description = dto.Description?.Trim(),
        };

        db.Categories.Add(category);
        await db.SaveChangesAsync();

        return StatusCode(201, new CategoryDto
        {
            Id           = category.Id,
            Name         = category.Name,
            Description  = category.Description,
            ProductCount = 0,
        });
    }

    // PUT /api/categories/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateCategoryDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var category = await db.Categories.FindAsync(id);
        if (category is null)
            return NotFound(new { message = "Category not found." });

        category.Name        = dto.Name.Trim();
        category.Description = dto.Description?.Trim();

        await db.SaveChangesAsync();
        return Ok(new { message = "Category updated." });
    }

    // DELETE /api/categories/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var category = await db.Categories
            .Include(c => c.Products)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category is null)
            return NotFound(new { message = "Category not found." });

        if (category.Products.Any())
            return BadRequest(new { message = "Cannot delete category with existing products." });

        db.Categories.Remove(category);
        await db.SaveChangesAsync();
        return Ok(new { message = "Category deleted." });
    }
}
