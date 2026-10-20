using System.ComponentModel.DataAnnotations;

namespace SunPowerAPI.DTOs;

public class CustomerDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateCustomerDto
{
    [Required, MaxLength(150)]
    public string Name { get; set; } = string.Empty;
    [MaxLength(20)]
    public string? Phone { get; set; }
    [MaxLength(300)]
    public string? Address { get; set; }
    [MaxLength(500)]
    public string? Notes { get; set; }
}

public class UpdateCustomerDto
{
    [Required, MaxLength(150)]
    public string Name { get; set; } = string.Empty;
    [MaxLength(20)]
    public string? Phone { get; set; }
    [MaxLength(300)]
    public string? Address { get; set; }
    [MaxLength(500)]
    public string? Notes { get; set; }
}
