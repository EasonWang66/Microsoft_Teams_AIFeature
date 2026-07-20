# Microsoft_Teams_AIFeature

## Description

This project showcases a prototype for an AI-powered Microsoft Teams meeting extension concept called Align. The extension audits a Teams meeting experience in real time, summarizes key discussion points, extracts action items, and converts selected suggestions into structured work items that can be saved to a project dashboard.

This build focuses on a polished prototype flow rather than a production AI integration. It uses long-form dummy Teams meeting data and curated mock AI outputs to demonstrate the intended user experience: a Teams-style meeting canvas, an Align side panel, automatically sequenced AI-generated messages, work item cards, detailed work item review, and a save-to-project interaction.

The prototype is designed around Microsoft Fluent UI visual patterns where possible, including Segoe UI typography, Teams-inspired toolbar structure, compact work item cards, Fluent-style spacing, accessible button states, and restrained interaction feedback. The primary target is a fixed desktop demonstration canvas with a minimum width of 1200px for use in portfolio, Framer, GitHub, and Vercel presentation contexts.

## Link to Live Demo

[https://microsoft-teams-ai-feature.vercel.app/](https://microsoft-teams-ai-feature.vercel.app/)

## Tools and Technologies Used

Next.js — app framework, local development server, and production build pipeline
React — component-based interface for the Teams canvas, Align panel, staged message flow, and work item modal
TypeScript — typed mock transcript data, audit data structures, and UI state
CSS3 — custom properties, fixed-width desktop canvas, grid layout, transitions, keyframe animations, and Fluent-inspired styling
Segoe UI — bundled Microsoft-style typography for the prototype interface
Figma — source of truth for detailed UI references and future design handoff
Git & GitHub — version control and repository hosting
Vercel — intended hosting and deployment target for embedding or linking from a Framer website

## Pages

/ — Prototype: Microsoft Teams-style meeting background with four meeting participants, a highlighted Align toolbar entry, and the Align side panel.

The prototype currently includes:

Welcome state — Align introduction screen with Start control.
Generated message flow — after Start, AI messages appear in sequence with animated timing.
Summary — key discussion points extracted from the mock meeting transcript.
Action Items — follow-up items with owners and project context.
Work Items — dashboard-ready suggested work items displayed as cards.
Work Item Detail — modal view opened from each work item card, with metadata, task checklist, attachments, and project actions.
Save to Project — animated saving state, saved confirmation, and success message with a View in Align button for future dashboard navigation.

The audit content is driven by shared mock data and helper logic in `src/lib/`, so the prototype behaves like a connected feature concept rather than a static mockup.

## Responsive Strategy

Built desktop-first for a fixed presentation canvas:

Base (1200px minimum) — fixed-width Teams meeting experience with a right-side Align panel and full meeting background.
Large desktop — the canvas remains stable so the prototype can be presented consistently in portfolio, Framer, and Vercel contexts.
Narrower browser windows — horizontal overflow is allowed so the 1200px prototype layout does not collapse or distort.

The interface can be adapted into a responsive experience later, but this prototype intentionally prioritizes visual accuracy and controlled presentation fidelity.

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```text
Microsoft_Teams_AIFeature/
  next.config.mjs        Next.js configuration
  package.json           scripts and dependencies
  pnpm-lock.yaml         dependency lockfile
  tsconfig.json          TypeScript configuration
  src/
    app/
      layout.tsx         app metadata and root layout
      page.tsx           main Teams + Align prototype experience
      globals.css        Segoe UI fonts, Fluent-inspired styling, layout, and animations
      api/audit/route.ts mock audit API endpoint
    lib/
      auditEngine.ts     curated summary, action item, and work item generation
      mockTeamsTranscript.ts long dummy Teams meeting transcript
      types.ts           shared TypeScript data models
  public/
    align-panel/         Align panel icons, references, work item assets, and detail icons
    fonts/segoe-ui/      bundled Segoe UI font files
    teams-background/    Teams toolbar, logo, and meeting control assets
    teams-meeting-photo/ participant meeting images
```
