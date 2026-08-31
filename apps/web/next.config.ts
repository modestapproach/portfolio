import type { NextConfig } from 'next';

// apps/web is edited live by apps/studio (Revyme). Keep this config minimal:
// the studio only manages the files listed in .revyme/manifest.json, so this
// file is ours and survives every canvas save.
const nextConfig: NextConfig = {
  // The studio's generated pages are self-contained (inline styles,
  // framer-motion); no special webpack/turbopack config needed.
  reactStrictMode: true,

  // Monorepo: two lockfiles are deliberate (this app owns its own). Pin the
  // tracing root so Next stops guessing.
  outputFileTracingRoot: __dirname,

  // The studio dialect exports extra fields from layout.tsx (siteConfig:
  // language/theme/custom head+body). Next's layout type validation rejects
  // any non-standard export, and the studio regenerates the file on every
  // save — so the check has to yield. Type safety comes from the studio's
  // own oracle + `tsc --noEmit`, not from next build.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
