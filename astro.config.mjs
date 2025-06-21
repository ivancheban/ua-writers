// @ts-check
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';

import react from '@astrojs/react';
import stylex from 'astro-stylex';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://ua-writers.netlify.app',
  markdown: {
    remarkPlugins: [remarkGfm],
    // If you have rehypePlugins, keep them here
  },
  integrations: [react(), stylex(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), sitemap({
    filter: (page) => page !== 'https://ua-writers.netlify.app/admin/',
  })],
  prefetch: true,
  devToolbar: {
    enabled: false
  },
});