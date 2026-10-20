using System.ComponentModel.DataAnnotations;

namespace SunPowerAPI.DTOs;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal CostPrice { get; set; }
    public int StockQuantity { get; set; }
    public int MinimumStock { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public string StockStatus { get; set; } = string.Empty; // IN_STOCK / LOW_STOCK / OUT_OF_STOCK
}

public class CreateProductDto
{
    [Required, MaxLength(200)]
    public string Name { get; set; } = string.Empty;
    [MaxLength(1000)]
    public string? Description { get; set; }
    [Required]
    public int CategoryId { get; set; }
    [Required, Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }
    [Required, Range(0, double.MaxValue)]
    public decimal CostPrice { get; set; }
    [Required, Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }
    [Range(0, int.MaxValue)]
    public int MinimumStock { get; set; } = 5;
    [MaxLength(500)]
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; } = true;
}

public class UpdateProductDto
{
    [Required, MaxLength(200)]
    public string Name { get; set; } = string.Empty;
    [MaxLength(1000)]
    public string? Description { get; set; }
    [Required]
    public int CategoryId { get; set; }
    [Required, Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }
    [Required, Range(0, double.MaxValue)]
    public decimal CostPrice { get; set; }
    [Required, Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }
    [Range(0, int.MaxValue)]
    public int MinimumStock { get; set; } = 5;
    [MaxLength(500)]
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; } = true;
}
