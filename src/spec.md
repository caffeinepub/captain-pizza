# Specification

## Summary
**Goal:** Fix the frontend white/blank screen by mounting the existing TanStack Router from `App` and showing a friendly error fallback if initial render fails.

**Planned changes:**
- Update `frontend/src/App.tsx` to render the TanStack Router provider wired to the existing `routeTree`, without modifying `frontend/src/main.tsx`.
- Add a minimal runtime render error fallback so unexpected initialization/render errors show an English message with a refresh instruction instead of a blank screen.

**User-visible outcome:** The site loads normally (no white screen), and navigating directly to `/`, `/menu`, `/about`, `/contact`, `/signup`, and `/checkout` displays the corresponding pages; if something goes wrong during startup, users see a readable error message telling them to refresh.
