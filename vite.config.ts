import { defineConfig } from 'vite';
import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	server: {
		port: 4000
	},
	resolve: {
		alias: {
			$stores: path.resolve('./src/lib/stores'),
			$components: path.resolve('./src/lib/components')
		}
	}
});
