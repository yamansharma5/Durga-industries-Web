const data = window.SITE_CONTENT || {};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const isPlaceholder = (value = "") => String(value).includes("[Add");
const cleanDigits = (value = "") => String(value).replace(/[^\d]/g, "");

function setText(selector, value) {
  $$(selector).forEach((node) => {
    node.textContent = value || node.textContent;
  });
}

function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function setContactLinks() {
  const contact = data.contact || {};
  const phoneDigits = cleanDigits(contact.phone);
  const whatsappDigits = cleanDigits(contact.whatsapp || contact.phone);
  const email = contact.email || "";

  $$("[data-phone-link]").forEach((link) => {
    link.href = phoneDigits && !isPlaceholder(contact.phone) ? `tel:${phoneDigits}` : "#contact";
  });

  $$("[data-whatsapp-link]").forEach((link) => {
    link.href = whatsappDigits && !isPlaceholder(contact.whatsapp) ? `https://wa.me/${whatsappDigits}` : "#contact";
    if (link.href.startsWith("https://wa.me")) {
      link.target = "_blank";
      link.rel = "noopener";
    }
  });

  $$("[data-email-link]").forEach((link) => {
    link.href = email && !isPlaceholder(email) ? `mailto:${email}` : "#contact";
  });
}

function renderCapabilities() {
  const mount = $("[data-capabilities]");
  if (!mount) return;

  mount.innerHTML = "";
  (data.capabilities || []).forEach((item, index) => {
    const card = make("article", "capability-card reveal");
    const number = make("span", "", String(index + 1).padStart(2, "0"));
    const title = make("h3", "", item);
    card.append(number, title);
    mount.append(card);
  });
}

function renderServices() {
  const services = data.services || [];
  const cardMount = $("[data-services]");
  const detailMount = $("[data-service-details]");
  const select = $("#quoteForm select[name='service']");

  if (select) {
    services.forEach((service) => {
      const option = document.createElement("option");
      option.value = service.title;
      option.textContent = service.title;
      select.append(option);
    });
  }

  if (cardMount) {
    cardMount.innerHTML = "";
    services.forEach((service) => {
      const card = make("article", "service-card reveal");
      const image = document.createElement("img");
      image.src = service.image;
      image.alt = `${service.title} service`;
      image.loading = "lazy";

      const body = make("div", "service-card__body");
      body.append(make("h3", "", service.title), make("p", "", service.summary));

      const cta = make("a", "btn btn--ghost", "Request a Quote");
      cta.href = "#contact";
      cta.dataset.serviceCta = service.title;
      body.append(cta);
      card.append(image, body);
      cardMount.append(card);
    });
  }

  if (detailMount) {
    detailMount.innerHTML = "";
    services.forEach((service) => {
      const section = make("article", "service-detail reveal");
      section.id = `service-${service.id}`;

      const image = document.createElement("img");
      image.src = service.image;
      image.alt = `${service.title} detail`;
      image.loading = "lazy";

      const content = make("div");
      content.append(make("h3", "", service.title), make("p", "", service.detail));

      const list = document.createElement("ul");
      (service.applications || []).forEach((app) => list.append(make("li", "", app)));
      content.append(list);

      const cta = make("a", "btn btn--primary", "Request a Quote");
      cta.href = "#contact";
      cta.dataset.serviceCta = service.title;
      content.append(cta);

      section.append(image, content);
      detailMount.append(section);
    });
  }
}

function renderIndustries() {
  const mount = $("[data-industries]");
  if (!mount) return;

  mount.innerHTML = "";
  (data.industries || []).forEach((industry, index) => {
    const card = make("article", "industry-card reveal");
    card.append(make("span", "", String(index + 1).padStart(2, "0")), make("h3", "", industry));
    mount.append(card);
  });
}

function renderProjects() {
  const mount = $("[data-projects]");
  if (!mount) return;

  mount.innerHTML = "";
  (data.projects || []).forEach((project) => {
    const card = make("article", "project-card reveal");
    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.title;
    image.loading = "lazy";

    const body = make("div", "project-card__body");
    body.append(make("h3", "", project.title));
    if (project.customer) body.append(make("p", "project-meta", project.customer));

    const list = document.createElement("ul");
    [
      ["Problem", project.problem],
      ["Solution", project.solution],
      ["Work performed", project.work],
      ["Result", project.result]
    ].forEach(([label, value]) => {
      const item = make("li");
      const strong = make("strong", "", `${label}:`);
      item.append(strong, " ", value || "[Add details]");
      list.append(item);
    });
    body.append(list);

    if (project.videoUrl) {
      const video = make("button", "btn btn--ghost", "View Video");
      video.type = "button";
      video.dataset.video = project.videoUrl;
      video.dataset.caption = project.title;
      body.append(video);
    }

    card.append(image, body);
    mount.append(card);
  });
}

function renderGallery() {
  const filterMount = $("[data-gallery-filters]");
  const galleryMount = $("[data-gallery]");
  if (!filterMount || !galleryMount) return;

  const items = data.gallery || [];
  const categories = ["All", ...new Set(items.map((item) => item.category))];

  filterMount.innerHTML = "";
  categories.forEach((category) => {
    const button = make("button", "filter-btn", category);
    button.type = "button";
    button.dataset.filter = category;
    if (category === "All") button.classList.add("is-active");
    filterMount.append(button);
  });

  const draw = (category = "All") => {
    galleryMount.innerHTML = "";
    items
      .filter((item) => category === "All" || item.category === category)
      .forEach((item) => {
        const card = make("button", "gallery-card reveal");
        card.type = "button";
        card.dataset.mediaType = item.type;
        card.dataset.src = item.src;
        card.dataset.caption = `${item.category}: ${item.title}`;

        const image = document.createElement("img");
        image.src = item.type === "image" ? item.src : item.poster || "assets/images/industrial-workshop-hero.jpg";
        image.alt = item.alt || item.title;
        image.loading = "lazy";

        const label = make("span", "gallery-card__label", `${item.category} / ${item.title}`);
        card.append(image, label);
        galleryMount.append(card);
      });
    observeReveals();
  };

  filterMount.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    $$(".filter-btn", filterMount).forEach((node) => node.classList.remove("is-active"));
    button.classList.add("is-active");
    draw(button.dataset.filter);
  });

  draw();
}

function renderWhy() {
  const mount = $("[data-why]");
  if (!mount) return;

  mount.innerHTML = "";
  (data.whyChooseUs || []).forEach((item) => mount.append(make("div", "why-item", item)));
}

function renderProfile() {
  const mount = $("[data-profile]");
  if (!mount) return;

  mount.innerHTML = "";
  Object.entries(data.profileSections || {}).forEach(([title, text]) => {
    const card = make("article", "profile-card reveal");
    card.append(make("h3", "", title), make("p", "", text));
    mount.append(card);
  });
}

function renderTestimonials() {
  const section = $("[data-testimonials-section]");
  const mount = $("[data-testimonials]");
  const testimonials = data.testimonials || [];
  if (!section || !mount || !testimonials.length) return;

  section.hidden = false;
  mount.innerHTML = "";
  testimonials.forEach((testimonial) => {
    const card = make("article", "testimonial-card reveal");
    const quote = document.createElement("blockquote");
    quote.textContent = testimonial.quote;
    const source = make("p", "", testimonial.source || "[Add approved source]");
    card.append(quote, source);
    mount.append(card);
  });
}

function renderProcess() {
  const mount = $("[data-process]");
  if (!mount) return;

  mount.innerHTML = "";
  (data.process || []).forEach((step) => {
    const item = make("li", "process-step reveal");
    item.append(make("strong", "", step));
    mount.append(item);
  });
}

function renderFooter() {
  const serviceMount = $("[data-footer-services]");
  const industryMount = $("[data-footer-industries]");
  const socialMount = $("[data-socials]");

  if (serviceMount) {
    serviceMount.innerHTML = "";
    (data.services || []).forEach((service) => {
      const link = make("a", "", service.title);
      link.href = `#service-${service.id}`;
      const item = make("li");
      item.append(link);
      serviceMount.append(item);
    });
  }

  if (industryMount) {
    industryMount.innerHTML = "";
    (data.industries || []).forEach((industry) => industryMount.append(make("li", "", industry)));
  }

  if (socialMount) {
    socialMount.innerHTML = "";
    (data.socials || []).forEach((social) => {
      const link = make("a", "", social.label);
      link.href = !isPlaceholder(social.url) ? social.url : "#contact";
      if (link.href !== `${location.href.split("#")[0]}#contact`) {
        link.target = "_blank";
        link.rel = "noopener";
      }
      socialMount.append(link);
    });
  }
}

function setGlobalContent() {
  const company = data.company || {};
  const contact = data.contact || {};

  setText("[data-company-name]", company.name);
  setText("[data-logo-text]", company.logoText);
  if (company.logoImage && !isPlaceholder(company.logoImage)) {
    $$("[data-logo-text]").forEach((node) => {
      node.textContent = "";
      const image = document.createElement("img");
      image.src = company.logoImage;
      image.alt = `${company.name || "Company"} logo`;
      node.append(image);
    });
  }
  setText("[data-company-short]", company.shortDescription);
  setText("[data-company-overview]", company.overview);
  setText("[data-company-team]", company.team);

  Object.entries(contact).forEach(([key, value]) => {
    setText(`[data-contact="${key}"]`, value);
  });

  $$("[data-profile-pdf]").forEach((link) => {
    link.href = company.profilePdf || "assets/company-profile.pdf";
  });

  const map = $("[data-map]");
  if (map && contact.mapsEmbedUrl) map.src = contact.mapsEmbedUrl;

  const form = $("#quoteForm");
  if (form && contact.enquiryEndpoint && !isPlaceholder(contact.enquiryEndpoint)) {
    form.dataset.endpoint = contact.enquiryEndpoint;
  }

  const year = new Date().getFullYear();
  setText("[data-year]", year);

  const schema = $("#schemaData");
  if (schema) {
    schema.textContent = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: company.name,
        description:
          "Industrial machinery repair, fabrication, maintenance, custom machinery parts and low-volume manufacturing services.",
        telephone: contact.phone,
        email: contact.email,
        address: contact.address
      },
      null,
      2
    );
  }

  setContactLinks();
}

function setupNavigation() {
  const toggle = $(".menu-toggle");
  const links = $$(".nav-links a");

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupQuoteInteractions() {
  const form = $("#quoteForm");
  if (!form) return;

  const status = $("[data-form-status]", form);
  const fileInput = $("input[type='file']", form);
  const fileName = $("[data-file-name]", form);

  document.addEventListener("click", (event) => {
    const serviceCta = event.target.closest("[data-service-cta]");
    if (!serviceCta) return;
    const select = $("select[name='service']", form);
    if (select) select.value = serviceCta.dataset.serviceCta;
  });

  if (fileInput && fileName) {
    fileInput.addEventListener("change", () => {
      fileName.textContent = fileInput.files[0] ? fileInput.files[0].name : "No file selected";
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "form-status";
    $$("input, select, textarea", form).forEach((field) => field.classList.remove("field-error"));

    const requiredFields = $$("[required]", form);
    const invalid = requiredFields.filter((field) => !field.value.trim());
    const emailField = $("input[type='email']", form);

    if (emailField && emailField.value && !emailField.validity.valid) invalid.push(emailField);

    if (invalid.length) {
      invalid.forEach((field) => field.classList.add("field-error"));
      invalid[0].focus();
      status.textContent = "Please complete the required fields before submitting.";
      status.classList.add("is-error");
      return;
    }

    form.classList.add("is-submitting");
    const endpoint = form.dataset.endpoint;
    const formData = new FormData(form);

    try {
      if (endpoint) {
        await fetch(endpoint, { method: "POST", body: formData });
        status.textContent = "Your enquiry has been sent.";
      } else {
        await new Promise((resolve) => setTimeout(resolve, 650));
        status.textContent =
          "Form validated. Connect data.contact.enquiryEndpoint in assets/data.js to send enquiries to email or CRM.";
      }
      status.classList.add("is-success");
      form.reset();
      if (fileName) fileName.textContent = "No file selected";
    } catch (error) {
      status.textContent = "The enquiry could not be sent. Please call, WhatsApp or email the company directly.";
      status.classList.add("is-error");
    } finally {
      form.classList.remove("is-submitting");
    }
  });
}

function setupLightbox() {
  const lightbox = $("#lightbox");
  const stage = $("[data-lightbox-stage]");
  const caption = $("[data-lightbox-caption]");
  const close = $(".lightbox__close");
  if (!lightbox || !stage || !caption || !close) return;

  const open = ({ type, src, text }) => {
    stage.innerHTML = "";
    if (type === "video") {
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = text || "Project video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      stage.append(iframe);
    } else {
      const image = document.createElement("img");
      image.src = src;
      image.alt = text || "Gallery image";
      stage.append(image);
    }
    caption.textContent = text || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    close.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    stage.innerHTML = "";
  };

  document.addEventListener("click", (event) => {
    const galleryCard = event.target.closest("[data-media-type]");
    const videoButton = event.target.closest("[data-video]");

    if (galleryCard) {
      open({
        type: galleryCard.dataset.mediaType,
        src: galleryCard.dataset.src,
        text: galleryCard.dataset.caption
      });
    }

    if (videoButton) {
      open({
        type: "video",
        src: videoButton.dataset.video,
        text: videoButton.dataset.caption
      });
    }
  });

  close.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
}

let revealObserver;

function observeReveals() {
  const nodes = $$(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
  }

  nodes.forEach((node) => revealObserver.observe(node));
}

window.addEventListener("load", () => {
  const loader = $("#loadingScreen");
  if (loader) loader.classList.add("is-hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  setGlobalContent();
  renderCapabilities();
  renderServices();
  renderIndustries();
  renderProjects();
  renderGallery();
  renderWhy();
  renderProfile();
  renderTestimonials();
  renderProcess();
  renderFooter();
  setupNavigation();
  setupQuoteInteractions();
  setupLightbox();
  observeReveals();
});
