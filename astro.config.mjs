import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";
import { definePlugin } from "emdash";
import type { PluginDescriptor } from "emdash";

export interface ReadTimeOptions {
  wordsPerMinute?: number;
}

export function readTimePlugin(options: ReadTimeOptions = {}): PluginDescriptor {
  return {
    id: "read-time",
    version: "0.1.0",
    format: "native",
    entrypoint: "@example/plugin-read-time",
    capabilities: ["content:read"],
    options,
  };
}

export function createPlugin(options: ReadTimeOptions = {}) {
  return definePlugin({
    id: "read-time",
    version: "0.1.0",
    capabilities: ["content:read"],
    admin: {
      settingsSchema: {
        wordsPerMinute: {
          type: "number",
          label: "Words per minute",
          default: options.wordsPerMinute ?? 200,
          min: 1,
        },
      },
    },
    hooks: {
      "content:afterSave": async (event, ctx) => {
        ctx.log.info("Content saved", { id: event.content.id });
      },
    },
  });
}

export default createPlugin;
export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto" }),
			storage: r2({ binding: "MEDIA" }),
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-body",
			weights: [400, 500, 600, 700],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: false },
});

