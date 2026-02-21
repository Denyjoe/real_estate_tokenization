import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// #region agent log
const DEBUG_ENDPOINT = 'http://127.0.0.1:7688/ingest/91ec0445-cc46-4ab1-9135-d0f4041687a8';
const SESSION_ID = '24adda';
function debugLog(location, message, data, hypothesisId) {
  fetch(DEBUG_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': SESSION_ID },
    body: JSON.stringify({ sessionId: SESSION_ID, location, message, data: data || {}, hypothesisId, timestamp: Date.now() }),
  }).catch(() => {});
}
// #endregion

export default defineConfig({
  plugins: [
    react(),
    // #region agent log
    {
      name: 'debug-tsx-transform',
      transform(code, id) {
        if (id.endsWith('.tsx')) {
          debugLog('vite.config.js:transform', 'Transform hook called for .tsx', { id: id.slice(-60) }, 'B');
        }
        return null;
      },
    },
    // #endregion
  ],
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.(jsx?|tsx?)$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx', '.tsx': 'tsx' },
    },
  },
})
