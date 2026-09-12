# AGENTS.md

Guidance for AI coding agents (e.g. Mistral Vibe) working in this repository.

## Project

This repo generates a slide deck (reveal.js) used to support a Playwright/Cypress
end-to-end testing training. A single source tree renders into three variants:
Playwright Node (`nodepw`), Playwright Python (`pypw`), and Cypress (`cy`),
selected at build time.

## Build & dev commands

- `npm run nodepw` — dev: watch `src/`, rebuild into `build/`, serve via browser-sync (Playwright Node variant). Use this for live preview.
- `npm run pypw` — same, Playwright Python variant.
- `npm run cy` — same, Cypress variant.
- `npm run build-nodepw` — one-shot build of the Playwright Node variant into `build/`.
- `npm run build-pypw` — one-shot build of the Playwright Python variant into `build/`.
- `npm test` — mocha suite (jsdom) covering build helpers in `src/js/`. Run this for any change to `src/js/`.
- PDF export (run while a dev server is up):
  `decktape --chrome-path /snap/bin/chromium reveal http://localhost:3000 presentation.pdf`

## Variant

The deck renders into variants: Playwright Node (`nodepw`), Playwright Python
(`pypw`), and Cypress (`cy`). The `build.js` context is: `e2eTool`, `cy`, `pw`,
`nodepw`, `pypw`. The `pw` flag is shared — it is true for both `nodepw` and
`pypw`, so `<if-pw>` / `{% if(pw) %}` content is shown for all Playwright
variants. Variant-specific content uses `<if-nodepw>` / `{% if(nodepw) %}` or
`<if-pypw>` / `{% if(pypw) %}`.

**If the user does not specify a variant, ask every time.** Offer the choices:
`nodepw`, `pypw`, `cy`, or all. Do not default to one without asking. When a
change touches `<if-pw>` / `<if-cy>` / `<if-nodepw>` / `<if-pypw>` / `{% if(pw) %}`
/ `{% if(cy) %}` / `{% if(nodepw) %}` / `{% if(pypw) %}` conditionals, the same
source renders multiple variants — verify the relevant variants aren't broken.

## Language

Write new slide content in **English**. Match the existing style of surrounding slides.

## Code snippets

For the `pypw` variant, always use the **Python Playwright sync API**
(`from playwright.sync_api import sync_playwright`,
`with sync_playwright() as p:`). Do not use the async API in snippets.

## Architecture

- `src/index.html` — master layout. It is the ordered manifest of training parts
  (the `{%- await include('ejs/<part>/main.ejs') %}` order is the slide order).
  Reorder parts here; add/remove parts here.
- `src/ejs/<part>/` — one folder per training part. Each has a `main.ejs` that lists
  the part's slides in order. Add a slide by creating a partial `.ejs` and including
  it in the part's `main.ejs`.
- `src/ejs/components/` — reusable slide scaffolding (`slide--partTitle.ejs`,
  `bdd-workflow.ejs`, …). Prefer these over hand-writing section structure.
- `src/md/` — markdown slides loaded by `data-markdown` from `index.html`.
- `src/css/` — SCSS themes. `presentation.scss`, `playwright-light.scss`,
  `cypress-light.scss`, `dark-theme.scss`, etc. Sass compiles to `build/css`.
- `src/js/` — build helpers (`html-processor.js`, `dom.js`, …) and presentation
  runtime. Tested by `test/` (mocha + jsdom).
- `src/build.js` — renders EJS templates → `build/`. Applies the post-processing
  pipeline in `src/js/html-processor.js` (`removeFalsyIfs`, `leftPadCode`,
  `processLinkTags`, `processExerciseTags`, `processLinks`, `processHelpTags`).
- `src/watch-templates.js` — rebuilds templates on `src/` change.
- `build/` — gitignored, regenerated. Never hand-edit.
- `node_modules/` — gitignored.

## EJS conventions

Delimiters are custom: `{` and `}` (see `build.js`), not the EJS default `<% %>`.
So conditionals look like `{% if(pw) { %}` and includes `{%- await include(...) %}`.
Use the established `<if-pw>` / `<if-cy>` / `<if-nodepw>` / `<if-pypw>` and
`{% if(pw) %}` / `{% if(cy) %}` / `{% if(nodepw) %}` / `{% if(pypw) %}` patterns
already in the templates; do not introduce the default EJS delimiters.

Slides are reveal.js `<section>` elements. Use `fragment` classes for reveal steps,
`app-exercise` for practice blocks, `data-tags` on headings for categorization,
and `<aside class="notes">` for speaker notes (see `slide--partTitle.ejs`).

## Ask when unclear

When a prompt is not specific enough, **do not suppose — ask clarifying questions.**
Prefer one focused question over guessing. This applies to the variant, the target
slide/part, the scope of the change, and anything else ambiguous.

## Testing & verification

- For changes to `src/js/`: run `npm test`.
- For SCSS / EJS / slide-content changes: there is no automated render test.
  Do **not** run build/dev commands (`npm run pw`, `npm run build-pw`, etc.) —
  the user runs these themselves to visually check the result. After a change,
  tell the user to run `npm run pw` (or the relevant variant) and check in the
  browser. Do not claim a render is correct without the user confirming it.
