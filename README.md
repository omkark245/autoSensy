# AutoSensy

Marketing-site frontend for a WhatsApp automation platform, built with React, Vite, Tailwind CSS, and Framer Motion.

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start the local dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

## Available Scripts

- `npm run dev` starts Vite in development mode.
- `npm run build` creates the production bundle.
- `npm run preview` serves the production build locally.
- `npm run gen:assets` runs the WebP asset generation script.

## Project Structure

```text
src/
  components/
    home/        Homepage sections
    layout/      Header, footer, shared layout pieces
    navigation/  Internal link handling
    ui/          Shared UI components
  data/          Site copy and content data
  hooks/         Reusable React hooks
  pages/         Route-level page components
```

## Current Focus

- Responsive marketing pages
- Reduced-motion support
- Client-side route transitions
- Static route SEO metadata generation
- Trust, FAQ, privacy, terms, and refund policy pages
- Official AutoSensy brand page for exact-brand search discovery
- Keyword landing pages for WhatsApp marketing, WhatsApp Business API, chatbot, broadcast, and team inbox searches
- Industry landing pages for ecommerce, education, real estate, finance, healthcare, and travel WhatsApp automation
- Blog and case-study pages, including the IT Roots client story
- Instagram profile link and brand social structured data
- Contact/demo conversion flow

## Notes

- This project currently uses a lightweight internal router instead of `react-router`.
- `npm run build` creates route-specific static HTML files, `sitemap.xml`, and `robots.txt` for deployment.
- The contact and inquiry forms open pre-filled WhatsApp messages for the sales team.
