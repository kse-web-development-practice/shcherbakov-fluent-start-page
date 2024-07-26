/* eslint-disable no-undef */

const { defineConfig } = require('cypress');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');

module.exports = defineConfig({
	e2e: {
		// eslint-disable-next-line no-unused-vars
		setupNodeEvents(on, config) {
			// implement node event listeners here
			on('file:preprocessor', webpackPreprocessor());
		}
	}
});
