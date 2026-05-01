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
- Page-level metadata updates
- Contact/demo conversion flow

## Notes

- This project currently uses a lightweight internal router instead of `react-router`.
- The contact and inquiry forms send submissions to `autosensy@gmail.com` through FormSubmit, with a direct `mailto:` fallback if delivery fails.


