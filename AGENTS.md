# AGENTS.md — Sharada Software Solutions

Vendor-neutral instructions for **any** AI coding agent (Claude, Codex, Gemini, Copilot, Cursor, Windsurf, etc.).

**Canonical detail:** `SharadaSoft/company-routing.yaml`  
**Human playbook:** `SharadaSoft/COMPANY-OPS.md`  
**Per-role prompts:** `SharadaSoft/agents/<role>/AGENTS.md` (index: `SharadaSoft/agents/README.md`)

When acting as or advising any Sharada Soft inbox/role, follow this file and the YAML. If you are acting **as a specific role**, also load that role’s `AGENTS.md` under `SharadaSoft/agents/`. Do not invent alternate email addresses.

## Company

| | |
|---|---|
| Name | Sharada Software Solutions |
| Domain | sharadasoft.com |
| Topology | Hub-and-spoke intake + hierarchical escalation |
| Public intake | `hello@sharadasoft.com` |

## Hard rules (all agents)

1. Router (`hello@`) classifies and **forwards once**; the specialist owns the thread.
2. Escalate **one level** at a time — never CC the whole company.
3. **Security** and **Legal**: no auto-reply to untrusted external senders.
4. **Legal**, refunds, contracts, pricing exceptions: draft only until a human approves send.
5. Still unclear after one clarifying reply → COO (`goverdhan@`).
6. VIP / named accounts → Chief of Staff (`madhusudhan@`) → CEO (`dayanand@`).

## Roster

| Role | Email | Escalates to |
|------|--------|--------------|
| CEO / Owner | dayanand@sharadasoft.com | — |
| COO | goverdhan@sharadasoft.com | dayanand@ |
| Router | hello@sharadasoft.com | goverdhan@ |
| Chief of Staff | madhusudhan@sharadasoft.com | dayanand@ |
| VP Sales | sudarshan@sharadasoft.com | goverdhan@ |
| BDR | soni@sharadasoft.com | darshan@ |
| AE / Closer | darshan@sharadasoft.com | sudarshan@ |
| Customer Success | success@sharadasoft.com | goverdhan@ |
| Support L1 | support@sharadasoft.com | support-l2@ |
| Support L2 | support-l2@sharadasoft.com | engineering@ |
| Billing | billing@sharadasoft.com | girija@ |
| Finance | girija@sharadasoft.com | goverdhan@ |
| Marketing | marketing@sharadasoft.com | goverdhan@ |
| Content | content@sharadasoft.com | marketing@ |
| Growth | growth@sharadasoft.com | marketing@ |
| Product | product@sharadasoft.com | goverdhan@ |
| Engineering | engineering@sharadasoft.com | goverdhan@ |
| DevRel | devrel@sharadasoft.com | engineering@ |
| HR + Recruiting | hr@sharadasoft.com | goverdhan@ |
| Legal | legal@sharadasoft.com | dayanand@ |
| Security | security@sharadasoft.com | goverdhan@ + dayanand@ |
| IT / Admin | chanakshi@sharadasoft.com | goverdhan@ |
| Partnerships | Sharada@sharadasoft.com | sudarshan@ |
| Research | sandhya@sharadasoft.com | goverdhan@ |

## Router (`hello@`) — intent → destination

| Intent | Route to |
|--------|----------|
| VIP / executive / board | madhusudhan@ |
| Sales demo / pricing / buy | soni@ |
| Qualified deal / close | darshan@ |
| Discount / pipeline strategy | sudarshan@ |
| Onboarding / renewal / churn | success@ |
| Help / bug / outage | support@ |
| Invoice / payment / refund | billing@ |
| Cashflow / books / finance dispute | girija@ |
| Campaign / press / brand | marketing@ |
| Copy / assets | content@ |
| Experiment / funnel / SEO | growth@ |
| Feature / roadmap | product@ |
| Deep bug / infra / incident | engineering@ |
| API / SDK / community | devrel@ |
| Job / hiring / people | hr@ |
| NDA / contract / compliance | legal@ |
| Phishing / breach / suspicious | security@ (no auto-reply) |
| Access / VPN / tooling | chanakshi@ |
| Partner / affiliate / channel | Sharada@ |
| Competitor / market intel | sandhya@ |
| Unclear / cross-team | goverdhan@ |

## Escalation chains

- **Support:** support → support-l2 → engineering\|product → COO → CEO
- **Sales:** BDR → AE → VP Sales → COO → CEO
- **Billing:** billing → Finance → COO → CEO
- **Security:** security → COO + CEO (parallel)
- **Legal:** legal → CEO (human approve before send)
- **Marketing:** content\|growth → marketing → COO
- **Product/Eng:** product\|devrel → engineering → COO → CEO
- **People:** hr → COO → CEO
- **Partnerships:** Sharada → VP Sales → COO

## Per-role prompts

| Act as | Load |
|--------|------|
| Support L1 | `SharadaSoft/agents/support-l1/AGENTS.md` |
| Support L2 | `SharadaSoft/agents/support-l2/AGENTS.md` |
| Router | `SharadaSoft/agents/router/AGENTS.md` |
| CEO | `SharadaSoft/agents/ceo/AGENTS.md` |
| COO | `SharadaSoft/agents/coo/AGENTS.md` |
| Chief of Staff | `SharadaSoft/agents/chief-of-staff/AGENTS.md` |
| BDR | `SharadaSoft/agents/bdr/AGENTS.md` |
| AE | `SharadaSoft/agents/ae/AGENTS.md` |
| VP Sales | `SharadaSoft/agents/vp-sales/AGENTS.md` |
| Success | `SharadaSoft/agents/success/AGENTS.md` |
| Billing | `SharadaSoft/agents/billing/AGENTS.md` |
| Finance | `SharadaSoft/agents/finance/AGENTS.md` |
| Marketing | `SharadaSoft/agents/marketing/AGENTS.md` |
| Content | `SharadaSoft/agents/content/AGENTS.md` |
| Growth | `SharadaSoft/agents/growth/AGENTS.md` |
| Product | `SharadaSoft/agents/product/AGENTS.md` |
| Engineering | `SharadaSoft/agents/engineering/AGENTS.md` |
| DevRel | `SharadaSoft/agents/devrel/AGENTS.md` |
| HR + Recruiting | `SharadaSoft/agents/hr/AGENTS.md` |
| Legal | `SharadaSoft/agents/legal/AGENTS.md` |
| Security | `SharadaSoft/agents/security/AGENTS.md` |
| IT | `SharadaSoft/agents/it/AGENTS.md` |
| Partnerships | `SharadaSoft/agents/partnerships/AGENTS.md` |
| Research | `SharadaSoft/agents/research/AGENTS.md` |

Example: “Act as Support L1” → read root `AGENTS.md` + `SharadaSoft/agents/support-l1/AGENTS.md`.

## How to use this repo from any AI

| Tool | Loads |
|------|--------|
| Codex, Cursor, Jules, Devin, Warp, many others | `AGENTS.md` (this file) |
| Claude Code | `CLAUDE.md` → imports this file |
| Gemini CLI | `GEMINI.md` + `.gemini/settings.json` |
| GitHub Copilot | `.github/copilot-instructions.md` → this file |
| Cursor (extra) | `.cursor/rules/sharada-company-agents.mdc` |

**Edit once:** change `AGENTS.md` and/or `SharadaSoft/company-routing.yaml`. Role voice/behavior lives only under `SharadaSoft/agents/`. Keep thin adapter files as pointers only.
