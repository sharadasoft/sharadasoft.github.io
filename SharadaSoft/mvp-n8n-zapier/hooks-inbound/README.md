# `/hooks/inbound` — ImprovMX webhook receiver

Static GitHub Pages cannot receive ImprovMX POSTs. Deploy this tiny Worker, then point aliases at its URL.

## Option A — Cloudflare Workers (recommended)

1. Install Wrangler: `npm i -g wrangler` then `wrangler login`
2. From this folder:

```bash
cd SharadaSoft/mvp-n8n-zapier/hooks-inbound
npm install
npx wrangler deploy
```

3. Copy the URL, e.g. `https://sharada-inbound.<you>.workers.dev/hooks/inbound`
4. In ImprovMX → Aliases → `hello@` forward to:

```text
goverdhan.c@gmail.com, https://sharada-inbound.<you>.workers.dev/hooks/inbound
```

(Keep your real human inbox first; comma-separate the webhook.)

5. Optional: set secrets

```bash
npx wrangler secret put FORWARD_ZAPIER_HOOK   # Zapier Catch Hook URL
npx wrangler secret put WEBHOOK_SECRET        # shared token you check via ?token=
```

If `FORWARD_ZAPIER_HOOK` is set, every inbound POST is also forwarded to Zapier so your Router Zap can run.

## Option B — Zapier Catch Hook only (no Worker)

1. Create a Zap: **Webhooks by Zapier → Catch Hook**
2. Copy the Catch URL
3. ImprovMX `hello@` forward:

```text
goverdhan.c@gmail.com, https://hooks.zapier.com/hooks/catch/...
```

No custom `/hooks/inbound` path, but same effect for MVP.

## ImprovMX SMTP (sending as support@)

In ImprovMX dashboard → **Email Sending**:

1. Enable SMTP for `sharadasoft.com`
2. Add DNS records ImprovMX shows (SPF/DKIM)
3. Create SMTP credentials (or per-alias send)
4. In Zapier/n8n, send via that SMTP with From = `support@sharadasoft.com`

Until SMTP is verified, bots can still **Create Draft** in Gmail.
