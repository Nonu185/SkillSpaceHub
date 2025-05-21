import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Only import Replit-specific plugins when not in production or on Vercel
const loadReplitPlugins = async () => {
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined &&
    !process.env.VERCEL
  ) {
    const runtimeErrorOverlay = (
      await import("@replit/vite-plugin-runtime-error-modal")
    ).default;
    const cartographer = (await import("@replit/vite-plugin-cartographer"))
      .cartographer;
    return [runtimeErrorOverlay(), await cartographer()];
  }
  return [];
};

export default defineConfig(async () => {
  const replitPlugins = await loadReplitPlugins();

  return {
    plugins: [react(), themePlugin(), ...replitPlugins],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    optimizeDeps: {
      exclude: [
        "@replit/vite-plugin-runtime-error-modal",
        "@replit/vite-plugin-cartographer",
      ],
    },
  };
});
