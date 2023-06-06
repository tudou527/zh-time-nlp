import { defineConfig } from 'father';
import path from 'path';

export default defineConfig({
  cjs: {},
  esm: {},
  alias: {
    '@': path.join(__dirname, './src'),
  },
  prebundle: {
    deps: {},
  },
});
