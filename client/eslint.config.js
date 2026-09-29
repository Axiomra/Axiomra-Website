import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist", "node_modules"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat["jsx-runtime"].rules,
      ...reactHooks.configs.flat.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // props are not type-checked in this JS-only codebase
      "react/prop-types": "off",
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },
  {
    files: [
      "src/components/NetworkCanvas.jsx",
      "src/components/FooterCanvas.jsx",
      "src/components/ContactCanvas.jsx",
      "src/components/AboutCanvas.jsx",
      "src/components/TechCanvas.jsx",
      "src/components/IndustriesCanvas.jsx",
      "src/components/PortfolioCanvas.jsx",
      "src/components/FashionCanvas.jsx",
      "src/components/MarketingCanvas.jsx",
      "src/components/SupplyChainCanvas.jsx",
      "src/components/EducationCanvas.jsx",
      "src/components/SportsCanvas.jsx",
      "src/components/FinanceCanvas.jsx",
      "src/components/InsuranceCanvas.jsx",
      "src/components/LegalCanvas.jsx",
      "src/components/RealEstateCanvas.jsx",
      "src/components/RetailCanvas.jsx",
      "src/components/HealthcareCanvas.jsx",
      "src/components/TransportationCanvas.jsx",
      "src/components/BusinessTypeCanvas.jsx",
      "src/components/gen-ai/LatentCanvas.jsx",
      "src/components/gen-ai/TokenFlowCanvas.jsx",
      "src/components/agentic-ai/AgentSwarmCanvas.jsx",
      "src/components/agentic-ai/ReasoningLoopCanvas.jsx",
      "src/components/computer-vision/VisionPanelsCanvas.jsx",
    ],
    rules: { "react/no-unknown-property": "off" },
  },
  {
    files: ["*.config.js", "postcss.config.js", "tailwind.config.js", "scripts/**"],
    languageOptions: { globals: globals.node },
  },
  // Playwright/Lighthouse drivers: Node scripts that also pass functions into the page.
  {
    files: ["perf/**"],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
];
