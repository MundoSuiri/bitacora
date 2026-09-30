import handler, { createScheduledHandler, PluginBridge } from "@emdash-cms/cloudflare/worker";
// 1. Importación del plugin (Añade aquí la importación específica de tu plugin)
// import miPluginPersonalizado from "paquete-del-plugin";

export { PluginBridge };

export default {
	...handler,
	// 2. Configuración del plugin (La sintaxis exacta dependerá del plugin que estés utilizando)
	// fetch: (request, env, ctx) => handler.fetch(request, env, ctx, { plugins: [miPluginPersonalizado] }),
	scheduled: createScheduledHandler(/* [miPluginPersonalizado] */),
} satisfies ExportedHandler;
