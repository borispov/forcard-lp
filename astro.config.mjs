import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

import vitePreact from '@preact/preset-vite';

export default defineConfig({
  base: "/",
    integrations: [
        preact({ compat: true}),
    ],
    vite: {
        plugins: [vitePreact()],
    }
});
