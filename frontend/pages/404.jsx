export default function NotFound() {
  return (
    <main className="section" style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#111315", color: "#f8faf9" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <p className="section-kicker">404</p>
        <h1 style={{ fontSize: "clamp(2.6rem, 8vw, 5rem)" }}>Page not found</h1>
        <p style={{ marginTop: 18, color: "#d9dedc" }}>
          The page may have moved. Return to the industrial services website to view repair, fabrication, custom parts, projects, gallery and contact details.
        </p>
        <div className="button-row">
          <a className="btn btn--primary" href="/">Back to Home</a>
          <a className="btn btn--secondary" href="/#contact">Request a Quote</a>
        </div>
      </div>
    </main>
  );
}

