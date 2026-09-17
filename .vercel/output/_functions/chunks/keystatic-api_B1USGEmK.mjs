import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { r as setOnSetGetEnv, t as getEnv$1 } from "./runtime_x1Na2qzi.mjs";
import { makeGenericAPIRouteHandler } from "@keystatic/core/api/generic";
import { collection, config, fields } from "@keystatic/core";
//#region \0astro:env/server
/** @returns {string} */
var getEnv = (key) => {
	return getEnv$1(key);
};
var getSecret = (key) => {
	return getEnv(key);
};
setOnSetGetEnv(() => {});
//#endregion
//#region node_modules/@keystatic/astro/dist/keystatic-astro-api.js
function makeHandler(_config) {
	return async function keystaticAPIRoute(context) {
		var _config$clientId, _config$clientSecret, _config$secret;
		const { body, headers, status } = await makeGenericAPIRouteHandler({
			..._config,
			clientId: (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : getSecret("KEYSTATIC_GITHUB_CLIENT_ID"),
			clientSecret: (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : getSecret("KEYSTATIC_GITHUB_CLIENT_SECRET"),
			secret: (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : getSecret("KEYSTATIC_SECRET")
		}, { slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG" })(context.request);
		return new Response(body, {
			status,
			headers
		});
	};
}
//#endregion
//#region keystatic.config.ts
var products = collection({
	label: "Productos",
	slugField: "slug",
	path: "src/content/products/**",
	format: "json",
	columns: [
		"nombre",
		"categoria",
		"precio",
		"destacado",
		"activo"
	],
	schema: {
		nombre: fields.text({
			label: "Nombre",
			validation: { isRequired: true }
		}),
		slug: fields.slug({
			label: "Enlace (URL)",
			name: {
				label: "Slug",
				validation: { isRequired: true }
			}
		}),
		categoria: fields.select({
			label: "Categoría",
			options: [{
				label: "Relojes",
				value: "relojes"
			}],
			defaultValue: "relojes"
		}),
		subcategoria: fields.text({
			label: "Subcategoría (tipo/estilo)",
			description: "Agrupa productos dentro de la categoría, ej: JoeFox, Peodagar, Deportivos… Se crea sola y aparece en /relojes."
		}),
		marca: fields.text({
			label: "Marca",
			validation: { isRequired: true }
		}),
		precio: fields.number({
			label: "Precio (COP)",
			validation: {
				isRequired: true,
				min: 0
			}
		}),
		precioAntes: fields.number({
			label: "Precio anterior (COP) — opcional",
			description: "Solo si quieres mostrar un descuento tachado.",
			validation: { min: 0 }
		}),
		descripcion: fields.text({
			label: "Descripción",
			multiline: true,
			validation: { isRequired: true }
		}),
		caracteristicas: fields.array(fields.object({
			etiqueta: fields.text({
				label: "Característica",
				validation: { isRequired: true }
			}),
			detalle: fields.text({
				label: "Detalle",
				validation: { isRequired: true }
			})
		}), {
			label: "Ficha técnica / características",
			itemLabel: (props) => props.value?.etiqueta ?? "Característica",
			description: "Aparece en la página del producto. Ej: Sistema, Material, Resistencia…"
		}),
		imagen: fields.image({
			label: "Imagen principal",
			directory: "public/imagenes/productos",
			publicPath: "/imagenes/productos/"
		}),
		galeria: fields.array(fields.image({
			label: "Imagen",
			directory: "public/imagenes/productos",
			publicPath: "/imagenes/productos/"
		}), {
			label: "Galería de imágenes (opcional)",
			itemLabel: (props) => props.value?.src.split("/").pop() ?? "Imagen"
		}),
		alt: fields.text({
			label: "Texto alternativo (SEO)",
			validation: { isRequired: true }
		}),
		destacado: fields.checkbox({
			label: "Destacado en la portada",
			defaultValue: false
		}),
		activo: fields.checkbox({
			label: "Visible en la tienda",
			defaultValue: true
		}),
		stock: fields.checkbox({
			label: "Disponible",
			description: "Desmarca para mostrar el producto como agotado.",
			defaultValue: true
		})
	}
});
var keystatic_config_default = config({
	storage: {
		kind: "github",
		repo: "TU_USUARIO/PROYECTO-ECOMMERCE"
	},
	collections: { products }
});
//#endregion
//#region node_modules/@keystatic/astro/internal/keystatic-api.js
var keystatic_api_exports = /* @__PURE__ */ __exportAll({
	ALL: () => ALL,
	all: () => all,
	prerender: () => false
});
var all = makeHandler({ config: keystatic_config_default });
var ALL = all;
//#endregion
//#region \0virtual:astro:page:node_modules/@keystatic/astro/internal/keystatic-api@_@js
var page = () => keystatic_api_exports;
//#endregion
export { page };
