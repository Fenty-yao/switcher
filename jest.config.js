const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterSetup: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(config);
