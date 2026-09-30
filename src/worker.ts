import handler, { createScheduledHandler, PluginBridge } from "@emdash-cms/cloudflare/worker";

// 1. Importa el plugin o plugins que deseas instalar
// Reemplaza "nombre-del-plugin" con el paquete real que estés utilizando
import miPlugin from "nombre-del-plugin"; 

export { PluginBridge };

// 2. Agrupa todos tus plugins en un arreglo
const pluginsActivos = [miPlugin];

export default {
	// 3. Inyecta los plugins en el ciclo de vida de las peticiones HTTP
	fetch: (request, env, ctx) => {
		return handler.fetch(request, env, ctx, { plugins: pluginsActivos });
	},
	// 4. Inyecta los plugins en el ciclo de tareas programadas (CRON)
	scheduled: createScheduledHandler(pluginsActivos),
} satisfies ExportedHandler;
