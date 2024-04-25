import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async () => ({
  manifest_version: 3,
  name: "breadboard-chrome-extension",
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  description: "Basic Chrome extension for running Breadboard.",
  options_page: 'src/pages/options/index.html',
  action: {
    default_popup: "src/pages/popup/index.html",
    default_title: "Breadboard Summarisation",
  },
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module",
  },
  content_scripts: [
    {
      js: ["src/content.tsx"],
      matches: ["https://www.google.com/*"],
    },
  ],
  permissions: ["scripting", "tabs", "activeTab", "storage"],
  host_permissions: ["https://*/*", "http://*/*"],
  icons: {
    "32": "images/icon-32.png",
  },
}));
