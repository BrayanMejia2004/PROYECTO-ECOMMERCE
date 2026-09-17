export interface ConsultaItem {
	slug: string
	nombre: string
	precio: number
	url: string
	imagen: string
}

const KEY = 'cronovision-consulta'
// WhatsApp de la tienda en formato internacional sin "+"
export const WHATSAPP = '573024550409'

export function getItems(): ConsultaItem[] {
	try {
		const raw = localStorage.getItem(KEY)
		if (!raw) return []
		const data = JSON.parse(raw)
		return Array.isArray(data) ? data : []
	} catch {
		return []
	}
}

function saveItems(items: ConsultaItem[]): void {
	localStorage.setItem(KEY, JSON.stringify(items))
}

export function addItem(item: ConsultaItem): void {
	const items = getItems()
	if (!items.some((i) => i.slug === item.slug)) {
		items.push(item)
		saveItems(items)
	}
}

export function removeItem(slug: string): void {
	saveItems(getItems().filter((i) => i.slug !== slug))
}

export function clearItems(): void {
	saveItems([])
}

export function formatPrice(valor: number): string {
	return new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		maximumFractionDigits: 0,
	}).format(valor)
}

export function buildMessage(items: ConsultaItem[]): string {
	const lineas = items.map((i, idx) => `${idx + 1}. ${i.nombre} — ${formatPrice(i.precio)}`)
	return `Hola CronoVisión 👋, me interesó esta lista de productos:\n\n${lineas.join('\n')}`
}

export function openWhatsApp(mensaje: string): void {
	window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`, '_blank')
}