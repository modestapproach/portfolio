import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

const page = (name) => fileURLToPath(new URL(name, import.meta.url))

export default defineConfig({
  // 5173 belongs to the site app; both run at once during local dev.
  server: { port: 5174, strictPort: false },
  build: {
    rollupOptions: {
      input: {
        home: page('index.html'),
        tester: page('type-tester.html'),
        flow: page('flow.html'),
      },
    },
  },
})
