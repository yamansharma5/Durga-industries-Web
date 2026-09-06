import Head from "next/head";
import { useState } from "react";
import {
  clients,
  fallbackContact,
  fallbackServices,
  industries
} from "../lib/fallbackContent";

function mediaSrc(src) {
  if (!src) return "/assets/images/industrial-workshop-hero.jpg";
  if (src.startsWith("http") || src.startsWith("/")) return src;
  return `/${src}`;
}

function isPlaceholder(value = "") {
  return String(value).includes("[Add");
}

function phoneHref(value) {
  const digits = String(value || "").replace(/[^\d]/g, "");
  return digits && !isPlaceholder(value) ? `tel:${digits}` : "#contact";
}

function whatsappHref(value) {
  const digits = String(value || "").replace(/[^\d]/g, "");
  return digits && !isPlaceholder(value) ? `https://wa.me/${digits}` : "#contact";
}

function emailHref(value) {
  return value && !isPlaceholder(value) ? `mailto:${value}` : "#contact";
}

export default function Home() {
  const services = fallbackServices;
  const contact = fallbackContact;
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  async function handleQuoteSubmit(event) {
    event.preventDefault();
    setFormStatus({ type: "", message: "" });
    const form = event.currentTarget;
    const formData = new FormData(form);

    for (const field of ["name", "companyName", "phone", "requirement", "serviceRequired", "message"]) {
      if (!String(formData.get(field) || "").trim()) {
        setFormStatus({ type: "error", message: "Please complete the required fields before submitting." });
        return;
      }
    }

    const lines = [
      `Name: ${formData.get("name")}`,
      `Company: ${formData.get("companyName")}`,
      `Phone: ${formData.get("phone")}`,
      `Email: ${formData.get("email") || "-"}`,
      `Requirement: ${formData.get("requirement")}`,
      `Service: ${formData.get("serviceRequired")}`,
      `Quantity: ${formData.get("quantity") || "-"}`,
      `Preferred Timeline: ${formData.get("preferredTimeline") || "-"}`,
      "",
      String(formData.get("message") || "")
    ];

    const subject = encodeURIComponent("Website Quote Enquiry");
    const body = encodeURIComponent(lines.join("\n"));

    if (contact.email && !isPlaceholder(contact.email)) {
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setFormStatus({ type: "success", message: "Your email app is opening with the enquiry details. You can review and send it." });
    } else if (contact.whatsapp && !isPlaceholder(contact.whatsapp)) {
      const digits = String(contact.whatsapp).replace(/[^\d]/g, "");
      window.open(`https://wa.me/${digits}?text=${body}`, "_blank", "noopener");
      setFormStatus({ type: "success", message: "WhatsApp is opening with the enquiry details." });
    } else {
      setFormStatus({ type: "success", message: "Form details are ready. Add the business email or WhatsApp number in the content file to enable direct sending." });
    }
  }

  return (
    <>
      <Head>
        <title>{contact.companyName || "Durga Industries"} | Industrial Machinery Maintenance, Fabrication & Custom Parts</title>
        <meta name="description" content="Industrial machinery repair, maintenance, fabrication, machine modification, custom machinery parts, and low-volume manufacturing for B2B manufacturing customers." />
        <meta name="theme-color" content="#111315" />
        <meta property="og:title" content={`${contact.companyName || "Durga Industries"} | Industrial Engineering Services`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/industrial-workshop-hero.jpg" />
      </Head>

      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="top-strip">
          <div className="container top-strip__inner">
            <span>Industrial repair, maintenance, fabrication and custom part support</span>
            <div className="quick-links">
              <a href={phoneHref(contact.phone)}>Call: <span>{contact.phone}</span></a>
              <a href={whatsappHref(contact.whatsapp)} target={!isPlaceholder(contact.whatsapp) ? "_blank" : undefined} rel="noreferrer">WhatsApp</a>
              <a href={emailHref(contact.email)}>Email</a>
            </div>
          </div>
        </div>

        <nav className="navbar container" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="Go to home">
            <span className="brand__logo">DI</span>
            <span>
              <strong>{contact.companyName || "Durga Industries"}</strong>
              <small>Industrial Engineering Services</small>
            </span>
          </a>

          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-controls="primaryNav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>

          <div className={`nav-links ${menuOpen ? "is-open" : ""}`} id="primaryNav">
            {["about", "services", "clients", "industries", "contact"].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item[0].toUpperCase() + item.slice(1)}</a>
            ))}
            <a href="/projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="/gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Request a Quote</a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="heroTitle">
          <img className="hero__image" src="/assets/images/industrial-workshop-hero.jpg" alt="Industrial workshop with technicians repairing machinery" />
          <div className="hero__overlay"></div>
          <div className="container hero__content">
            <div className="hero__copy">
              <p className="eyebrow">B2B mechanical service partner</p>
              <h1 id="heroTitle">Industrial Machinery Maintenance, Fabrication & Custom Engineering Solutions</h1>
              <p className="hero__lead">
                Repair, maintenance, fabrication, custom parts, and low-volume manufacturing support for industrial businesses.
              </p>
              <div className="hero__actions">
                <a className="btn btn--primary" href="#contact">Request a Quote</a>
                <a className="btn btn--secondary" href="/projects">View Work</a>
              </div>
              <div className="proof-strip" aria-label="Key work areas">
                <span>Machinery repair</span>
                <span>Fabrication</span>
                <span>Custom parts</span>
                <span>On-site support</span>
              </div>
            </div>
            <aside className="hero-contact" aria-label="Quick contact information">
              <p>Quick Enquiry</p>
              <a href={phoneHref(contact.phone)}><span>Phone</span><strong>{contact.phone}</strong></a>
              <a href={whatsappHref(contact.whatsapp)} target={!isPlaceholder(contact.whatsapp) ? "_blank" : undefined} rel="noreferrer"><span>WhatsApp</span><strong>{contact.whatsapp}</strong></a>
              <a href={emailHref(contact.email)}><span>Email</span><strong>{contact.email}</strong></a>
            </aside>
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="aboutTitle">
          <div className="container two-column">
            <div className="section-copy">
              <p className="section-kicker">About the company</p>
              <h2 id="aboutTitle">Practical mechanical expertise for manufacturing businesses</h2>
              <p>
                {contact.companyName || "Durga Industries"} supports factories with hands-on repair, fabrication, modification, and custom machinery-part work.
              </p>
              <p>
                Work starts from the requirement, drawing, sample, machine issue, or site inspection. Scope, quantity, timeline, and delivery expectations are confirmed before quotation.
              </p>
              <div className="button-row">
                <a className="btn btn--primary" href="#contact">Request a Quote</a>
                <a className="btn btn--ghost" href="/projects">View Projects</a>
              </div>
            </div>
            <div className="proof-panel">
              <img src="/assets/images/machinery-repair.jpg" alt="Technician inspecting industrial machine component" loading="lazy" />
              <div className="proof-list">
                <div><span>Team</span><strong>5 skilled mechanical technicians/workers</strong></div>
                <div><span>Focus</span><strong>Repair, maintenance, fabrication and custom parts</strong></div>
                <div><span>Customers</span><strong>Manufacturing and industrial businesses</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--light" id="services" aria-labelledby="servicesTitle">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Services</p>
              <h2 id="servicesTitle">Repair, fabrication and custom part support for factory teams</h2>
              <p>Focused services for maintenance, purchase, production and plant teams.</p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service._id || service.slug || service.title}>
                  <img src={mediaSrc(service.image)} alt={`${service.title} service`} loading="lazy" />
                  <div className="service-card__body">
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                    <a className="btn btn--ghost" href="#contact">Request a Quote</a>
                  </div>
                </article>
              ))}
            </div>
            <div className="service-detail-stack">
              {services.map((service) => (
                <article className="service-detail" id={`service-${service.slug || service._id || service.title}`} key={`detail-${service._id || service.slug || service.title}`}>
                  <img src={mediaSrc(service.image)} alt={`${service.title} detail`} loading="lazy" />
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.detail}</p>
                    <ul>{(service.applications || []).map((app) => <li key={app}>{app}</li>)}</ul>
                    <a className="btn btn--primary" href="#contact">Request a Quote</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section clients" id="clients" aria-labelledby="clientsTitle">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Clients / industries</p>
              <h2 id="clientsTitle">Customer logos or industries can be added here</h2>
              <p>
                Keep placeholders until names or logos are approved for public display.
              </p>
            </div>
            <div className="client-grid">
              {clients.map((client) => <article className="client-card" key={client}>{client}</article>)}
            </div>
          </div>
        </section>

        <section className="section industries" id="industries" aria-labelledby="industriesTitle">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Industries served</p>
              <h2 id="industriesTitle">Support for industrial buyers, maintenance teams and factory owners</h2>
            </div>
            <div className="industry-grid">
              {industries.map((industry, index) => <article className="industry-card" key={industry}><span>{String(index + 1).padStart(2, "0")}</span><h3>{industry}</h3></article>)}
            </div>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contactTitle">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="section-kicker">Contact / request a quote</p>
              <h2 id="contactTitle">Send the requirement and get a clear response</h2>
              <p>Share the machine issue, part requirement, quantity, timeline, drawing or sample details.</p>
              <div className="contact-cards">
                <a href={phoneHref(contact.phone)}><span>Phone</span><strong>{contact.phone}</strong></a>
                <a href={whatsappHref(contact.whatsapp)} target={!isPlaceholder(contact.whatsapp) ? "_blank" : undefined} rel="noreferrer"><span>WhatsApp</span><strong>{contact.whatsapp}</strong></a>
                <a href={emailHref(contact.email)}><span>Email</span><strong>{contact.email}</strong></a>
                <div><span>Address</span><strong>{contact.address}</strong></div>
                <div><span>Business Hours</span><strong>{contact.businessHours}</strong></div>
              </div>
            </div>

            <form className="quote-form" onSubmit={handleQuoteSubmit} noValidate>
              <div className="form-grid">
                <label><span>Name *</span><input name="name" autoComplete="name" required /></label>
                <label><span>Company Name *</span><input name="companyName" autoComplete="organization" required /></label>
                <label><span>Phone *</span><input name="phone" inputMode="tel" autoComplete="tel" required /></label>
                <label><span>Email</span><input name="email" type="email" autoComplete="email" /></label>
                <label><span>Requirement *</span><input name="requirement" required placeholder="Repair, fabrication, part manufacturing..." /></label>
                <label>
                  <span>Service Required *</span>
                  <select name="serviceRequired" required defaultValue="">
                    <option value="">Select service</option>
                    {services.map((service) => <option key={service._id || service.title} value={service.title}>{service.title}</option>)}
                  </select>
                </label>
                <label><span>Quantity</span><input name="quantity" inputMode="numeric" placeholder="One-off, 5 pcs, urgent spare..." /></label>
                <label><span>Preferred Timeline</span><input name="preferredTimeline" placeholder="Urgent, this week, planned shutdown..." /></label>
                <label className="message-field">
                  <span>Message *</span>
                  <textarea name="message" rows="6" required placeholder="Add machine details, issue observed, dimensions, material, delivery expectations, or site visit needs."></textarea>
                </label>
              </div>
              <p className={`form-status ${formStatus.type === "error" ? "is-error" : ""} ${formStatus.type === "success" ? "is-success" : ""}`} role="status" aria-live="polite">{formStatus.message}</p>
              <button className="btn btn--primary btn--block" type="submit">
                <span>Request a Quote</span>
              </button>
            </form>
          </div>
          <div className="container map-wrap">
            <iframe title="Company location map" src={contact.mapsEmbedUrl || fallbackContact.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a className="brand brand--footer" href="#home"><span className="brand__logo">DI</span><span><strong>{contact.companyName || "Durga Industries"}</strong><small>Industrial Engineering Services</small></span></a>
            <p>Reliable industrial repair, fabrication, maintenance, and custom machinery-part solutions for manufacturing businesses.</p>
          </div>
          <div><h2>Services</h2><ul>{services.map((service) => <li key={service._id || service.title}><a href={`#service-${service.slug || service._id || service.title}`}>{service.title}</a></li>)}</ul></div>
          <div><h2>Industries</h2><ul>{industries.map((industry) => <li key={industry}>{industry}</li>)}</ul></div>
          <div><h2>Company</h2><ul><li><a href="/projects">Projects</a></li><li><a href="/gallery">Gallery</a></li><li><a href="#clients">Clients</a></li><li><a href="#industries">Industries</a></li><li><a href="#contact">Contact</a></li></ul></div>
          <div>
            <h2>Contact</h2>
            <ul><li><a href={whatsappHref(contact.whatsapp)}>WhatsApp</a></li><li><a href={phoneHref(contact.phone)}>{contact.phone}</a></li><li><a href={emailHref(contact.email)}>{contact.email}</a></li><li><span>{contact.address}</span></li></ul>
            <div className="social-links">{(contact.socialLinks || fallbackContact.socialLinks).map((social) => <a key={social.label} href={!isPlaceholder(social.url) ? social.url : "#contact"}>{social.label}</a>)}</div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} {contact.companyName || "Durga Industries"}. All rights reserved.</span>
          <span>Editable B2B industrial website structure.</span>
        </div>
      </footer>

      <div className="floating-actions" aria-label="Quick contact actions">
        <a className="float-btn float-btn--call" href={phoneHref(contact.phone)}>Call</a>
        <a className="float-btn float-btn--whatsapp" href={whatsappHref(contact.whatsapp)} target={!isPlaceholder(contact.whatsapp) ? "_blank" : undefined} rel="noreferrer">WhatsApp</a>
      </div>

    </>
  );
}
