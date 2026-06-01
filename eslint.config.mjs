import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local AI harness skill bundles are vendored tooling, not app source.
    ".agents/**",
    ".claude/**",
    ".cursor/**",
    ".gemini/**",
    ".impeccable/**",
    ".kiro/**",
    ".qoder/**",
  ]),
]);

export default eslintConfig;
