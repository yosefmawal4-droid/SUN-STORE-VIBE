const SERVICES = [
  { icon: 'solar_power',          name: 'Solar Energy Systems'      },
  { icon: 'electric_bolt',        name: 'Renewable Energy Solutions' },
  { icon: 'home_iot_device',      name: 'Smart Home Systems'        },
  { icon: 'power',                name: 'Medium & High Voltage'     },
  { icon: 'water_drop',           name: 'Solar Water Pumping'       },
  { icon: 'water_heater',         name: 'Solar Water Heating'       },
  { icon: 'cable',                name: 'Electrical Extensions'     },
  { icon: 'videocam',             name: 'Surveillance Cameras'      },
  { icon: 'router',               name: 'Networks & Intercom'       },
  { icon: 'local_fire_department',name: 'Fire Alarms'               },
  { icon: 'wind_power',           name: 'Wind Energy Systems'       },
  { icon: 'home_repair_service',  name: 'Maintenance Contracts'     },
]

export default function Services() {
  return (
    <section className="sp-services section bg-grid" id="services">
      <div className="container">
        <h2 className="sp-services__h2 animate-on-scroll">Comprehensive Engineering Services</h2>

        <div className="sp-services__grid">
          {SERVICES.map((svc, i) => (
            <div key={svc.name} className={`sp-services__card animate-on-scroll stagger-${(i % 4) + 1}`}>
              <span className="material-symbols-outlined sp-services__icon">{svc.icon}</span>
              <span className="sp-services__name">{svc.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sp-services { background: var(--surface-container-lowest); }

        .sp-services__h2 {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700; letter-spacing: -.01em;
          color: var(--on-surface);
          text-align: center;
          margin-bottom: 56px;
        }

        .sp-services__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (min-width: 640px)  { .sp-services__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px)  { .sp-services__grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1100px) { .sp-services__grid { grid-template-columns: repeat(4, 1fr); } }

        .sp-services__card {
          background: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: 12px;
          padding: 24px 20px;
          display: flex; flex-direction: column; gap: 12px;
          transition: transform .25s, box-shadow .25s, border-color .25s;
          cursor: default;
        }
        .sp-services__card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 24px rgba(0,0,0,.09);
          border-color: var(--primary-container);
        }

        .sp-services__icon {
          font-size: 28px;
          color: var(--primary-container);
        }

        .sp-services__name {
          font-size: 15px; font-weight: 600;
          color: var(--on-surface); line-height: 1.4;
        }
      `}</style>
    </section>
  )
}
