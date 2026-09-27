# Torah B'Ahava — fundraising page

A one-page bilingual (English / עברית) donation site for the bein hazmanim
learning program. Donations go through Nedarim Plus.

## The one file that matters

**`index.html` is the entire website.** Every photo, the video, the logo and the
fonts are baked inside it, so it needs nothing else to work. Upload just that
file and the site is live — GitHub Pages serves `index.html` automatically.

## Files

| File | What it is |
|---|---|
| `index.html` | **Generated.** The finished website. Don't edit by hand — the next build overwrites it. |
| `template.html` | **The source.** This is the one you edit. |
| `build.ps1` | Squeezes the media and bakes it into `index.html`. |
| `images/` | The original photos, logo and video clip. |

## Making a change

1. Edit `template.html`
2. Run the build:

   ```
   powershell -ExecutionPolicy Bypass -File build.ps1
   ```

3. Upload the new `index.html`

## Settings you might want to change

They're all together at the top of the `<script>` in `template.html`, in `CONFIG`:

- `donateUrl` — the Nedarim Plus page
- `shareUrl` — the public address of this page, used by the share buttons.
  **This has to be set by hand.** The page often runs inside a frame, where its
  own address is not the link you'd send anyone.
- `phone` — the rabbi's number, or `""` to hide the line
- `raised` / `goal` — leave both empty and the progress bar stays hidden

Wording lives in the `T` object just below, with `en` and `he` side by side.

## Notes worth keeping

- **Donors must pick בני עלייה** on the Nedarim Plus form or the money misses
  this program. The page says so in three places.
- **Video must be H.264.** The original phone clip was VP9, which iPhones will
  not play. The exact ffmpeg command is in the comments in `build.ps1`.
- **Don't save the logo as a PNG.** As a PNG it encoded to 439 KB; as a JPEG,
  47 KB — and it is embedded more than once.
