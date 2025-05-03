/// <reference types='vitest/config'> />
import { defineConfig } from 'vite'

import React from '@vitejs/plugin-react-swc'
import Checker from 'vite-plugin-checker'

export default defineConfig({
	plugins: [
		React(),
		Checker({ typescript: true }),
	],

	server: {
		proxy: {
			'/api': 'https://www.alvinbontuyan.com',
			'/login': 'https://www.alvinbontuyan.com'
		},
	},

	test: {
		fileParallelism: false,
	},
});
