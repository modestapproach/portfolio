// index.ts — Backend adapter factory.
// Switches between cloud (RevymeBackend) and local (LocalBackend) based on env var.

import { LocalBackend } from './local-backend';
import { DiskBackend } from './disk-backend'; // LOCAL FORK ADDITION
import { CLOUD_ENABLED } from '@/shared/cloud-flag';
import { DISK_ENABLED } from '@/shared/disk-flag'; // LOCAL FORK ADDITION
import { RevymeBackend } from './revyme-backend';
export type { ProjectBackend, ProjectData, RevymeUser } from './types';

export const backend = CLOUD_ENABLED
  ? new RevymeBackend()
  : DISK_ENABLED
    ? new DiskBackend() // LOCAL FORK: project persists to a real directory
    : new LocalBackend();
