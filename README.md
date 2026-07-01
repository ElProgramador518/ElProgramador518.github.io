# Eazy Way Shuttles Waitlist Site
### v1.0.0

Static GitHub Pages landing page for the Eazy Way Shuttles waitlist.

## Structure

```txt
.
├── index.html
├── CNAME
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/main.css
│   ├── js/main.js
│   └── img/
│       ├── EWS-Logo-transparent-v1.png
│       └── EazyWayShuttlesMarketingConcept.png
└── .github/workflows/pages.yml
```

## Required setup before publishing

1. Add these image files to `assets/img/`:
   - `EWS-Logo-transparent-v1.png`
   - `EazyWayShuttlesMarketingConcept.png`

2. Replace the Google Form iframe URL inside `index.html`:

```html
<iframe src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" ...></iframe>
```

Use Google Forms → Send → Embed icon `<>` → copy the iframe `src` URL.

3. Confirm the custom domain in `CNAME`:

```txt
waitlist.eazywayproductions.com
```

4. In GitHub repository settings:
   - Go to **Settings → Pages**
   - Source: **GitHub Actions**
   - Enable **Enforce HTTPS** after DNS is verified.

## Security notes

- Do not commit API keys, passwords, Google Sheet edit links, private response links, or `.env` files.
- Keep the form data inside Google Forms/Sheets, not GitHub Pages.
- The landing page includes a basic Content Security Policy in `index.html`.
- Only collect minimal waitlist information: name, email, city/area, and interest.