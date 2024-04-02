import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({
		sourceMap: true,
	}),
	compilerOptions: {
		enableSourcemap: true,
	},
	kit: {
		adapter: adapter({
			out: 'build',
		}),
		paths: {
			base: '/pal',
		},
	}
}
export default config;
