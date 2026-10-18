/**
 * ImprovMX → POST /hooks/inbound
 * Optionally forwards JSON to Zapier Catch Hook (env FORWARD_ZAPIER_HOOK).
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/hooks/inbound")) {
      return json({ ok: true, service: "sharada-inbound", path: "/hooks/inbound" });
    }

    if (request.method !== "POST" || url.pathname !== "/hooks/inbound") {
      return json({ ok: false, error: "Use POST /hooks/inbound" }, 404);
    }

    if (env.REQUIRE_TOKEN === "true") {
      const token = url.searchParams.get("token") || request.headers.get("x-sharada-token");
      if (!env.WEBHOOK_SECRET || token !== env.WEBHOOK_SECRET) {
        return json({ ok: false, error: "unauthorized" }, 401);
      }
    }

    let payload;
    const contentType = request.headers.get("content-type") || "";
    try {
      if (contentType.includes("application/json")) {
        payload = await request.json();
      } else {
        const text = await request.text();
        try {
          payload = JSON.parse(text);
        } catch {
          payload = { raw: text };
        }
      }
    } catch (e) {
      return json({ ok: false, error: "invalid_body", detail: String(e) }, 400);
    }

    const received = {
      received_at: new Date().toISOString(),
      to: payload.to || payload.envelope?.to || payload.recipient || null,
      from: payload.from || payload.envelope?.from || payload.sender || null,
      subject: payload.subject || null,
    };

    // Fan-out to Zapier so Router/Support Zaps can run
    if (env.FORWARD_ZAPIER_HOOK) {
      try {
        const zapRes = await fetch(env.FORWARD_ZAPIER_HOOK, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...payload, _sharada: received }),
        });
        received.zapier_status = zapRes.status;
      } catch (e) {
        received.zapier_error = String(e);
      }
    }

    // ImprovMX retries on non-2xx — always ack success after accept
    return json({ ok: true, ...received });
  },
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}
