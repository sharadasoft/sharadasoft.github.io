# Zapier field mapping cheat sheet

## Zap 1 — Router

### Trigger
- App: Gmail  
- Event: New Labeled Email  
- Label: `bot/router`  
- Account: the Gmail that receives ImprovMX forwards  

### ChatGPT step
- Action: **Conversation** (recommended) or **Extract Structured Data**  
- Instructions / system: contents of `prompts/router-system.txt`  
- Message:

```
FROM: {{From Email}}
TO: {{To Email}}
SUBJECT: {{Subject}}
BODY:
{{Body Plain}}
```

- Ask model to return JSON only. If Conversation returns prose, add a Formatter or Code step to `JSON.parse`.

### Parse JSON (optional Code by Zapier)
```js
const text = inputData.ai_text || '';
const start = text.indexOf('{');
const end = text.lastIndexOf('}');
const obj = JSON.parse(text.slice(start, end + 1));
return obj;
```

### Paths
| Path rule | Then |
|-----------|------|
| `action` is `ack_and_forward` or `forward` | Gmail Forward Email → To = `route_to`, Subject = `forward_subject`, Body = summary + original |
| AND `action` is `ack_and_forward` | Gmail Create Draft Reply (week 1) or Reply to Email with `ack_body` |
| `action` is `clarify` | Create Draft Reply with `ack_body` |
| `action` is `security` | Forward to `security@sharadasoft.com` only — no customer reply |

### Week-1 recommendation
Use **Create Draft** / **Create Draft Reply** everywhere. After ~10 good samples, switch to Forward + Reply.

---

## Zap 2 — Support L1

### Trigger
- Gmail → New Labeled Email → `bot/support`

### ChatGPT
- System: `prompts/support-l1-system.txt`  
- Same FROM/TO/SUBJECT/BODY user template  

### Paths
| `action` | Step |
|----------|------|
| `draft` or `confidence` < 0.6 | Create Draft Reply |
| `reply` | Reply to Email (after trust) |
| `escalate` | Forward to `support-l2@` with `escalate_summary` + optional customer Reply |
| `handoff_billing` | Forward to `billing@` + short Reply |

---

## Testing emails

Send from a non-Sharada personal address:

1. To `hello@sharadasoft.com` — subject “Interested in pricing” → expect route to `soni@`  
2. To `hello@sharadasoft.com` — subject “App error on login” → expect `support@`  
3. To `support@sharadasoft.com` — “How do I reset my password?” → expect Support draft/reply  
4. To `hello@` — vague “Hi” → expect clarify, no forward  

---

## Connected Zapier apps (this account)

- Gmail (`goverdhan.k@gmail.com` + another connection)  
- ChatGPT (OpenAI)  
- Webhooks by Zapier (Catch Hook available)  
