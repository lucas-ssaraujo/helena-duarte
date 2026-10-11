# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## User design decisions
- Combine displayed concept 1 with concept 3 from the October 11, 2026 ideation set.
- Keep dark/violet/lavender LPZ-inspired aesthetic, concept 1 typography and layout, concept 3 warm office photograph and standing doctor.
- Doctor is fictional: Dra. Helena Duarte, dermatologist, Belém. Never fabricate medical registrations, patient testimonials, or real appointment/contact destinations.
- Provide Windows localhost launcher in downloadable package, consistent with this conversation.

- October 11 iteration: user approved visual and requested more animation and more attractive copy. Keep original hero headline and palette. Use restrained entrance/reveal/hover motion, respect reduced-motion. Git/Vercel is a later step; prepare deployable code without publishing now.
