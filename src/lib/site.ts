export const SITE = {
	name: 'CronoVisión',
	tagline: 'Precisión & Presencia',
	description:
		'CronoVisión | Curaduría de relojes en Colombia. Piezas seleccionadas con verificación en vivo por WhatsApp y despachos asegurados a todo el país.',
	currency: 'COP',
	// WhatsApp en formato internacional sin "+" (código 57 + 3024550409)
	whatsapp: '573024550409',
	siteUrl: 'https://cronovision.vercel.app',
}

export type Categoria = 'relojes'

export const CATEGORIAS: { key: Categoria; nombre: string; descripcion: string }[] = [
	{
		key: 'relojes',
		nombre: 'Relojes',
		descripcion: 'Relojes para hombre en Colombia: cronógrafos y modelos de distinción.',
	},
]

/** Formatea un valor numérico como moneda colombiana: $ 1.200.000 */
export function formatPrice(valor: number): string {
	return new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: SITE.currency,
		maximumFractionDigits: 0,
	}).format(valor)
}

/** Construye un enlace de WhatsApp con un mensaje prellenado */
export function whatsappLink(mensaje: string): string {
	return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensaje)}`
}

export const MENSAJE_GENERAL = `Hola ${SITE.name} 👋, me gustaría recibir información sobre sus productos.`

/**
 * Devuelve la versión optimizada (.webp) de una imagen de producto.
 * Los SVG y las imágenes ya en WebP se devuelven tal cual.
 */
export function optimizarImagen(ruta: string): string {
	if (/\.(webp|svg|avif)$/i.test(ruta)) return ruta
	return ruta.replace(/\.(png|jpe?g)$/i, '.webp')
}