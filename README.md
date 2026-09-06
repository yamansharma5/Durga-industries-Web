# Durga Industries Website

Simple production-ready business showcase website for industrial machinery repair, maintenance, fabrication, custom machinery parts, and low-volume/on-demand manufacturing.

This version intentionally removes extra operational complexity such as admin login, database setup, uploads, authentication, and CRM workflows. The goal is to present the business clearly and help visitors connect through phone, WhatsApp, email, and the enquiry form.

## Active Project

```text
frontend/   Next.js website
```

The older root static files and inactive backend files may remain in the folder as reference, but the active website is the Next.js app inside `frontend`.

## Edit Content

Update:

```text
frontend/lib/fallbackContent.js
```

Use this file to edit:

- Company contact placeholders
- Services
- Projects / work showcase
- Gallery images and videos
- Clients / industries

Use placeholders until real information is confirmed. Do not add unsupported client names, certifications, years of experience, machine specifications, revenue, project counts, or statistics.

## Pages

```text
/             Landing page: About, Services, Clients, Industries, Contact
/projects     Separate project showcase page
/gallery      Separate workshop/work gallery page
```

## Photos

Replace placeholder images in:

```text
frontend/public/assets/images/
```

Then update the image paths in `frontend/lib/fallbackContent.js` if filenames change.

## Contact / Enquiry Form

The enquiry form does not store data or upload files. It prepares an enquiry message and opens:

- Email, if `fallbackContact.email` is set
- WhatsApp, if `fallbackContact.whatsapp` is set

This keeps the site simple and avoids backend/database maintenance.

## Run Locally

```bash
npm install --prefix frontend
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

## Deploy on Vercel

Deploy the `frontend` directory.

Optional environment variable:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

No Render backend, Mongo database, admin login, or upload storage is required for this simplified version.
