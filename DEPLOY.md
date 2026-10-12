# Going live: okwaretech.com (business) + dedan.okwaretech.com (portfolio)

What `dig` showed on 2026-10-12:
- Namecheap delegates okwaretech.com to Cloudflare (`katja` / `arvind.ns.cloudflare.com`), so **DNS records are edited in Cloudflare only**.
- `okwaretech.com` → A `216.198.79.1` (Vercel); `www` → CNAME `5db1398af65cc8ce.vercel-dns-017.com` (Vercel). Both serve the portfolio today.
- Mail runs on Cloudflare Email Routing (MX `route1-3.mx.cloudflare.net` + SPF TXT). **Never edit MX or TXT records** — info@okwaretech.com depends on them.

The order below gives the portfolio its new address *before* the apex moves, so neither site is ever offline.

## Step 1 — Namecheap: confirm, change nothing
1. namecheap.com → Domain List → **Manage** next to okwaretech.com.
2. Under **Nameservers** it must say **Custom DNS** with `katja.ns.cloudflare.com` and `arvind.ns.cloudflare.com`.
3. Leave it. Records added under Namecheap's "Advanced DNS" are ignored while Cloudflare is in charge.

## Step 2 — Publish the business site to GitHub
1. github.com → New repository → name `okwaretech`, private or public, **no** README.
2. In a terminal in this folder:
   ```
   git add -A
   git commit -m "feat: OkwareTech business site"
   git remote add origin git@github.com:okwareddevnest/okwaretech.git
   git push -u origin main
   ```

## Step 3 — Create the Vercel project
1. vercel.com → **Add New… → Project** → import `okwaretech`.
2. Framework preset: **Next.js** (auto-detected). No environment variables. **Deploy**.
3. Open the `okwaretech-xxxx.vercel.app` link it gives you and click through the pages.

## Step 4 — Give the portfolio its subdomain (portfolio still live on the apex)
1. Vercel → **my-portfolio** project → **Settings → Domains** → type `dedan.okwaretech.com` → **Add**.
2. Vercel shows a record to create, e.g. `CNAME dedan → <something>.vercel-dns-0xx.com`. Copy that exact value.
3. Cloudflare → okwaretech.com → **DNS → Records → Add record**:
   - Type `CNAME`, Name `dedan`, Target = the value from Vercel
   - **Proxy status: DNS only** (click the orange cloud so it turns grey)
   - Save.
4. Back in Vercel, wait for **Valid Configuration** (usually 1–5 minutes; Vercel issues SSL automatically).
5. Open https://dedan.okwaretech.com — your portfolio should load.
6. Deploy the portfolio change that makes it call itself `dedan.okwaretech.com` (already edited in `my-portfolio/lib/site.ts` and `components/Footer.tsx`):
   ```
   cd ../my-portfolio
   git add lib/site.ts components/Footer.tsx
   git commit -m "chore: move portfolio to dedan.okwaretech.com"
   git push
   ```

## Step 5 — Move okwaretech.com to the business site
Do 1 and 2 back to back; the gap is about a minute.
1. Vercel → **my-portfolio** → Settings → Domains → on `okwaretech.com` click **⋯ → Remove**; do the same for `www.okwaretech.com`. Keep `dedan.okwaretech.com`.
2. Vercel → **okwaretech** → Settings → Domains → add `okwaretech.com`. When asked, also add `www.okwaretech.com` and choose **Redirect www to okwaretech.com**.
3. Check the values Vercel shows against Cloudflare:
   - `A @ 216.198.79.1` — already exists, leave it (grey cloud).
   - `CNAME www → …vercel-dns…` — already exists; if Vercel shows a different target, **Edit** the record in Cloudflare to match. Grey cloud.
4. Wait for **Valid Configuration** on both domains.

## Step 6 — Verify
- https://okwaretech.com → business site. https://www.okwaretech.com → redirects to it.
- https://okwaretech.com/resume → redirects to https://dedan.okwaretech.com/resume (old links keep working).
- https://dedan.okwaretech.com → portfolio, padlock shown.
- Send an email to info@okwaretech.com and confirm it arrives.
- Optional: Google Search Console → add `okwaretech.com` and `dedan.okwaretech.com`, submit `https://okwaretech.com/sitemap.xml`.

## Troubleshooting
- **"Invalid Configuration" for a long time:** the Cloudflare record is orange (proxied) or the target was mistyped. Set it to DNS only and copy the target from Vercel again.
- **Too many redirects:** a record got proxied while Cloudflare SSL is "Flexible". Turn the proxy off, or set SSL/TLS → **Full (strict)**.
- **"Domain is already in use by another project":** it is still attached to my-portfolio — remove it there first (Step 5.1).
- **Roll back:** remove `okwaretech.com` from the okwaretech project and add it back to my-portfolio. DNS does not change.
