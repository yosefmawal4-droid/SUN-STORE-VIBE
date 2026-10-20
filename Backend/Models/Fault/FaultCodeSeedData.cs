
using SunPowerAPI.Models.Fault;

namespace SunPowerAPI.Seed;

public static class FaultCodeSeedData
{
    public static List<FaultCode> GetFaultCodes()
    {
        var codes = new[]
        {
            ("01", "Fan is locked when inverter is off"),
            ("02", "Over temperature"),
            ("03", "Battery voltage is too high"),
            ("04", "Battery voltage is too low"),
            ("05", "Output short circuited or internal converter over temperature"),
            ("06", "Output voltage is too high"),
            ("07", "Overload time out"),
            ("08", "Bus voltage is too high"),
            ("09", "Bus soft start failed"),
            ("51", "Over current or surge"),
            ("52", "Bus voltage is too low"),
            ("53", "Inverter soft start failed"),
            ("55", "DC over voltage in AC output"),
            ("57", "Current sensor failed"),
            ("58", "Output voltage too low"),
            ("59", "PV voltage exceeds the maximum allowable value")
        };

        var faults = codes.Select(item => new FaultCode
        {
            Brand = "BAISON",
            Model = "SUNON ECO 4.2/6.2KVA",
            Code = item.Item1,
            Type = "Fault",
            Description = item.Item2,
            PossibleCauses = null,
            RecommendedAction = null,
            SafetyWarning = "افصل مصادر الطاقة قبل فحص الجهاز، واستعن بفني مؤهل.",
            ManualReference = "BAISON SUNON ECO Manual, printed pages 28-29",
            Verified = true
        }).ToList();

        faults.Add(new FaultCode
        {
            Brand = "SUNON",
            Model = "ECO-4.2KW",
            Code = "W0001",
            Type = "Warning",
            Description = "PV input voltage too low.",
            PossibleCauses = "Shading, soiling, damaged panels, cable resistance, or panel orientation.",
            RecommendedAction = "Check PV wiring and panel voltage. Clean panels and inspect shading.",
            SafetyWarning = "Switch off the PV input circuit before inspecting connections.",
            ManualReference = "SUNON ECO Operator Manual, PV Input Section",
            Verified = true
        });

        return faults;
    }
}
