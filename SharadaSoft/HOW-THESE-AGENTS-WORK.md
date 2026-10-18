# How Sharada Soft agents work — step by step

This system is **not** 24 always-on robots. It is a **playbook + role prompts** that any AI (Claude, Codex, Gemini, Copilot, Cursor, etc.) follows when you ask it to act as a role, plus your real `@sharadasoft.com` inboxes on ImprovMX.

```
Customer email  →  ImprovMX alias  →  Human or AI (using role prompt)  →  Reply / escalate
```

---

## Step 1 — Understand the pieces

| Piece | What it is | Where |
|-------|------------|--------|
| Roster & hard rules | Company-wide rules every AI must follow | Root `AGENTS.md` |
| Routing table | Which intent goes to which inbox | `company-routing.yaml` + `AGENTS.md` |
| Role prompt | How that role speaks, replies, escalates | `agents/<role>/AGENTS.md` |
| Tool adapters | Thin pointers so Claude/Gemini/Copilot load the same rules | `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, etc. |
| Real email | ImprovMX aliases that receive mail | `*@sharadasoft.com` |

---

## Step 2 — How inbound mail flows (hub-and-spoke)

1. Someone emails **`hello@sharadasoft.com`** (public intake) or a specific role address.
2. If it hits **Router (`hello@`)**:
   - AI (or human) opens `agents/router/AGENTS.md`
   - Classifies intent (sales, support, billing, …)
   - **Forwards once** to the owning inbox
   - Does **not** solve the issue itself
3. The specialist inbox owns the thread from then on.
4. If stuck, they escalate **one level** up the chain (never company-wide CC).

Example — support bug:

```
customer → hello@ → support@ (L1) → support-l2@ → engineering@ → goverdhan@ → dayanand@
```

Example — early sales:

```
prospect → hello@ → soni@ (BDR) → darshan@ (AE) → sudarshan@ (VP) → COO → CEO
```

---

## Step 3 — How to run a role with any AI

1. Open this repo in Claude / Cursor / Codex / Gemini / Copilot.
2. The tool loads root **`AGENTS.md`** automatically (or via adapter).
3. Tell the AI which role to play, for example:
   - *“Act as Support L1. Draft a reply to this email: …”*
   - *“Act as Router. Where should this message go?”*
4. The AI must also load **`SharadaSoft/agents/<role>/AGENTS.md`**.
5. Review the draft → send from the real inbox (or have a human approve).

**Legal / Security / refunds / big discounts:** AI drafts only; a human sends.

---

## Step 4 — What each role does when it “works”

For every role prompt, the AI follows the same pattern:

1. **Identity** — who it is and which email it represents  
2. **Owns** — what problems it is allowed to handle  
3. **Tone** — how it should sound  
4. **How to reply** — step order + templates  
5. **Do / Don’t** — guardrails  
6. **Escalate when** — hand off to the next email  

Concrete Support L1 loop:

1. Read the customer message  
2. Restate the problem in one line  
3. Ask only for missing details (or give a workaround)  
4. If it’s a deep bug → escalate to `support-l2@` with summary + steps tried  
5. Sign as Support, Sharada Software Solutions  

---

## Step 5 — Escalation rules (all roles)

1. Escalate **one level** at a time.  
2. Include: summary, impact, what you tried, full thread.  
3. Subject prefix: `[Escalation][severity] original subject`.  
4. Unclear after one clarifying reply → **COO** (`goverdhan@`).  
5. VIP / named accounts → **Chief of Staff** → **CEO** (not general support).  
6. Suspicious mail → **security@** (no helpful auto-reply).  

---

## Step 6 — Two ways people email you

| Path | When | What happens |
|------|------|----------------|
| **Via hello@** | Public / unknown contact | Router classifies → specialist |
| **Direct to role** | Known address (e.g. `support@`, `soni@`) | That role owns immediately; skip router |

---

## Step 7 — Daily operating loop (recommended)

1. Check **`hello@`** first → route anything unrouted.  
2. Check your role inbox (or the inboxes you cover).  
3. For each message: open the matching role prompt → draft → send or escalate.  
4. Hard cases (Legal, Security, money exceptions): draft → human approve → send.  
5. If ownership is unclear: COO decides.  

---

## Step 8 — Self-running MVP (n8n / Zapier)

Starter automation for **Router + Support L1** is in:

→ [`mvp-n8n-zapier/README.md`](mvp-n8n-zapier/README.md)

Flow: ImprovMX/Gmail → Zapier or n8n → ChatGPT with role prompt → draft/forward/reply.

Week 1: keep actions on **Create Draft**. Flip to auto-send only after drafts look good.

---

## Quick reference — key files

| Need | File |
|------|------|
| Start here | `../AGENTS.md` |
| This guide | `HOW-THESE-AGENTS-WORK.md` |
| Ops overview | `COMPANY-OPS.md` |
| Machine routing | `company-routing.yaml` |
| Role index | `agents/README.md` |
| Example role | `agents/support-l1/AGENTS.md` |

---

## One-sentence model

**Emails land in real Sharadasoft aliases; you (or automation) ask an AI to act as that role using the matching `AGENTS.md`; the AI drafts/routes/escalates by the playbook; humans approve anything risky.**
