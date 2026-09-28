# Finish the free setup

Learning and city-selected zmanim work without a database. Tehillim submissions, counters, question approval and fundraising figures stay hidden until storage and the admin password are configured.

1. Open **shul-funding** in Vercel → **Storage → Create Database → Upstash → Upstash for Redis**. An adult account owner should accept the Marketplace/Upstash terms. Choose **Free**, not Pay As You Go. Connect it to this project's **Production** environment. Keep Preview separate from the real list. The integration should add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. The older names `KV_REST_API_URL` and `KV_REST_API_TOKEN` also work.
2. In **Settings → Environment Variables**, add `ADMIN_PASSWORD` to **Production**. Choose a unique password of at least 16 characters and keep it private. Do not put it in Git or send it in chat. Optionally set a separate random `RATE_LIMIT_SECRET`; otherwise the password signs the anti-spam identifiers.
3. **Analytics → Enable → Web Analytics on Hobby** is already enabled. The official `@vercel/analytics` package is included. The free plan caps ingestion at 50,000 events per month; no paid upgrade is needed.
4. **Deployments → latest deployment → ⋯ → Redeploy**, after setting the variables. Open `/admin` on the live website and sign in. Submit one test name, approve it, check the public list, then remove it. An actual database test is still required once the database exists.
5. In `/admin`, enter verified **raised so far**, **goal** and optional **donor count**. Leave these blank until known. Have a rav review both languages of each question set, then select that Parsha, check the confirmation and approve it. Until approved, it stays off the website.

## Storage and privacy

- Names are pending by default. They expire 30 days after submission or renewal; Redis expires the records automatically. No scheduled task is needed.
- Counts represent page loads and voluntary Tehillim reports, not unique people. Weeks reset Sunday at midnight in Israel; weekly records expire after eight days.
- No raw IPs are written to this database. Submission/login/Tehillim abuse limits use keyed, daily-changing hashes, expiring within 24 hours (login: 15 minutes). These are temporary anti-spam identifiers; hosting providers may retain operational logs.
- Admin sessions are signed, last at most one hour, and stay only in the open tab's memory. Signing out or closing the tab discards the token. Changing `ADMIN_PASSWORD` invalidates sessions. Our code uses no cookies or local storage. Third-party learning and payment pages have their own policies.
- Choose free/capped plans and do not enable paid upgrades. If storage is unavailable, dependent sections hide and admin saves report failure.

## Nedarim Plus: information still needed

No documented read-only fundraising totals endpoint for this account could be verified. The payment iframe API and NedarimDocs receipt API do not establish that such an endpoint exists. No guessed endpoint or payment credential was added.

Ask the account owner or Nedarim support:

> Do you have a read-only API that returns the total raised and, if available, donor count for **Mosad 7006016 (דודי לי), specifically בני עלייה / Teen Programing**, the fund selected by `https://www.matara.pro/nedarimplus/online/?S=Pouv`? Please provide the official documentation, endpoint and authentication method, exact fund/Groupe identifier, a read-only credential, and definitions for currency, date range, refunds, cancelled transactions, recurring payments and donor count.

Do not reuse a payment `ApiValid` credential as a reporting password. Once reporting documentation is confirmed, credentials can be kept in Vercel variables and the result cached server-side for ten minutes. Manual figures work independently now.

## Editing and publishing

- Existing page: edit `template.html`; run `powershell -ExecutionPolicy Bypass -File build.ps1` to regenerate `index.html` and `artifact.html`.
- New cards: `community.js`, `community.css`, `learning-data.js`. City choices are verified Israeli GeoNames IDs. New schedules use Israel (`i=on` / `diaspora=0`). The existing Ohr Hayom overlay remains unchanged and controls its own schedule.
- Questions: **`content/parsha-questions.REVIEW.json`** has 54 single parshas and seven doubles, five bilingual questions each. All are drafts requiring rav review. Source references give chapter ranges. Edit this JSON directly. `scripts/question-drafts.cjs` records initial generation; rerunning it overwrites JSON edits. Changing a set invalidates its approval checksum.
- Draft JSON is excluded from static hosting; only approved sets are served by the public API. Drafts remain visible to anyone who can read the Git repository.
- Vercel runs `npm run build`, publishing allowlisted `dist` files and the two `/api` functions. Source HTML, server code, review drafts and backups are not static downloads.
- `npm test` checks authentication, moderation, expiry filtering, approvals, Israel date/week boundaries, monthly Tehillim, input validation and build exclusion. These tests simulate storage calls; an actual Redis integration check remains necessary after setup.
- `npm run dev` serves `http://127.0.0.1:4173`. Missing environment variables never cause sample fundraising figures or sample names to appear.

## Rollback

The previous site is backed up in `rollback-community-20260928-143650.zip` next to the working folder and Git commit `2ba2566`. Restore the earlier Git version and redeploy if needed. Do not publish the ZIP. Database data is separate; rolling back page files does not erase it.

## Sources

- https://www.hebcal.com/home/1663/zmanim-halachic-times-api
- https://www.hebcal.com/home/197/shabbat-times-rest-api
- https://developers.sefaria.org/reference/get-calendars
- https://vercel.com/docs/analytics/quickstart
- https://upstash.com/pricing/redis
