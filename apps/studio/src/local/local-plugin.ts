// local-plugin.ts — LOCAL FORK ADDITION (not upstream Revyme).
//
// The cloud settings sections that need no cloud. Upstream registers them
// all inside `initCloudPlugin()`, gated on VITE_REVYME_CLOUD, so a disk-mode
// build never saw them even though two of the three need zero backend:
//   · Pages   — per-page SEO; reads/writes `export const metadata` in the
//               page files through metadata-gen. Pure ProjectFS.
//   · Connect AI / MCP — renders client config snippets; also the deep-link
//               target of the AI dock's "Connect with MCP" button, which
//               otherwise lands on "Section coming soon…".
//   · Backups — publish snapshots; served locally from git history by
//               vite-plugins/local-api.ts.
// Same components and icons as the cloud registration, so the two stay in
// step. Sections that genuinely need Revyme's infrastructure (domains,
// plans, staging, A/B, analytics) are deliberately not registered.

import { registerSettingsSection } from '@/plugins/plugin-registry';
import { SettingsBackupsIcon, SettingsConnectAiIcon, PagesLayersIcon } from '@/shared/icons';
import BackupsSection from '@/cloud/settings/BackupsSection';
import PagesSeoSection from '@/cloud/settings/PagesSeoSection';
import ConnectAiSection from '@/cloud/settings/ConnectAiSection';

export function initLocalPlugin(): void {
  registerSettingsSection({
    id: 'pages',
    label: 'Pages',
    icon: PagesLayersIcon,
    category: 'General',
    component: PagesSeoSection,
    order: 0,
  });
  registerSettingsSection({
    id: 'backups',
    label: 'Backups',
    icon: SettingsBackupsIcon,
    category: 'General',
    component: BackupsSection,
    order: 3,
  });
  registerSettingsSection({
    id: 'connect-ai',
    label: 'Connect AI / MCP',
    icon: SettingsConnectAiIcon,
    category: 'General',
    component: ConnectAiSection,
    order: 5,
  });
}
