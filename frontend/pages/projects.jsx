import Head from "next/head";
import { useState } from "react";
import { fallbackContact, fallbackProjects } from "../lib/fallbackContent";

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
  return digits && !isPlaceholder(value) ? `tel:${digits}` : "/#contact";
}

function whatsappHref(value) {
  const digits = String(value || "").replace(/[^\d]/g, "");
  return digits && !isPlaceholder(value) ? `https://wa.me/${digits}` : "/#contact";
}

export default function ProjectsPage() {
  const contact = fallbackContact;
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <Head>
        <title>Projects | {contact.companyName || "Durga Industries"}</title>
        <meta name="description" content="Repair, fabrication and custom machinery-part project showcase." />
      </Head>

      <header className="site-header">
        <nav className="navbar container" aria-label="Main navigation">
          <a className="brand" href="/">
            <span className="brand__logo">DI</span>
            <span><strong>{contact.companyName || "Durga Industries"}</strong><small>Industrial Engineering Services</small></span>
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-controls="primaryNav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`} id="primaryNav">
            <a href="/#about">About</a>
            <a href="/#services">Services</a>
            <a href="/#clients">Clients</a>
            <a href="/#industries">Industries</a>
            <a href="/gallery">Gallery</a>
            <a className="nav-cta" href="/#contact">Request a Quote</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="page-hero">
          <div className="container">
            <p className="section-kicker">Projects / work showcase</p>
            <h1>Repair, fabrication and custom part work</h1>
            <p>Add approved photos, videos, problems solved and outcomes. Keep customer details as placeholders until approved.</p>
          </div>
        </section>

        <section className="section section--light">
          <div className="container">
            <div className="project-grid">
              {fallbackProjects.map((project) => (
                <article className="project-card" key={project.title}>
                  <button className="media-button" type="button" onClick={() => setLightbox({ type: "image", src: project.image, caption: project.title })}>
                    <img src={mediaSrc(project.image)} alt={project.title} loading="lazy" />
                  </button>
                  <div className="project-card__body">
                    <h3>{project.title}</h3>
                    {project.customer && <p className="project-meta">{project.customer}</p>}
                    <ul>
                      <li><strong>Problem:</strong> {project.problem || "[Add details]"}</li>
                      <li><strong>Solution:</strong> {project.solution || "[Add details]"}</li>
                      <li><strong>Work performed:</strong> {project.work || "[Add details]"}</li>
                      <li><strong>Result:</strong> {project.result || "[Add details]"}</li>
                    </ul>
                    {project.videoUrl && <button className="btn btn--ghost" type="button" onClick={() => setLightbox({ type: "video", src: project.videoUrl, caption: project.title })}>View Video</button>}
                  </div>
                </article>
              ))}
            </div>
            <div className="page-cta">
              <h2>Have a similar requirement?</h2>
              <div className="button-row">
                <a className="btn btn--primary" href="/#contact">Request a Quote</a>
                <a className="btn btn--ghost" href={phoneHref(contact.phone)}>Call</a>
                <a className="btn btn--ghost" href={whatsappHref(contact.whatsapp)} target={!isPlaceholder(contact.whatsapp) ? "_blank" : undefined} rel="noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {lightbox && (
        <div className="lightbox is-open" role="dialog" aria-label="Media viewer" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" type="button" aria-label="Close media viewer" onClick={() => setLightbox(null)}>x</button>
          <div className="lightbox__stage" onClick={(event) => event.stopPropagation()}>
            {lightbox.type === "video" ? (
              <iframe src={lightbox.src} title={lightbox.caption || "Project video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            ) : (
              <img src={mediaSrc(lightbox.src)} alt={lightbox.caption || "Project image"} />
            )}
          </div>
          <p>{lightbox.caption}</p>
        </div>
      )}
    </>
  );
}
