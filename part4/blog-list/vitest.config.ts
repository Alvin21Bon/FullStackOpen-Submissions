import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'

export default defineConfig({
	plugins: [
		swc.vite(),
	],

	test: {
		fileParallelism: false,
		setupFiles: './src/__tests__/setup.ts',
	},
})
