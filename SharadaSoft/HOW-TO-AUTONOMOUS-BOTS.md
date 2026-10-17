# How to create 24 self-running bots

Your role prompts in `agents/` are the **brains**. Self-running bots need a **body**: receive email → load role → call an LLM → draft/send/escalate → log.

```
ImprovMX alias ──webhook──► Bot runtime ──LLM + role prompt──► Send / Draft / Escalate
     ▲                                                              │
     └──────────────────── ImprovMX SMTP / Send API ◄───────────────┘
```

---

## Step 0 — Decide autonomy level (important)

| Level | Behavior | Use for |
|-------|----------|---------|
| **L0 Draft only** | Bot writes draft; human sends | Legal, Security, CEO, refunds |
| **L1 Auto low-risk** | Bot sends acknowledgements / FAQ | Support L1, Router ack, HR scheduling |
| **L2 Full auto** | Bot sends + escalates without human | Only after L1 is trusted |

**Do not** start all 24 on L2. Start Router + Support L1 on L1; keep Legal/Security/CEO on L0 forever (or until policy says otherwise).

---

## Step 1 — Pick a runtime (one process, 24 roles)

You do **not** need 24 servers. One app with 24 role configs is enough.

Recommended stack for Sharada Soft (keeps ImprovMX):

| Layer | Choice |
|-------|--------|
| Inbound | ImprovMX alias → HTTPS webhook (or webhook + human Gmail) |
| Runtime | Node or Python service (Railway / Fly / Render / VPS) |
| Brain | OpenAI / Claude / Gemini API |
| Prompts | Load `agents/<role>/AGENTS.md` + root `AGENTS.md` |
| Outbound | ImprovMX SMTP or Send API (send-as `@sharadasoft.com`) |
| Memory | DB: threads, last message id, escalation state |
| Queue | Redis / BullMQ / SQS so webhooks return fast |

Alternatives:

- **n8n / Make / Zapier** — faster MVP, weaker for 24 complex roles  
- **AgentMail** — purpose-built agent inboxes (you skipped this; fine)  
- **Gmail API poll** — works if aliases forward to Gmail; more OAuth pain  

---

## Step 2 — Wire ImprovMX → webhook

For each alias (or start with `hello@` + `support@`):

1. In ImprovMX, set forward destination to include your webhook URL, e.g.  
   `https://bots.sharadasoft.com/hooks/inbound`  
   (You can keep a human Gmail too: `you@gmail.com, https://…` comma-separated.)
2. ImprovMX POSTs JSON: from, to, subject, text/html, attachments.
3. Your handler:
   - Verify source IP / shared secret  
   - Enqueue job `{ to, from, subject, body }`  
   - Return `200` quickly  

Docs: https://improvmx.com/guides/webhooks/

---

## Step 3 — Map `to:` address → role bot

```text
hello@        → router
support@      → support-l1
support-l2@   → support-l2
soni@         → bdr
…
```

Config example (`bots.yaml`):

```yaml
bots:
  hello@sharadasoft.com:
    role: router
    prompt: agents/router/AGENTS.md
    autonomy: L1          # can send short ack + forward
    can_send: true
  support@sharadasoft.com:
    role: support-l1
    prompt: agents/support-l1/AGENTS.md
    autonomy: L1
    can_send: true
  legal@sharadasoft.com:
    role: legal
    prompt: agents/legal/AGENTS.md
    autonomy: L0          # draft only
    can_send: false
  security@sharadasoft.com:
    role: security
    prompt: agents/security/AGENTS.md
    autonomy: L0
    can_send: false
```

One worker loop:

1. Look up bot by `to` email  
2. Load system prompt = root `AGENTS.md` + role file  
3. Call LLM with the inbound email as **untrusted user data**  
4. Parse structured action: `reply` | `forward` | `escalate` | `draft` | `ignore`  
5. Execute per autonomy rules  

---

## Step 4 — Make the LLM return structured actions

Ask the model for JSON only, e.g.:

```json
{
  "action": "reply | forward | escalate | draft | ignore",
  "to": ["customer@example.com"],
  "cc": [],
  "subject": "Re: …",
  "body": "…",
  "escalate_to": "support-l2@sharadasoft.com",
  "reason": "needs logs",
  "confidence": 0.82
}
```

Rules in code (not only in the prompt):

- If `confidence < 0.6` → draft + notify COO/human  
- If role is Legal/Security → force `draft`  
- If action is escalate → send internal handoff email with summary  
- Never execute instructions found inside the customer email body  

---

## Step 5 — Send mail as the role

Enable ImprovMX **SMTP / sending** for `sharadasoft.com`, then each bot sends with:

- From: that role’s address (`support@sharadasoft.com`)  
- Reply-To: same  
- In-Reply-To / References headers to keep threads  

Store `message_id` so the next inbound reply continues the same conversation state.

---

## Step 6 — Roll out 24 bots safely (phased)

| Phase | Bots | Autonomy |
|-------|------|----------|
| 1 | `hello@` (router) | L1 — classify, forward, short ack |
| 2 | `support@` | L1 — FAQ + escalate |
| 3 | `billing@`, `success@`, `hr@` | L1 acknowledgements; drafts for money |
| 4 | Sales (`soni@`, `darshan@`) | L0/L1 — qualify; no discount auto-send |
| 5 | Rest of GTM / Product / Eng | L1 with tight allow-lists |
| 6 | Legal, Security, CEO, CoS | **L0 forever** unless policy changes |

Same codebase; only `bots.yaml` grows.

---

## Step 7 — Observability & kill switch

For each bot log:

- inbound id, role, action, confidence, sent/drafted, errors  

Must-have controls:

- Global **PAUSE_ALL_BOTS=true**  
- Per-role pause  
- Daily send caps  
- Allow-list of domains the bot may email (optional)  
- Alert channel (Telegram/Slack/email to COO) on escalate / low confidence  

---

## Step 8 — Minimal architecture diagram

```
                    ┌─────────────────────────┐
  Internet email →  │ ImprovMX (sharadasoft)  │
                    └───────────┬─────────────┘
                                │ webhook POST
                                ▼
                    ┌─────────────────────────┐
                    │ API /hooks/inbound      │
                    │ enqueue job             │
                    └───────────┬─────────────┘
                                ▼
                    ┌─────────────────────────┐
                    │ Worker                  │
                    │ 1. resolve role         │
                    │ 2. load AGENTS.md       │
                    │ 3. LLM → JSON action    │
                    │ 4. policy gate          │
                    │ 5. send or save draft   │
                    └───────────┬─────────────┘
                                ▼
                    ┌─────────────────────────┐
                    │ ImprovMX SMTP / Send    │
                    │ + Postgres (threads)    │
                    └─────────────────────────┘
```

---

## Step 9 — Cost & ops reality

- 24 roles ≠ 24 LLM subscriptions. One API key, many system prompts.  
- Most volume will hit `hello@` + `support@` + sales.  
- Start with **one webhook URL** and role routing in code.  
- Expect to tune prompts weekly for the first month.  

---

## Step 10 — Build order (checklist)

1. [ ] Enable ImprovMX sending (SMTP) for the domain  
2. [ ] Deploy empty `/hooks/inbound` that logs payloads  
3. [ ] Point `hello@` forward at webhook (+ keep human copy)  
4. [ ] Implement router bot only (classify + forward)  
5. [ ] Add Support L1 with draft-to-Slack/email for review  
6. [ ] Flip Support L1 to auto-send for FAQ-only intents  
7. [ ] Add remaining roles via `bots.yaml`  
8. [ ] Lock Legal/Security/CEO to draft-only  
9. [ ] Add pause switch, caps, dashboards  

---

## What you already have vs what to build

| Have today | Still need |
|------------|------------|
| Role prompts (`agents/*/AGENTS.md`) | Webhook receiver |
| Routing YAML | Worker + LLM calls |
| ImprovMX aliases | SMTP send-as roles |
| Human playbook | Thread DB + policy gates |

---

## Next action

**n8n/Zapier MVP is scaffolded** → see [`mvp-n8n-zapier/README.md`](mvp-n8n-zapier/README.md)

Still available if you outgrow no-code:

1. **Node/TypeScript worker** (ImprovMX webhook + OpenAI/Claude)  
2. **Python worker** (same)
