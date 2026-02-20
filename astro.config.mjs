// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://playeriv65.github.io',
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh'],
        routing: {
            prefixDefaultLocale: false
        }
    }
});
