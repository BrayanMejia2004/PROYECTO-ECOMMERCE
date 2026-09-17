import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const products = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
	schema: z.object({
		nombre: z.string(),
		slug: z.string(),
		categoria: z.enum(['relojes']),
		// Subcategoría libre (ej. marca/estilo). Se usa para agrupar el catálogo.
		subcategoria: z.string().default(''),
		marca: z.string(),
		precio: z.number(),
		// Precio anterior (para mostrar descuento), opcional
		precioAntes: z.number().optional(),
		descripcion: z.string(),
		// Ficha técnica / características (etiqueta + detalle), opcional
		caracteristicas: z.array(z.object({ etiqueta: z.string(), detalle: z.string() })).default([]),
		destacado: z.boolean().default(false),
		activo: z.boolean().default(true),
		stock: z.boolean().default(true),
		// Rutas a las imágenes en /public/imagenes/productos/
		imagen: z.string(),
		galeria: z.array(z.string()).default([]),
		alt: z.string(),
	}).superRefine((data, ctx) => {
		// Los productos JoeFox no pueden tener precio anterior (descuento)
		if (data.marca.toLowerCase() === 'joefox' && data.precioAntes != null) {
			ctx.addIssue({
				code: 'custom',
				path: ['precioAntes'],
				message: 'Los productos JoeFox no llevan descuento. Elimina "precioAntes".',
			})
		}
	}),
})

export const collections = { products }