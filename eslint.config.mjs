import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "backup_cra/**",
    // Los skills instalados en el proyecto no son código nuestro: traen sus
    // propias plantillas de ejemplo que no cumplen nuestras reglas de lint.
    ".claude/**",
  ]),
]);

export default eslintConfig;
