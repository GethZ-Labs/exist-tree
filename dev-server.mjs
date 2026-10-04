/*
  Development server (`npm run dev`) — the normal Next.js dev server, plus
  one fix so the site also previews inside cloud editors such as Google AI
  Studio, which show your app in a sandboxed iframe.

  A sandboxed iframe has an "opaque" origin: its requests say cross-site but
  carry no Origin/Referer host. Next.js' dev-only cross-site guard then
  refuses every script, style and font with 403, and the preview stays blank.
  Here, exactly those opaque requests are let through (and fonts get a CORS
  header so they can load); requests that name a foreign site are still
  checked by Next.js against `allowedDevOrigins` in next.config.ts.

  Production (`npm run build` + `npm start`) never uses this file.
*/

import { createServer } from "node:http";
import next from "next";

// Cloud previews proxy to port 3000; PORT may belong to the proxy itself, so it isn't used here.
const port = Number(process.env.DEV_PORT || 3000);
const app = next({ dev: true, turbopack: true, hostname: "localhost", port });

function allowOpaquePreview(req, res) {
  const origin = req.headers.origin;
  const opaque =
    origin === "null" ||
    (req.headers["sec-fetch-site"] === "cross-site" && !origin && !req.headers.referer);
  if (opaque) {
    delete req.headers.origin;
    delete req.headers["sec-fetch-site"];
    delete req.headers["sec-fetch-mode"];
  }
  // fonts and module chunks are CORS requests from an opaque origin
  if (res && req.url?.startsWith("/_next/")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
}

await app.prepare();
const handle = app.getRequestHandler();

const server = createServer((req, res) => {
  allowOpaquePreview(req, res);
  handle(req, res);
});
// Next.js attaches its own live-reload (websocket) handler on the first request;
// this listener runs before it and only fixes the headers.
server.on("upgrade", (req) => allowOpaquePreview(req));
server.listen(port, () => {
  console.log(`\n  ▲ EXiST dev server ready on http://localhost:${port}\n`);
});
