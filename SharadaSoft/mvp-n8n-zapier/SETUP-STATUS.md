# Setup status — Sharada Soft agent MVP

Updated: 2026-10-18

## Done

| Item | Status |
|------|--------|
| Company routing + 24 role prompts | Done (`AGENTS.md`, `SharadaSoft/`) |
| Gmail labels on `goverdhan.c@gmail.com` | Done: `bot/router`, `bot/support`, `bot/drafts`, `bot/processed` |
| Zapier Catch Hook created | Done |
| Catch Hook URL | `https://hooks.zapier.com/hooks/catch/29169981/41f6ikf/` |
| `hello@` → Gmail + Catch Hook | Set in ImprovMX |
| Gmail filters | Done: `to:hello@…` → `bot/router`; `to:support@…` → `bot/support` |
| Gmail OAuth for Zapier | Done — connection `027e3026-560b-8946-bb40-7053fcf946d6` (`goverdhan.c@gmail.com`) |
| Router Zap draft | **Nearly done** — see below |

### Router Zap (draft) — current state

Editor: https://zapier.com/editor/383895236/

| Step | Status |
|------|--------|
| 1. Catch Hook | Done + tested (sample From/Subject) |
| 2. AI by Zapier | Done — full `prompts/router-system.txt` + Catch Hook `From` / `Subject` mapped; GPT-4o mini; preview ran (Prompt strength Strong) |
| 3. Gmail Create Draft | Account connected; **Subject** mapped from Catch Hook; **Body** has placeholder (remap to AI output / `ack_body` after AI Test); **To** = `goverdhan.c@gmail.com` (Slate To array flaky — confirm in editor) |

**Publish** stays disabled until a paid plan covers **Webhooks by Zapier (Premium)**.

Suggested name: **Sharada Soft — Router (hello@ Catch Hook)**

## You still need to finish (manual)

### 1. Finish + Publish the Router Zap
1. Open editor → rename Zap if still “Untitled”.
2. Delete empty step 4 if present.
3. Gmail Create Draft → Configure:
   - **To:** `goverdhan.c@gmail.com`
   - **Subject:** Catch Hook `Subject` (already mapped)
   - **Body:** map AI by Zapier output (whole reply / `ack_body` JSON field)
4. Test AI step + optionally Test Create Draft (or Skip).
5. **Publish** — requires Zapier Premium (Webhooks).

Optional: reconnect **ChatGPT (OpenAI)** with an `sk-` API key if you prefer that over AI by Zapier.

### 2. Support L1 Zap (clone pattern)
- Trigger: Gmail **New Labeled Email** → `bot/support`  
  **or** second Catch Hook on `support@` forward list
- AI + `prompts/support-l1-system.txt`
- Action: Create Draft Reply (week 1)

### 3. Send as `support@` (SMTP)
- ImprovMX **native SMTP = Premium** (~$9/mo) — free plan cannot SMTP.
- Gmail already has **Send mail as** for `hr@sharadasoft.com` via `smtp.gmail.com`.
- For `support@`: Accounts → **Add another email address** → either:
  - **Treat as alias** + verify the confirmation email that lands in Gmail, **or**
  - Match `hr@`: SMTP `smtp.gmail.com:587` + Google app password for `goverdhan.c@gmail.com` (not ImprovMX SMTP on free).

Guide: https://improvmx.com/guides/send-emails-using-gmail/

## Quick test

1. Email `hello@sharadasoft.com` from a personal address.
2. Confirm mail arrives in `goverdhan.c@gmail.com` with label `bot/router`.
3. Confirm Zapier Catch Hook Test shows the request.
4. After Gmail Create Draft is wired + Publish: confirm a draft appears in Gmail.
