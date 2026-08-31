// disk-flag.ts — LOCAL FORK ADDITION (not upstream Revyme).
//
// Switch for the on-disk project backend: standalone mode, but the project
// persists to a real directory (apps/web) through the dev server's
// /__revyme_disk endpoints instead of localStorage. See
// vite-plugins/disk-project.ts for the server half.
//
// Mirrors cloud-flag.ts: gate on THIS constant, compare `=== 'true'`
// (env values are strings — 'false' is truthy). Cloud mode wins if both
// are somehow set; disk mode is a standalone variant.
import { CLOUD_ENABLED } from './cloud-flag';

// Fork default: ON. This fork exists to edit apps/web on disk; set
// VITE_DISK_PROJECT=false to fall back to upstream localStorage mode.
export const DISK_ENABLED =
  !CLOUD_ENABLED && import.meta.env.VITE_DISK_PROJECT !== 'false';
