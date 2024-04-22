import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    pageLoadTimeout: 90000, // Increase page load timeout to 90 seconds
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
