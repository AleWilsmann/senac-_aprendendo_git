import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${resolve(fileURLToPath(new URL('.', import.meta.url)), 'scss/_variaveis.scss').replace(/\\/g, '/')}";`,
      },
    },
  },
});
