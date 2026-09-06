import Head from "next/head";
import { useMemo, useState } from "react";
import { fallbackContact, fallbackGallery } from "../lib/fallbackContent";

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

export default function GalleryPage() {
  const contact = fallbackContact;
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const categories = useMemo(() => ["All", ...new Set(fallbackGallery.map((item) => item.category))], []);
  const filteredGallery = galleryFilter === "All" ? fallbackGallery : fallbackGallery.filter((item) => item.category === galleryFilter);

  return (
    <>
      <Head>
        <title>Gallery | {contact.companyName || "Durga Industries"}</title>
        <meta name="description" content="Workshop, machinery, fabrication, repair and completed work gallery." />
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
            <a href="/projects">Projects</a>
            <a className="nav-cta" href="/#contact">Request a Quote</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="page-hero page-hero--gallery">
          <div className="container">
            <p className="section-kicker">Workshop / work gallery</p>
            <h1>Visual proof of workshop and industrial work</h1>
            <p>Replace placeholders with actual workshop, machinery, fabrication, repair, team, completed-work and on-site photos or videos.</p>
          </div>
        </section>

        <section className="section gallery gallery-page" aria-labelledby="galleryTitle">
          <div className="container">
            <div className="gallery-filters" aria-label="Gallery filters">
              {categories.map((category) => (
                <button key={category} className={`filter-btn ${category === galleryFilter ? "is-active" : ""}`} type="button" onClick={() => setGalleryFilter(category)}>{category}</button>
              ))}
            </div>
            <div className="gallery-grid">
              {filteredGallery.map((item) => (
                <button className="gallery-card" type="button" key={`${item.category}-${item.title}`} onClick={() => setLightbox({ type: item.type, src: item.src, caption: `${item.category}: ${item.title}` })}>
                  <img src={mediaSrc(item.type === "image" ? item.src : item.poster)} alt={item.alt || item.title} loading="lazy" />
                  <span className="gallery-card__label">{item.category} / {item.title}</span>
                </button>
              ))}
            </div>
            <div className="page-cta page-cta--dark">
              <h2>Want to discuss a machine, part or repair requirement?</h2>
              <div className="button-row">
                <a className="btn btn--primary" href="/#contact">Request a Quote</a>
                <a className="btn btn--secondary" href={phoneHref(contact.phone)}>Call</a>
                <a className="btn btn--secondary" href={whatsappHref(contact.whatsapp)} target={!isPlaceholder(contact.whatsapp) ? "_blank" : undefined} rel="noreferrer">WhatsApp</a>
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
              <iframe src={lightbox.src} title={lightbox.caption || "Gallery video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            ) : (
              <img src={mediaSrc(lightbox.src)} alt={lightbox.caption || "Gallery image"} />
            )}
          </div>
          <p>{lightbox.caption}</p>
        </div>
      )}
    </>
  );
}
