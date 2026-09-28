// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://sarma9273.github.io/guruverse/',
    base: '/guruverse',
    integrations: [sitemap()],
});