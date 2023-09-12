import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  transformIgnorePatterns: ["//node_modules"],
  setupFilesAfterEnv: ["./setupTestsAfterEnv.ts"],
};
export default config;
