// vite.config.ts
import { defineConfig } from "file:///Users/alex/Desktop/Projects/google_repos/breadboard/node_modules/vite/dist/node/index.js";
import react from "file:///Users/alex/Desktop/Projects/google_repos/breadboard/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { crx } from "file:///Users/alex/Desktop/Projects/google_repos/breadboard/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.config.ts
import { defineManifest } from "file:///Users/alex/Desktop/Projects/google_repos/breadboard/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  name: "breadboard-chrome-extension",
  version: "0.0.0",
  type: "module",
  scripts: {
    dev: "vite",
    build: "tsc && vite build",
    lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    preview: "vite preview",
    "generate:graphs": "wireit"
  },
  wireit: {
    "generate:graphs": {
      command: "npx tsx src/breadboard",
      files: [],
      output: [
        "public/graphs/**/*.json"
      ]
    }
  },
  dependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.23",
    "@exadev/breadboard-kits": "^0.10.1",
    "@fortawesome/free-solid-svg-icons": "^6.5.2",
    "@fortawesome/react-fontawesome": "^0.2.2",
    "@google-labs/breadboard": "^0.11.2",
    "@xenova/transformers": "^2.17.1",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-spinners": "^0.13.8"
  },
  devDependencies: {
    "@anthropic-ai/tokenizer": "^0.0.4",
    "@google-labs/core-kit": "^0.4.0",
    "@google-labs/tsconfig": "^0.0.1",
    "@mozilla/readability": "^0.5.0",
    "@types/chrome": "0.0.195",
    "@types/jsdom": "^21.1.6",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    dotenv: "^16.4.5",
    eslint: "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "js-tiktoken": "^1.0.11",
    jsdom: "^24.0.0",
    npm: "^10.5.2",
    tsx: "^4.10.2",
    typescript: "^5.3.3",
    vite: "^5.2.0"
  }
};

// manifest.config.ts
var { version } = package_default;
var [major, minor, patch, label = "0"] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);
var manifest_config_default = defineManifest(async () => ({
  manifest_version: 3,
  name: "Breadboard Runner",
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  description: "Basic Chrome extension for running Breadboard.",
  action: {
    default_popup: "src/pages/popup/index.html",
    default_title: "Breadboard Summarisation"
  },
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module"
  },
  content_scripts: [
    {
      js: ["src/content.tsx"],
      matches: ["https://www.google.com/*"]
    }
  ],
  permissions: ["scripting", "tabs", "activeTab", "storage", "contextMenus"],
  host_permissions: ["https://*/*", "http://*/*"],
  content_security_policy: {
    extension_pages: "script-src 'self' 'wasm-unsafe-eval'"
  },
  icons: {
    "16": "images/icon-32.png",
    "32": "images/icon-32.png"
  }
}));

// vite.config.ts
import { resolve } from "path";
import path from "path";
var __vite_injected_original_dirname = "/Users/alex/Desktop/Projects/google_repos/breadboard/packages/breadboard-chrome-extension";
var rootDir = resolve(__vite_injected_original_dirname);
var srcDir = resolve(rootDir, "src");
var pagesDir = resolve(srcDir, "pages");
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@breadboard": path.resolve(__vite_injected_original_dirname, "./src/breadboard"),
      "@pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
      "@background": path.resolve(__vite_injected_original_dirname, "./src/pages/background"),
      "@popup": path.resolve(__vite_injected_original_dirname, "./src/pages/popup"),
      "@settings": path.resolve(__vite_injected_original_dirname, "./src/pages/settings")
    }
  },
  plugins: [react(), crx({ manifest: manifest_config_default })],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(pagesDir, "popup", "index.html"),
        settings: resolve(pagesDir, "settings", "index.html")
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js"
      }
    }
  },
  esbuild: {
    supported: {
      "top-level-await": true
      //browsers can handle top-level-await features
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/anthropic": {
        target: "https://api.anthropic.com",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/anthropic/, "")
      },
      "/claude": {
        target: "https://api.anthropic.com",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/claude/, "/v1/complete")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hbGV4L0Rlc2t0b3AvUHJvamVjdHMvZ29vZ2xlX3JlcG9zL2JyZWFkYm9hcmQvcGFja2FnZXMvYnJlYWRib2FyZC1jaHJvbWUtZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWxleC9EZXNrdG9wL1Byb2plY3RzL2dvb2dsZV9yZXBvcy9icmVhZGJvYXJkL3BhY2thZ2VzL2JyZWFkYm9hcmQtY2hyb21lLWV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWxleC9EZXNrdG9wL1Byb2plY3RzL2dvb2dsZV9yZXBvcy9icmVhZGJvYXJkL3BhY2thZ2VzL2JyZWFkYm9hcmQtY2hyb21lLWV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBjcnggfSBmcm9tIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgbWFuaWZlc3QgZnJvbSBcIi4vbWFuaWZlc3QuY29uZmlnXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmNvbnN0IHJvb3REaXIgPSByZXNvbHZlKF9fZGlybmFtZSk7XG5jb25zdCBzcmNEaXIgPSByZXNvbHZlKHJvb3REaXIsIFwic3JjXCIpO1xuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHNyY0RpciwgXCJwYWdlc1wiKTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICBcIkBicmVhZGJvYXJkXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvYnJlYWRib2FyZFwiKSxcbiAgICAgIFwiQHBhZ2VzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvcGFnZXNcIiksXG4gICAgICBcIkBiYWNrZ3JvdW5kXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvcGFnZXMvYmFja2dyb3VuZFwiKSxcbiAgICAgIFwiQHBvcHVwXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvcGFnZXMvcG9wdXBcIiksXG4gICAgICBcIkBzZXR0aW5nc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3BhZ2VzL3NldHRpbmdzXCIpLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBjcngoeyBtYW5pZmVzdCB9KV0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgcG9wdXA6IHJlc29sdmUocGFnZXNEaXIsIFwicG9wdXBcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgICBzZXR0aW5nczogcmVzb2x2ZShwYWdlc0RpciwgXCJzZXR0aW5nc1wiLCBcImluZGV4Lmh0bWxcIiksXG4gICAgICB9LFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcInNyYy9wYWdlcy9bbmFtZV0vaW5kZXguanNcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgZXNidWlsZDoge1xuICAgIHN1cHBvcnRlZDoge1xuICAgICAgXCJ0b3AtbGV2ZWwtYXdhaXRcIjogdHJ1ZSwgLy9icm93c2VycyBjYW4gaGFuZGxlIHRvcC1sZXZlbC1hd2FpdCBmZWF0dXJlc1xuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUxNzMsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICBwcm94eToge1xuICAgICAgXCIvYW50aHJvcGljXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vYXBpLmFudGhyb3BpYy5jb21cIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYW50aHJvcGljLywgXCJcIiksXG4gICAgICB9LFxuICAgICAgXCIvY2xhdWRlXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vYXBpLmFudGhyb3BpYy5jb21cIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvY2xhdWRlLywgXCIvdjEvY29tcGxldGVcIiksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2FsZXgvRGVza3RvcC9Qcm9qZWN0cy9nb29nbGVfcmVwb3MvYnJlYWRib2FyZC9wYWNrYWdlcy9icmVhZGJvYXJkLWNocm9tZS1leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hbGV4L0Rlc2t0b3AvUHJvamVjdHMvZ29vZ2xlX3JlcG9zL2JyZWFkYm9hcmQvcGFja2FnZXMvYnJlYWRib2FyZC1jaHJvbWUtZXh0ZW5zaW9uL21hbmlmZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWxleC9EZXNrdG9wL1Byb2plY3RzL2dvb2dsZV9yZXBvcy9icmVhZGJvYXJkL3BhY2thZ2VzL2JyZWFkYm9hcmQtY2hyb21lLWV4dGVuc2lvbi9tYW5pZmVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcbmNvbnN0IHsgdmVyc2lvbiB9ID0gcGFja2FnZUpzb247XG5cbmNvbnN0IFttYWpvciwgbWlub3IsIHBhdGNoLCBsYWJlbCA9IFwiMFwiXSA9IHZlcnNpb25cbiAgLy8gY2FuIG9ubHkgY29udGFpbiBkaWdpdHMsIGRvdHMsIG9yIGRhc2hcbiAgLnJlcGxhY2UoL1teXFxkLi1dKy9nLCBcIlwiKVxuICAvLyBzcGxpdCBpbnRvIHZlcnNpb24gcGFydHNcbiAgLnNwbGl0KC9bLi1dLyk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZU1hbmlmZXN0KGFzeW5jICgpID0+ICh7XG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIG5hbWU6IFwiQnJlYWRib2FyZCBSdW5uZXJcIixcbiAgdmVyc2lvbjogYCR7bWFqb3J9LiR7bWlub3J9LiR7cGF0Y2h9LiR7bGFiZWx9YCxcbiAgdmVyc2lvbl9uYW1lOiB2ZXJzaW9uLFxuICBkZXNjcmlwdGlvbjogXCJCYXNpYyBDaHJvbWUgZXh0ZW5zaW9uIGZvciBydW5uaW5nIEJyZWFkYm9hcmQuXCIsXG4gIGFjdGlvbjoge1xuICAgIGRlZmF1bHRfcG9wdXA6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIixcbiAgICBkZWZhdWx0X3RpdGxlOiBcIkJyZWFkYm9hcmQgU3VtbWFyaXNhdGlvblwiLFxuICB9LFxuICBiYWNrZ3JvdW5kOiB7XG4gICAgc2VydmljZV93b3JrZXI6IFwic3JjL3BhZ2VzL2JhY2tncm91bmQvaW5kZXgudHNcIixcbiAgICB0eXBlOiBcIm1vZHVsZVwiLFxuICB9LFxuICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICB7XG4gICAgICBqczogW1wic3JjL2NvbnRlbnQudHN4XCJdLFxuICAgICAgbWF0Y2hlczogW1wiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8qXCJdLFxuICAgIH0sXG4gIF0sXG4gIHBlcm1pc3Npb25zOiBbXCJzY3JpcHRpbmdcIiwgXCJ0YWJzXCIsIFwiYWN0aXZlVGFiXCIsIFwic3RvcmFnZVwiLCBcImNvbnRleHRNZW51c1wiXSxcbiAgaG9zdF9wZXJtaXNzaW9uczogW1wiaHR0cHM6Ly8qLypcIiwgXCJodHRwOi8vKi8qXCJdLFxuICBjb250ZW50X3NlY3VyaXR5X3BvbGljeToge1xuICAgIGV4dGVuc2lvbl9wYWdlczogXCJzY3JpcHQtc3JjICdzZWxmJyAnd2FzbS11bnNhZmUtZXZhbCdcIixcbiAgfSxcbiAgaWNvbnM6IHtcbiAgICBcIjE2XCI6IFwiaW1hZ2VzL2ljb24tMzIucG5nXCIsXG4gICAgXCIzMlwiOiBcImltYWdlcy9pY29uLTMyLnBuZ1wiLFxuICB9LFxufSkpO1xuIiwgIntcbiAgXCJuYW1lXCI6IFwiYnJlYWRib2FyZC1jaHJvbWUtZXh0ZW5zaW9uXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4wXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJ0c2MgJiYgdml0ZSBidWlsZFwiLFxuICAgIFwibGludFwiOiBcImVzbGludCAuIC0tZXh0IHRzLHRzeCAtLXJlcG9ydC11bnVzZWQtZGlzYWJsZS1kaXJlY3RpdmVzIC0tbWF4LXdhcm5pbmdzIDBcIixcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcbiAgICBcImdlbmVyYXRlOmdyYXBoc1wiOiBcIndpcmVpdFwiXG4gIH0sXG4gIFwid2lyZWl0XCI6IHtcbiAgICBcImdlbmVyYXRlOmdyYXBoc1wiOiB7XG4gICAgICBcImNvbW1hbmRcIjogXCJucHggdHN4IHNyYy9icmVhZGJvYXJkXCIsXG4gICAgICBcImZpbGVzXCI6IFtdLFxuICAgICAgXCJvdXRwdXRcIjogW1xuICAgICAgICBcInB1YmxpYy9ncmFwaHMvKiovKi5qc29uXCJcbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjcnhqcy92aXRlLXBsdWdpblwiOiBcIl4yLjAuMC1iZXRhLjIzXCIsXG4gICAgXCJAZXhhZGV2L2JyZWFkYm9hcmQta2l0c1wiOiBcIl4wLjEwLjFcIixcbiAgICBcIkBmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29uc1wiOiBcIl42LjUuMlwiLFxuICAgIFwiQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lXCI6IFwiXjAuMi4yXCIsXG4gICAgXCJAZ29vZ2xlLWxhYnMvYnJlYWRib2FyZFwiOiBcIl4wLjExLjJcIixcbiAgICBcIkB4ZW5vdmEvdHJhbnNmb3JtZXJzXCI6IFwiXjIuMTcuMVwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1zcGlubmVyc1wiOiBcIl4wLjEzLjhcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYW50aHJvcGljLWFpL3Rva2VuaXplclwiOiBcIl4wLjAuNFwiLFxuICAgIFwiQGdvb2dsZS1sYWJzL2NvcmUta2l0XCI6IFwiXjAuNC4wXCIsXG4gICAgXCJAZ29vZ2xlLWxhYnMvdHNjb25maWdcIjogXCJeMC4wLjFcIixcbiAgICBcIkBtb3ppbGxhL3JlYWRhYmlsaXR5XCI6IFwiXjAuNS4wXCIsXG4gICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiMC4wLjE5NVwiLFxuICAgIFwiQHR5cGVzL2pzZG9tXCI6IFwiXjIxLjEuNlwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuNjZcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMi4yMlwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNy4yLjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNy4yLjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI6IFwiXjQuMi4xXCIsXG4gICAgXCJkb3RlbnZcIjogXCJeMTYuNC41XCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOC41Ny4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjQuNi4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LXJlZnJlc2hcIjogXCJeMC40LjZcIixcbiAgICBcImpzLXRpa3Rva2VuXCI6IFwiXjEuMC4xMVwiLFxuICAgIFwianNkb21cIjogXCJeMjQuMC4wXCIsXG4gICAgXCJucG1cIjogXCJeMTAuNS4yXCIsXG4gICAgXCJ0c3hcIjogXCJeNC4xMC4yXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMy4zXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMi4wXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2YixTQUFTLG9CQUFvQjtBQUMxZCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxXQUFXOzs7QUNGaWIsU0FBUyxzQkFBc0I7OztBQ0FwZTtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLElBQ1QsS0FBTztBQUFBLElBQ1AsT0FBUztBQUFBLElBQ1QsTUFBUTtBQUFBLElBQ1IsU0FBVztBQUFBLElBQ1gsbUJBQW1CO0FBQUEsRUFDckI7QUFBQSxFQUNBLFFBQVU7QUFBQSxJQUNSLG1CQUFtQjtBQUFBLE1BQ2pCLFNBQVc7QUFBQSxNQUNYLE9BQVMsQ0FBQztBQUFBLE1BQ1YsUUFBVTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWdCO0FBQUEsSUFDZCxzQkFBc0I7QUFBQSxJQUN0QiwyQkFBMkI7QUFB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
