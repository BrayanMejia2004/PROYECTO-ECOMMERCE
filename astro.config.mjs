// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	// ⚠️ CAMBIA esta URL por tu dominio real al desplegar (afecta sitemap y SEO)
	site: 'https://cronovision.com.co',
	// output estático de Astro: el catálogo se genera como HTML estático (mejor SEO)
	// y solo las rutas del admin (Keystatic) corren en funciones serverless de Vercel.
	output: 'static',
	adapter: vercel(),
	vite: {
		plugins: [tailwindcss()]
	},
	integrations: [sitemap(), keystatic()]
});