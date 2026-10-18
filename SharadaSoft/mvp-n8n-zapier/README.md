# MVP: Router + Support L1 (n8n / Zapier)

Self-running bots for **two roles only**:

| Bot | Inbox | What it does |
|-----|--------|----------------|
| Router | `hello@sharadasoft.com` | Classify → forward once → short ack |
| Support L1 | `support@sharadasoft.com` | Draft/send first reply or escalate to L2 |

You already have **Gmail** + **ChatGPT** connected in Zapier. **Webhooks by Zapier** is enabled for ImprovMX catch hooks.

---

## Prerequisites

1. ImprovMX aliases `hello@` and `support@` forward to a mailbox you control (e.g. `goverdhan.k@gmail.com`) **and/or** a webhook URL.
2. ImprovMX **SMTP / Email Sending** enabled if you want From: `support@sharadasoft.com` (optional for MVP — Gmail send-as also works).
3. OpenAI access via Zapier ChatGPT (already connected).

---

## Live Catch Hook (already created)

```text
https://hooks.zapier.com/hooks/catch/29169981/41f6ikf/
```

`hello@` ImprovMX forward should be:

```text
goverdhan.c@gmail.com, https://hooks.zapier.com/hooks/catch/29169981/41f6ikf/
```

See `SETUP-STATUS.md` for what’s done vs remaining.

## Path A — Zapier (recommended for you)

### A0. Gmail labels + filters (5 minutes)

In Gmail (`goverdhan.k@gmail.com` or whichever receives forwards):

1. Create labels:
   - `bot/router`
   - `bot/support`
   - `bot/drafts` (optional review queue)
2. Create filters:
   - **Has the words:** `deliveredto:hello@sharadasoft.com` OR `to:hello@sharadasoft.com`  
     → Apply label `bot/router`, Never send to Spam
   - **Has the words:** `deliveredto:support@sharadasoft.com` OR `to:support@sharadasoft.com`  
     → Apply label `bot/support`

If ImprovMX doesn’t set `deliveredto`, open one forwarded mail → use the unique header/text you see (often `X-Forwarded-To` or “for hello@…” in the raw headers) in the filter.

### A1. Zap — Router Bot

| Step | App | Action |
|------|-----|--------|
| 1 Trigger | Gmail | **New Labeled Email** → label `bot/router` |
| 2 AI | ChatGPT | **Conversation** (or Extract Structured Data) |
| 3 Paths | Zapier Paths | Branch on `action` |
| 4a | Gmail | **Forward Email** → `route_to` |
| 4b | Gmail | **Create Draft** / **Reply to Email** for customer ack |
| 5 | Gmail | **Add Label** `bot/processed` (optional) |

**ChatGPT system / instructions:** paste `prompts/router-system.txt`

**User message template:**

```
FROM: {{from}}
TO: {{to}}
SUBJECT: {{subject}}
BODY:
{{body plain}}
```

**Require JSON output** (see `prompts/router-system.txt`). Then map:

- `action == "forward"` → Forward to `route_to`, subject = `forward_subject`
- `action == "ack_and_forward"` → Forward + Reply with `ack_body`
- `action == "clarify"` → Reply with `ack_body` only (no forward)
- `action == "security"` → Forward to `security@sharadasoft.com`, **no** customer reply

**MVP safety:** turn OFF auto-send for the first week — use **Create Draft** instead of Reply/Forward, then manually send.

### A2. Zap — Support L1 Bot

| Step | App | Action |
|------|-----|--------|
| 1 Trigger | Gmail | **New Labeled Email** → label `bot/support` |
| 2 AI | ChatGPT | **Conversation** with `prompts/support-l1-system.txt` |
| 3 Paths | Paths | `reply` / `escalate` / `draft` |
| 4a | Gmail | **Reply to Email** with `body` |
| 4b | Gmail | **Forward Email** to `support-l2@sharadasoft.com` |
| 4c | Gmail | **Create Draft Reply** (default for week 1) |

### A3. Optional — ImprovMX webhook trigger

Instead of Gmail labels:

1. Create Zap: **Webhooks by Zapier → Catch Hook**
2. Copy the Catch Hook URL
3. In ImprovMX, set `hello@` forward to:  
   `yourgmail@…, https://hooks.zapier.com/hooks/catch/...`
4. Map webhook fields (`envelope`, `subject`, `text`, `from`) into ChatGPT

Same AI + Gmail steps as above.

### A4. Go-live checklist

- [ ] Test with email to `hello@` from a personal account  
- [ ] Confirm router draft/forward looks right  
- [ ] Test `support@` with a fake FAQ  
- [ ] Flip Reply from Draft → Send only after 10 good drafts  
- [ ] Keep Legal/Security out of MVP  

---

## Path B — n8n

1. Import `n8n/sharada-router-support-mvp.json` into n8n (Cloud or self-hosted).
2. Set credentials: OpenAI (or compatible), SMTP or Gmail OAuth.
3. Activate **Webhook** node → copy Production URL.
4. Point ImprovMX `hello@` and `support@` forwards at that URL (plus human inbox).
5. Switch `MODE` env in the Set node: `draft` (safe) or `send`.

Webhook expects ImprovMX-style JSON (`from`, `to`/`envelope`, `subject`, `text`).

---

## Files in this folder

| File | Purpose |
|------|---------|
| `prompts/router-system.txt` | Paste into Zapier/n8n Router LLM step |
| `prompts/support-l1-system.txt` | Paste into Support L1 LLM step |
| `n8n/sharada-router-support-mvp.json` | Importable n8n workflow |
| `zapier-build-notes.md` | Field mapping cheat sheet |

---

## Expand later

After Router + Support are stable, clone the Support Zap and swap the system prompt for Billing / Success / BDR — same pattern for all 24 roles.
