import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  transformIgnorePatterns: ["//node_modules"],
  setupFilesAfterEnv: ["jest-extended/all"],
};
export default config;
