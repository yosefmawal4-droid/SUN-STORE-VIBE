using System.ComponentModel.DataAnnotations;

namespace SunPowerAPI.DTOs;

public class SaleDto
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<SaleItemDto> Items { get; set; } = new();
}

public class SaleItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
}

public class CreateSaleDto
{
    [Required]
    public int CustomerId { get; set; }

    [Required, MinLength(1)]
    public List<CreateSaleItemDto> Items { get; set; } = new();
}

public class CreateSaleItemDto
{
    [Required]
    public int ProductId { get; set; }

    [Required, Range(1, int.MaxValue)]
    public int Quantity { get; set; }
}
