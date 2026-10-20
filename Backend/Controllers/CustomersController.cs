using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SunPowerAPI.Data;
using SunPowerAPI.DTOs;
using SunPowerAPI.Models;

namespace SunPowerAPI.Controllers;

[ApiController]
[Route("api/customers")]
[Authorize]
[Produces("application/json")]
public class CustomersController(AppDbContext db) : ControllerBase
{
    private static CustomerDto MapToDto(Customer c) => new()
    {
        Id        = c.Id,
        Name      = c.Name,
        Phone     = c.Phone,
        Address   = c.Address,
        Notes     = c.Notes,
        CreatedAt = c.CreatedAt,
    };

    // GET /api/customers
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search)
    {
        var query = db.Customers.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(c =>
                c.Name.Contains(search) ||
                (c.Phone != null && c.Phone.Contains(search)));

        var customers = await query.OrderBy(c => c.Name).ToListAsync();
        return Ok(customers.Select(MapToDto));
    }

    // GET /api/customers/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var customer = await db.Customers.FindAsync(id);
        if (customer is null)
            return NotFound(new { message = "Customer not found." });

        return Ok(MapToDto(customer));
    }

    // POST /api/customers
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCustomerDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var customer = new Customer
        {
            Name      = dto.Name.Trim(),
            Phone     = dto.Phone?.Trim(),
            Address   = dto.Address?.Trim(),
            Notes     = dto.Notes?.Trim(),
            CreatedAt = DateTime.UtcNow,
        };

        db.Customers.Add(customer);
        await db.SaveChangesAsync();
        return StatusCode(201, MapToDto(customer));
    }

    // PUT /api/customers/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateCustomerDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var customer = await db.Customers.FindAsync(id);
        if (customer is null)
            return NotFound(new { message = "Customer not found." });

        customer.Name    = dto.Name.Trim();
        customer.Phone   = dto.Phone?.Trim();
        customer.Address = dto.Address?.Trim();
        customer.Notes   = dto.Notes?.Trim();

        await db.SaveChangesAsync();
        return Ok(MapToDto(customer));
    }

    // DELETE /api/customers/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var customer = await db.Customers
            .Include(c => c.Sales)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (customer is null)
            return NotFound(new { message = "Customer not found." });

        if (customer.Sales.Any())
            return BadRequest(new { message = "Cannot delete customer with existing sales." });

        db.Customers.Remove(customer);
        await db.SaveChangesAsync();
        return Ok(new { message = "Customer deleted." });
    }
}
