# Sharada Software Solutions — Company Agent Ops

**Portable for any AI:** start at repo-root [`../AGENTS.md`](../AGENTS.md) (Claude, Codex, Gemini, Copilot, Cursor, Windsurf, etc.).

Machine-readable source of truth: `company-routing.yaml`.

## Topology

**Hub-and-spoke** for intake + **hierarchical** escalation for resolution.

```
External mail
     │
     ▼
hello@sharadasoft.com  (Router — classify & forward once)
     │
     ├── Sales path ──► soni@ → darshan@ → sudarshan@ → goverdhan@ → dayanand@
     ├── Support path ► support@ → support-l2@ → engineering@|product@ → COO → CEO
     ├── Billing path ► billing@ → girija@ → COO → CEO
     ├── GTM path ────► marketing@ / content@ / growth@
     ├── Product/Eng ► product@ / engineering@ / devrel@
     ├── People ──────► hr@ → COO → CEO
     ├── Legal ───────► legal@ → CEO (approve before send)
     ├── Security ────► security@ → COO + CEO (no auto-reply)
     ├── IT ──────────► chanakshi@
     ├── Partners ────► Sharada@ → sudarshan@
     ├── Research ────► sandhya@
     └── VIP ─────────► madhusudhan@ → dayanand@
```

## Inbox ownership (quick)

| Inbox | Owns | Escalates to |
|-------|------|--------------|
| hello@ | Classify & forward only | goverdhan@ |
| madhusudhan@ | CEO queue / VIP filter | dayanand@ |
| soni@ | Early sales / qualify | darshan@ |
| darshan@ | Close deals | sudarshan@ |
| sudarshan@ | Pipeline / discounts | goverdhan@ |
| success@ | Onboarding / renewals | goverdhan@ |
| support@ | L1 tickets | support-l2@ |
| support-l2@ | Hard tickets | engineering@ |
| billing@ | Invoices / payments | girija@ |
| girija@ | Finance / disputes | goverdhan@ |
| marketing@ | Campaigns / brand | goverdhan@ |
| content@ | Writing / assets | marketing@ |
| growth@ | Experiments / funnels | marketing@ |
| product@ | Features / roadmap | goverdhan@ |
| engineering@ | Bugs / tech / incidents | goverdhan@ |
| devrel@ | Dev community / API | engineering@ |
| hr@ | HR + recruiting | goverdhan@ |
| legal@ | Contracts / compliance | dayanand@ |
| security@ | Suspicious mail (no auto-reply) | goverdhan@ (+ CEO) |
| chanakshi@ | IT / access / tooling | goverdhan@ |
| Sharada@ | Partnerships | sudarshan@ |
| sandhya@ | Research / intel | goverdhan@ |
| goverdhan@ | Cross-team ops | dayanand@ |
| dayanand@ | Final decisions | — |

## Per-role prompts

How each inbox should reply (tone, templates, escalate-when): `agents/<role>/AGENTS.md`  
Index: [`agents/README.md`](agents/README.md)

## Hard rules

1. Router forwards **once**; the specialist owns the thread.
2. Escalate **one level** at a time — no company-wide CC.
3. **Security** and **Legal**: no auto-reply to untrusted senders; Legal needs human approve before external send.
4. Refunds, contracts, pricing exceptions → human approval before send.
5. Unclear after one clarifying reply → COO.
6. VIP / named accounts → Chief of Staff → CEO.
