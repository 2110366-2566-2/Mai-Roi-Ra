// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/libs/createAnnouncement.tsx", // Make sure this pattern correctly matches your TypeScript files.
  ],
  coverageDirectory: "./coverage", // Ensures coverage reports are stored in the right directory.
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json", // Make sure this points to your actual TypeScript config file.
    },
  },
};
