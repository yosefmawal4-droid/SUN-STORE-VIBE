import { useState, FormEvent, ChangeEvent } from 'react'
import SectionHeader from './SectionHeader'

interface FormState {
  name: string
  email: string
  service: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const SERVICES = [
  { value: 'study-design',    label: 'System Study & Design'              },
  { value: 'solar-install',   label: 'Solar Energy Installation'          },
  { value: 'industrial-agri', label: 'Industrial & Agricultural Solutions' },
  { value: 'support',         label: 'System Support & Maintenance'       },
  { value: 'other',           label: 'Other / General Inquiry'            },
]

export default function Contact() {
  const [form, setForm]       = useState<FormState>({ name: '', email: '', service: '', message: '' })
  const [errors, setErrors]   = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!form.name.trim())    e.name    = 'Please enter your full name.'
    if (!form.email.trim())   e.email   = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = 'Please enter a valid email address.'
    if (!form.message.trim()) e.message = 'Please enter a message.'
    return e
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setForm({ name: '', email: '', service: '', message: '' })
      setTimeout(() => setSuccess(false), 6000)
    }, 1200)
  }

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <SectionHeader
          eyebrow="Get In Touch"
          headingId="contact-heading"
          heading="Let's Build Your Energy Solution"
          sub="Tell us about your project and we'll get back to you promptly."
          light
        />

        <form
          className="contact-form animate-on-scroll"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                Full Name <span aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <span className="field-error" id="name-error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address <span aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <span className="field-error" id="email-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="service">Service Interested In</label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
            >
              <option value="">Select a service…</option>
              {SERVICES.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Message <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Describe your project or question…"
              value={form.message}
              onChange={handleChange}
              aria-describedby={errors.message ? 'message-error' : undefined}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <span className="field-error" id="message-error" role="alert">
                {errors.message}
              </span>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Sending…' : 'Send Message'}
          </button>

          {success && (
            <p className="form-success" aria-live="polite">
              ✓ Thank you! We'll be in touch shortly.
            </p>
          )}
        </form>
      </div>

      <style>{`
        .contact {
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,158,11,.08) 0%, transparent 60%),
            var(--navy-900);
        }

        .contact-form {
          max-width: 700px;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.4rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: .5rem;
        }

        .form-group label {
          font-size: .82rem;
          font-weight: 600;
          letter-spacing: .04em;
          text-transform: uppercase;
          color: rgba(255,255,255,.6);
        }
        .form-group label span { color: var(--amber-500); }

        .form-group input,
        .form-group select,
        .form-group textarea {
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: var(--r-md);
          padding: .9rem 1.1rem;
          font-family: var(--font-body);
          font-size: .95rem;
          color: var(--clr-white);
          outline: none;
          width: 100%;
          transition: border-color .28s ease, background .28s ease, box-shadow .28s ease;
        }
        .form-group select option { background: var(--navy-800); color: var(--clr-white); }
        .form-group input::placeholder,
        .form-group textarea::placeholder { color: rgba(255,255,255,.28); }

        .form-group input:hover,
        .form-group select:hover,
        .form-group textarea:hover { border-color: rgba(255,255,255,.2); }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: rgba(245,158,11,.55);
          background: rgba(255,255,255,.07);
          box-shadow: 0 0 0 3px rgba(245,158,11,.12);
        }

        .form-group input[aria-invalid="true"],
        .form-group textarea[aria-invalid="true"] {
          border-color: rgba(248,113,113,.6);
        }

        .form-group textarea { resize: vertical; min-height: 140px; }

        .field-error {
          font-size: .8rem;
          color: #f87171;
          min-height: 1rem;
        }

        .form-success {
          text-align: center;
          color: #4ade80;
          font-weight: 600;
          font-size: .95rem;
          padding: .75rem;
          background: rgba(74,222,128,.08);
          border: 1px solid rgba(74,222,128,.2);
          border-radius: var(--r-md);
        }

        .contact .btn-primary:disabled {
          opacity: .7;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
