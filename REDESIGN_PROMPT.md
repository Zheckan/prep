# Redesign Prompt - Prep Interview Platform

## Project Context

This is "Prep" - an interview preparation platform for multiple positions and levels of experience and skills. It is built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Bun**. The current design uses a dark-first theme with glass morphism effects, yellow accent colors, and an ambient background.

## Task

Your task is to completely redesign the styling and visual identity of this website. Create an incredible, creative, and unique design that pushes the limits of modern web design capabilities. The goal is to transform this from a basic study resource into a visually stunning, professional interview prep platform.

## Requirements

### Tech Stack (already configured - do NOT reinitialize)

- Next.js 16 with App Router (Turbopack)
- Tailwind CSS v4 (using `@theme` directive in `globals.css`, no separate config file)
- React 19
- TypeScript
- Bun
- Framer Motion (already installed for animations)
- Lucide React (icons)

### Design Specifications

Create **A COMPLETE REDESIGN of the entire website** that replaces the current styling and layout. This includes the homepage, content pages, and shared layout elements.

The redesign should include:

1. **A cohesive visual system** applied across all pages (homepage, topic pages, documentation views)
2. **A unique color palette and typography** that feels fresh and professional
3. **Creative layout and visual hierarchy** - experiment with grids, asymmetry, overlapping elements, scroll effects
4. **Smooth animations** using Framer Motion - page transitions, hover effects, scroll-triggered reveals
5. **Responsive design** that works on mobile, tablet, and desktop
6. **Dark mode support**

### Design Direction

Pick the most compelling direction (or blend ideas) from the following:

- Minimalist/Swiss design - clean grids, strong typography, lots of whitespace
- Glassmorphism/Neomorphism - frosted glass cards, depth effects, layered surfaces
- Bold/Brutalist - raw typography, harsh contrasts, unconventional layouts

### Content to Showcase

- Hero section with platform name and value proposition
- Topics covered: HTML & CSS, JavaScript, React, API Integration
- Study features: Code examples, interactive notes, table of contents navigation
- Call-to-action for getting started

### Technical Constraints

- Use the existing `src/app/` directory structure
- Reuse existing components from `src/components/` where appropriate, or create new ones
- All styles should use Tailwind utility classes and CSS variables defined in `globals.css`
- Maintain accessibility standards (focus states, semantic HTML, ARIA labels)
- Keep Framer Motion animations respectful of `prefers-reduced-motion`
- Dev server runs on the default Next.js port (use `bun run dev`)

### What NOT to Do

- Do NOT reinitialize the project or change the build system
- Do NOT remove existing pages or components (add new ones alongside)
- Do NOT install unnecessary dependencies - use what's already available

## Evaluation Criteria

After creating the redesign, review it by:

1. Opening the dev server (`bun run dev`)
2. Navigating to `/`
3. Checking responsive behavior
4. Verifying animations work smoothly
5. Ensuring no console errors

Iterate and refine until satisfied with the quality.

## Delivery

When the redesign is complete and verified:

1. Commit all changes to the current branch
2. Create a pull request to `main` with a summary of the redesign
