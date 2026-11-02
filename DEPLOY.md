# Going live: okwaretech.com

What `dig` showed on 2026-10-12:
- Namecheap delegates okwaretech.com to Cloudflare (`katja` / `arvind.ns.cloudflare.com`), so **DNS records are edited in Cloudflare only**.
- `okwaretech.com` → A `216.198.79.1` (Vercel); `www` → CNAME `5db1398af65cc8ce.vercel-dns-017.com` (Vercel). Both serve the portfolio today.
- Mail runs on Cloudflare Email Routing (MX `route1-3.mx.cloudflare.net` + SPF TXT). **Never edit MX or TXT records**: info@okwaretech.com depends on them.

## Step 1: Namecheap, confirm and change nothing
1. namecheap.com → Domain List → **Manage** next to okwaretech.com.
2. Under **Nameservers** it must say **Custom DNS** with `katja.ns.cloudflare.com` and `arvind.ns.cloudflare.com`.
3. Leave it. Records added under Namecheap's "Advanced DNS" are ignored while Cloudflare is in charge.

## Step 2: Publish the business site to GitHub
1. github.com → New repository → name `okwaretech`, private or public, **no** README.
2. In a terminal in this folder:
   ```
   git add -A
   git commit -m "feat: OkwareTech business site"
   git remote add origin git@github.com:DecodeDedan/okwaretech.git
   git push -u origin main
   ```

## Step 3: Create the Vercel project
1. vercel.com → **Add New… → Project** → import `okwaretech`.
2. Framework preset: **Next.js** (auto-detected). No environment variables. **Deploy**.
3. Open the `okwaretech-xxxx.vercel.app` link it gives you and click through the pages.

## Step 4: Connect the production domains
1. Vercel → **okwaretech** → Settings → Domains → add `okwaretech.com`.
2. Also add `www.okwaretech.com` and choose **Redirect www to okwaretech.com**.
3. Check the values Vercel shows against Cloudflare:
   - `A @ 216.198.79.1`: already exists, leave it (grey cloud).
   - `CNAME www → …vercel-dns…`: already exists; if Vercel shows a different target, **Edit** the record in Cloudflare to match. Grey cloud.
4. Wait for **Valid Configuration** on both domains.

## Step 5: Verify
- https://okwaretech.com → business site. https://www.okwaretech.com → redirects to it.
- Founder portfolio links resolve to https://okwaretech.com.
- Send an email to info@okwaretech.com and confirm it arrives.
- Optional: Google Search Console → add `okwaretech.com`, submit `https://okwaretech.com/sitemap.xml`.

## Troubleshooting
- **"Invalid Configuration" for a long time:** the Cloudflare record is orange (proxied) or the target was mistyped. Set it to DNS only and copy the target from Vercel again.
- **Too many redirects:** a record got proxied while Cloudflare SSL is "Flexible". Turn the proxy off, or set SSL/TLS → **Full (strict)**.
- **"Domain is already in use by another project":** remove `okwaretech.com` from the other Vercel project first. DNS does not change.
