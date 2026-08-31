// OpenNext → Cloudflare adapter config. Defaults are correct for a mostly
// static portfolio; incremental cache can move to R2/KV when we need ISR.
import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig({});
