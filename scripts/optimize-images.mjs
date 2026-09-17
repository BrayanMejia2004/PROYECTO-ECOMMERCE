/**
 * Optimiza automáticamente las imágenes de productos.
 *
 * Recorre `public/imagenes/productos/` y por cada JPG/PNG genera una versión
 * WebP optimizada (máximo 1200×1200 px, calidad 80) con el mismo nombre,
 * por ejemplo: foto.png → foto.webp.
 *
 * Solo se regenera una imagen cuando cambió su archivo de origen.
 *
 * Uso:
 *   npm run images   (manual / local)
 *   npm run build    (la ejecuta automáticamente vía "prebuild")
 */
import { readdir, stat, rename } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const DIR = fileURLToPath(new URL('../public/imagenes/productos/', import.meta.url))
const MAX = 1200
const CALIDAD = 80
const FUENTES = new Set(['.jpg', '.jpeg', '.png'])

async function walk(dir) {
	return readdir(dir, { withFileTypes: true })
}

async function optimizar(rutaCompleta, nombre) {
	const ext = path.extname(nombre).toLowerCase()
	if (!FUENTES.has(ext)) return 'omitido'

	const destino = path.join(path.dirname(rutaCompleta), `${path.parse(nombre).name}.webp`)

	// Si ya existe un .webp más reciente que la fuente, no se regenera.
	const [srcStats, outStats] = await Promise.all([
		stat(rutaCompleta),
		stat(destino).catch(() => null),
	])
	if (outStats && outStats.mtimeMs >= srcStats.mtimeMs) {
		return 'sin cambios'
	}

	// Se escribe en un temporal y se reemplaza (evita bloqueos/nombre en uso).
	const temporal = `${destino}.tmp-${process.pid}`
	await sharp(rutaCompleta)
		.resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
		.webp({ quality: CALIDAD })
		.toFile(temporal)
	await rename(temporal, destino)

	return 'optimizada'
}

async function procesar(dir) {
	const entradas = await walk(dir)
	for (const entrada of entradas) {
		const rutaCompleta = path.join(dir, entrada.name)
		if (entrada.isDirectory()) {
			await procesar(rutaCompleta)
			continue
		}
		const resultado = await optimizar(rutaCompleta, entrada.name).catch((e) => {
			console.error(`  ✗ Error en ${entrada.name}: ${e.message}`)
			return 'error'
		})
		if (resultado === 'optimizada') {
			console.log(`  ✓ ${entrada.name} → .webp`)
		}
	}
}

console.log('Optimizando imágenes de productos…')
await procesar(DIR)
console.log('Listo.')