namespace SunPowerAPI.DTOs;

public class MessageDto
{
    public string Message { get; set; } = string.Empty;

    public MessageDto() { }
    public MessageDto(string message) => Message = message;
}
