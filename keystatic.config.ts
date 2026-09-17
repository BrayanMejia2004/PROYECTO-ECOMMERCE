import { config, collection, fields } from '@keystatic/core'

const products = collection({
	label: 'Productos',
	slugField: 'slug',
	path: 'src/content/products/**',
	format: 'json',
	columns: ['nombre', 'categoria', 'precio', 'destacado', 'activo'],
	schema: {
		nombre: fields.text({ label: 'Nombre', validation: { isRequired: true } }),
		slug: fields.slug({
			label: 'Enlace (URL)',
			name: { label: 'Slug', validation: { isRequired: true } },
		}),
		categoria: fields.select({
			label: 'Categoría',
			options: [{ label: 'Relojes', value: 'relojes' }],
			defaultValue: 'relojes',
		}),
		subcategoria: fields.text({
			label: 'Subcategoría (tipo/estilo)',
			description:
				'Agrupa productos dentro de la categoría, ej: JoeFox, Peodagar, Deportivos… Se crea sola y aparece en /relojes.',
		}),
		marca: fields.text({ label: 'Marca', validation: { isRequired: true } }),
		precio: fields.number({
			label: 'Precio (COP)',
			validation: { isRequired: true, min: 0 },
		}),
		precioAntes: fields.number({
			label: 'Precio anterior (COP) — opcional',
			description: 'Solo si quieres mostrar un descuento tachado.',
			validation: { min: 0 },
		}),
		descripcion: fields.text({
			label: 'Descripción',
			multiline: true,
			validation: { isRequired: true },
		}),
		caracteristicas: fields.array(
			fields.object({
				etiqueta: fields.text({ label: 'Característica', validation: { isRequired: true } }),
				detalle: fields.text({ label: 'Detalle', validation: { isRequired: true } }),
			}),
			{
				label: 'Ficha técnica / características',
				itemLabel: (props) => props.value?.etiqueta ?? 'Característica',
				description: 'Aparece en la página del producto. Ej: Sistema, Material, Resistencia…',
			}
		),
		imagen: fields.image({
			label: 'Imagen principal',
			directory: 'public/imagenes/productos',
			publicPath: '/imagenes/productos/',
		}),
		galeria: fields.array(
			fields.image({
				label: 'Imagen',
				directory: 'public/imagenes/productos',
				publicPath: '/imagenes/productos/',
			}),
			{
				label: 'Galería de imágenes (opcional)',
				itemLabel: (props) => props.value?.src.split('/').pop() ?? 'Imagen',
			}
		),
		alt: fields.text({ label: 'Texto alternativo (SEO)', validation: { isRequired: true } }),
		destacado: fields.checkbox({ label: 'Destacado en la portada', defaultValue: false }),
		activo: fields.checkbox({ label: 'Visible en la tienda', defaultValue: true }),
		stock: fields.checkbox({
			label: 'Disponible',
			description: 'Desmarca para mostrar el producto como agotado.',
			defaultValue: true,
		}),
	},
})

export default config({
	storage: {
		kind: 'github',
		// TODO: reemplázalo por tu usuariode GitHub y el nombre del repositorio
		repo: 'TU_USUARIO/PROYECTO-ECOMMERCE',
	},
	collections: { products },
})