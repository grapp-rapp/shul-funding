# Torah B'Ahava — fundraising page

A static bilingual English/Hebrew site. No database, cookies, or accounts.

## Editing and building

1. Edit template.html — the source for wording, styling, settings, and share metadata.
2. Run: powershell -ExecutionPolicy Bypass -File build.ps1
3. Publish generated index.html AND share-preview.jpg at the site root.

Photos and video are embedded in index.html. The separate image is for WhatsApp link previews. artifact.html is a generated fragment; never serve it as the website.
Keep template.html, build.ps1, and images/ in Git for future edits.
If the domain changes, update CONFIG.shareUrl and the canonical/Open Graph URLs at the top of template.html, then rebuild.

## Deliberate choices

- Light theme only; no money figures, head counts, fixed day counts, or suggested amounts.
- The rabbi's name and phone appear only in the footer contact line.
- The expanded Nedarim URL preselects בני עלייה / Teen Programing. Do not tell donors to choose a fund.
- The full-screen payment overlay loads on the first Donate click and includes a new-tab fallback.
- Leave the alternative API payment path disabled: apiValid and fund.groupe stay empty.
- Hebrew opens for a Hebrew browser language; otherwise English. The toggle works without storing preferences.
- Video must remain H.264/AAC for iPhone compatibility.

## Payment verification

An authorized adult still needs to complete the small live donation test described in HANDOFF.md, including bank verification, and confirm it reached the intended fund. If embedded bank verification fails, set CONFIG.embedDonate to false and rebuild.

## Rollback

A dated rollback ZIP beside the working files contains the previous source, build, generated pages, and documentation. Keep it locally; do not publish it. Restore those files to undo this update. Original images are unchanged. Git history also preserves the previous site.
