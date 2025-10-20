const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  pageLoadTimeout: 200000,
  projectId: '123',
  e2e: {
    chromeWebSecurity: false,
    env: {
      navbarText: 'cypress.io',
      allure: true, // enable allure environment variable
    },
    // Discover feature, .cy.* test files and .spec.* files across e2e folders
    specPattern: [
      'cypress/e2e/**/*.feature',
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    ],
    supportFile: 'cypress/support/commands.js', // your support file

    async setupNodeEvents(on, config) {
      // Add cucumber preprocessor plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Add allure plugin writer
      allureWriter(on, config);

      // Use esbuild with cucumber plugin for faster preprocessing
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      return config;
    },
  },
});
