# Turbo AI CMS setup

The CMS is an optional layer on the existing Vite site. With `VITE_CMS_ENABLED=false` (the default), authored pages and routes render as before. `/admin` shows setup instructions until a Supabase URL and publishable key are configured. No production service has been changed by these files.

## Architecture and access

- React keeps the existing layouts and structural components. Supabase Postgres stores Pages, Products, Industries, Solutions, and Blog entries. Supabase Storage holds uploaded images. Supabase Auth handles administrator passwords and sessions.
- Browser code receives only the project URL and **publishable** key. Row Level Security (RLS) limits public reads to published entries and CMS writes to members of `cms_admins`.
- Markdown is rendered without raw HTML. Image uploads accept PNG, JPEG, WebP, AVIF, and GIF up to 8 MB. The media bucket is public; never upload private files.
- The checked-in seed at `supabase/seed/cms-entries.json` is a snapshot of the authored content. The original TypeScript content remains in the repo. The import script only inserts missing `(kind,slug)` pairs and leaves CMS edits unchanged on repeat runs.

## Activate a new project

1. Create a Supabase project. In its SQL editor, run `supabase/migrations/202609290001_cms.sql`. Review the policies in your project before enabling the public CMS.
2. Create one administrator in Supabase Auth. Find that user's UUID and add it in the SQL editor:

   ```sql
   insert into public.cms_admins(user_id) values ('YOUR_AUTH_USER_UUID');
   ```

   The dashboard has no public registration flow. Additional administrators require the same explicit membership step.
3. Regenerate the local seed after authored content changes: `npm run cms:export`. Import it once, using environment variables **only in your local shell**:

   ```powershell
   $env:CMS_SUPABASE_URL='https://YOUR_PROJECT.supabase.co'
   $env:CMS_SUPABASE_SECRET_KEY='YOUR_SECRET_KEY'
   npm run cms:import
   Remove-Item Env:CMS_SUPABASE_SECRET_KEY
   ```

   The secret key is for this local import only. Do not put it in a `VITE_` variable, browser code, `.env`, hosting frontend variables, or Git.
4. Copy `.env.example` to a local `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. Keep `VITE_CMS_ENABLED=false` while you sign in at `/admin/login` and review imported entries. Set it to `true` only after the migration and seed are complete. Restart Vite after changing env values.
5. Build with `npm run build`. When CMS mode is enabled, the build fetches published entries, prerenders those routes, and creates a sitemap containing only indexable published records. A CMS connection or content error fails the build rather than publishing an incomplete sitemap. `/admin` is excluded from the sitemap and disallowed in `robots.txt`. The build also generates `404.html`; the supplied Netlify and Vercel routing configurations serve published prerendered pages, rewrite `/admin/*` to the app, and return HTTP 404 for unknown direct URLs.

## Publishing workflow

- Save drafts and preview their Markdown inside `/admin`. Published records can be opened from the editor. Only published records are readable through the public API.
- A publish, unpublish, slug, or SEO change takes effect in the client rendered site, subject to a 30 second in-memory content cache. **Previously deployed prerendered HTML remains accessible until a fresh build is deployed.** For an urgent unpublish, rebuild and deploy immediately; without a rebuild hook or server-side rendering, a static host cannot remove its previous HTML on its own. Arrange a rebuild in your hosting workflow when you decide to deploy; this repository does not trigger one automatically.
- Changing a slug creates a client side redirect record for the old URL when the target is published. For search engine level HTTP 301 redirects, add the old and new paths to your hosting redirects configuration before deploying.
- Existing Home, About, Products, Industries, and service layouts remain coded in React. Their hero copy/images, SEO, and optional extra Markdown sections can be managed in the CMS. Product detail hero/content, industry hero/content, solutions, and blog are connected. Some deeply bespoke text inside existing sections remains authored in code; converting every sentence to CMS fields would alter the current component structure.
- Images under `/cms-seed/` are copies of authored assets used by seed records. They can later be replaced with uploaded media URLs through `/admin/media`.

## Validation and recovery

- Run `npm run lint`, `npx tsc -b --pretty false`, and `npm run build` with the CMS off to check the existing site.
- Run `npm run test:cms-mock` for a local published/draft and sitemap check. It writes a temporary CMS-enabled `dist`; run `npm run build` afterward to restore the normal build. Run `npm run test:smoke` against the restored build.
- Before enabling the CMS, confirm login, unauthorized access denial, create/edit/publish/unpublish/delete for each type, media upload, SEO metadata, sitemap, and mobile layout against your new Supabase project.
- To return to authored content, set `VITE_CMS_ENABLED=false` and rebuild. The migration does not delete existing source content. Export or back up CMS rows and Storage files before destructive database changes.

## Environment variables

| Variable | Used where | Purpose |
| --- | --- | --- |
| `VITE_CMS_ENABLED` | Browser/build | `true` enables published CMS content; default `false`. |
| `VITE_SUPABASE_URL` | Browser/build | Supabase project URL. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser/build | Public project key, protected by RLS. |
| `VITE_BASE_URL` | Build/SEO | Canonical website origin. |
| `CMS_SUPABASE_URL` | Local import only | Project URL for `cms:import`. |
| `CMS_SUPABASE_SECRET_KEY` | Local import only | Privileged seed import credential. Never place in frontend env. |
