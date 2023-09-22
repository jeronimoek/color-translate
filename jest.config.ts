import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/**/*.d.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  testMatch: ["<rootDir>/tests/**/*.spec.ts"],

  setupFilesAfterEnv: ["jest-extended/all"],
};
export default config;
