# Jetty styling

`jetty.css` is the shared source for Jetty’s visual tokens and Backstage controls.
It is imported once by `src/styles.css`. Use the existing front-page header and
navigation as the visual reference.

## Rules

- Backstage uses `--jetty-font` (serif) everywhere: body copy, headings, tables,
  dates, buttons, inputs, selects, and textareas. Inherit it; do not add a separate
  sans-serif or monospace font to a page.
- Use white and neutral gray tokens. Do not introduce green or other brand
  accents. `--jetty-error` is reserved for error feedback.
- Keep the grain visible. Normal panels use `--jetty-surface` (transparent).
  Dialogs and dropdowns use `--jetty-overlay`, which repeats the same grain over
  an opaque background so underlying content cannot show through.
- Reuse `src/components/header.astro`, including its serif underlined links and
  `𒀭` separators. Add Backstage destinations to `src/lib/backstage/navigation.ts`;
  do not introduce a separate navigation bar.
- Shared button, field, link, focus, and disabled styles belong in `jetty.css`.
  Page styles own layout and feature-specific states and consume the shared
  tokens instead of declaring new colors or font families.
- Existing specialized player, archive-card, and donation styles are outside
  the Backstage rules; do not restyle them incidentally.

## Before finishing a UI change

Inspect the actual page on desktop and mobile. Check the computed font on body
copy, a form control, and table or episode details. Check keyboard focus and
hover, white text over the grain, and dropdown/dialog readability. Verify that
Backstage remains available when `PUBLIC_SITE_FLOW` is off. Use compilation,
type checking, and existing tests; do not add tests unless requested.
