// Compatibility shim so Vite can resolve /src/services/api.js during dev
// Re-export everything from the TypeScript implementation
export * from './api.ts'
import _default from './api.ts'
export default _default
