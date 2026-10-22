import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The preview proxy forwards requests carrying the sandbox host
 * (`<port>-<sandbox id>.<BASE44_SANDBOX_HOST_DOMAIN>`), while the browser's
 * Origin header stays the public preview host. Vite checks the Host header.
 *
 * `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (set by the platform) is appended to
 * allowedHosts by Vite itself. We additionally allow the sandbox host wildcard
 * when running inside the Base44 preview, because the sandbox id rotates.
 * Outside preview mode this stays at the framework default.
 */
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

const allowedHosts =
  previewMode && sandboxHostDomain
    ? ['.' + sandboxHostDomain, 'localhost', '127.0.0.1']
    : undefined

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    ...(allowedHosts ? { allowedHosts } : {}),
    // The preview proxy terminates TLS on 443 and forwards the websocket
    // upgrade, so the HMR client must dial wss://<host>:443 rather than the
    // container's internal port. Local development keeps Vite's default.
    ...(previewMode ? { hmr: { protocol: 'wss', clientPort: 443 } } : {}),
    // Bind mounts do not always emit native filesystem events.
    watch: { usePolling: true, interval: 400 },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
