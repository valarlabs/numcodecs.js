import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';

import base64 from './lib/plugin-base64.js';

const codecs = ['zlib', 'gzip', 'blosc', 'lz4', 'zstd', 'wkb'];

export default {
  input: ['index', ...codecs].map(d => `./src/${d}.ts`),
  output: { dir: './dist', format: 'esm' },
  plugins: [ base64(), resolve(), esbuild() ],
};
