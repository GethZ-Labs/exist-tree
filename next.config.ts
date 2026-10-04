import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    Hide the floating "N" dev badge — it ended up baked into the
    screen-recorded intro frames once already.
  */
  devIndicators: false,
  /*
    Development only: cloud editors (Google AI Studio, Firebase Studio,
    Codespaces, Gitpod, Replit, StackBlitz…) open the dev server from their
    own preview domains. Without this, Next.js blocks the site's scripts there.
  */
  allowedDevOrigins: [
    "127.0.0.1",
    "**.goog",
    "**.google.com",
    "**.googleusercontent.com",
    "**.run.app",
    "**.web.app",
    "**.firebaseapp.com",
    "**.cloudworkstations.dev",
    "**.idx.dev",
    "**.github.dev",
    "**.gitpod.io",
    "**.replit.dev",
    "**.repl.co",
    "**.csb.app",
    "**.webcontainer.io",
    "**.stackblitz.io",
  ],
};

export default nextConfig;
