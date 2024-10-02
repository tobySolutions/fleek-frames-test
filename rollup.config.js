import { nodeResolve } from '@rollup/plugin-node-resolve';
import wasm from '@rollup/plugin-wasm';
// import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
// import serve from 'rollup-plugin-serve';

// rollup.config.js
import FontToBuffer from 'unplugin-font-to-buffer/rollup'

export default {
  input: 'index.js',
  output: {
    dir: 'dist',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    FontToBuffer(),
    nodeResolve(), // Needed to bundle the assets from node_modules
    // importMetaAssets(), // Needed to resolve Wasm imports
    //typescript(),
    wasm({
      targetEnv: 'auto-inline',
      maxFileSize: 0,
    }),
    // serve({
    //   open: true
    // }) // Optional, for convenience when testing example
  ]
};