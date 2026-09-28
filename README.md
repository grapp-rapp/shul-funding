# Torah B’Ahava

A bilingual fundraising page with daily learning, city-selected Israeli zmanim and moderated community features.

Edit the existing page in template.html, then run `powershell -ExecutionPolicy Bypass -File build.ps1`. Do not hand-edit generated index.html or artifact.html. New cards have their own community.js/community.css; server functions live in api/, with shared code in lib/.

Run `npm install`, `npm run build` and `npm test`. Vercel publishes an explicit allowlist from dist and the server functions. The review JSON is not publicly served. See **SETUP.md** for Vercel setup, admin instructions and Nedarim totals requirements.

Preserve the light cream/teal/gold design, language toggle, header logo and full-screen donation/Parsha overlays. The expanded Nedarim URL preselects בני עלייה / Teen Programing. Keep the alternative payment API disabled. No invented amounts, child counts, day counts or promised raffle rewards. The new admin-controlled progress bar is the owner's explicit exception to the earlier no-money-figures rule: only verified amounts belong there.

An authorized adult still needs to complete the live donation check described in HANDOFF.md. No payment was made during development.

Keep rollback ZIPs out of Git. The pre-community version is commit 2ba2566.
