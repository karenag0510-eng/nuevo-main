# Ortoook — Tenis ortopédicos personalizados para niños

## Problema original
Página web llamativa, bonita e infantil sobre zapatos ortopédicos para niños (referencia en video, marca "Ortoook"). Catálogo + contacto + diseñador interactivo de tenis, guardado en base de datos, colores llamativos, en español.

## Personas
- Padres/madres que buscan calzado ortopédico saludable y divertido para sus hijos.
- Niños que quieren personalizar sus tenis (colores/personajes).

## Arquitectura
- Frontend: React (CRA) + Tailwind, framer-motion (motion/reveals), Lenis (smooth scroll), react-fast-marquee, sonner (toasts). Estilo neo-brutalista/sticker, fuentes Fredoka + Nunito.
- Backend: FastAPI + MongoDB (motor). Rutas /api: GET /, POST/GET /contact, POST/GET /designs.
- SPA de una página con secciones ancla: Inicio, Productos, Diseña, Historia, Contacto, Footer.

## Implementado (2026-07-16)
- Hero cinético con reveal enmascarado línea por línea + tenis SVG parallax.
- Marquee editorial, sección de features (bento), catálogo (3 productos).
- Diseñador de Tenis interactivo: modelo, color, suela, personaje, talla, nombre → preview SVG en vivo; envío a /api/designs.
- Formulario de contacto + sucursales → /api/contact.
- Persistencia en MongoDB verificada. Testing e2e 100% (backend+frontend).

## Backlog / Próximos pasos
- P1: Panel admin para ver pedidos y contactos guardados.
- P1: Envío de pedido por WhatsApp / email (Resend) al enviar diseño.
- P2: Blog (sección del video), galería de fotos de clientes, más modelos e imágenes reales de producto.
- P2: Guía de tallas interactiva, selector de idioma.

## Actualización (2026-07-17) — Rebrand OrtoLook
- Marca cambiada a **OrtoLook**; logo recreado en vector (huella + wordmark azul/verde) en navbar y footer.
- Navbar: Inicio, Productos, Personalización, Ubicaciones, Contacto.
- Tenis del personalizador rediseñado (RealSneakerSVG) estilo chunky realista: suela texturizada con speckles, franjas laterales, sombreado dinámico. Nueva opción "Color de franjas y detalles" (color_acento, persistido en backend).
- Nueva sección Ubicaciones con 2 sucursales reales (Zapopan SUR - Las Águilas; Guadalajara NORTE - Santa Elena de la Cruz), mapas embed, "Cómo llegar", y CTA WhatsApp 334 462 1544.
- Contacto actualizado con WhatsApp/teléfono reales.
- Testing iteración 2: backend 100% (6/6), frontend 100% (34/34).
