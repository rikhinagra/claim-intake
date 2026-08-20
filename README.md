# Claim Intake

A multi-step case intake form for a personal injury law firm. Collects case type, contact details, accident information, and injury details across five steps, then shows a confirmation with a case reference number.

## Stack

- Next.js (App Router) with TypeScript
- Tailwind CSS v4
- Framer Motion for the step transitions and animations
- Lucide for icons

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

- `src/app` — routes, layout, metadata, and the generated favicon/social image files
- `src/components/wizard` — the step-by-step form itself, including per-step components under `steps/`
- `src/components/ui` — small shared pieces like form fields and pill selectors
- `src/lib` — form data types and site-wide config (domain, title, colors used for the social preview image)
- `src/assets` — font files used to render the Open Graph image

## Things to know before deploying

- There is no backend yet. Submitting the form does not send an email or save anything to a database — it just shows the confirmation screen. Wiring that up is the next piece of work.
- `src/lib/site-config.ts` has a placeholder domain (`https://example.com`). Update `SITE_URL` there once the real domain is live, since the sitemap, robots.txt, and social preview links all read from it.
- Form progress is saved to the browser's session storage as people fill it out, so a refresh doesn't wipe what they typed. It clears once they submit.
