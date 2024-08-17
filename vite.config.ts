/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["./src/setupTests.test.ts"],
    environment: "jsdom",
    root: "./src",
    include: ["**/?*.(unit|acceptance).test.+(ts|tsx)"],
    exclude: ["setupTests.test.ts"],
  },
  server: {
    port: 3000,
  },
});
