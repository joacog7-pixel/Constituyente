# Comité Constituyente Republicano — constituyente.com.co

## Pasos para publicar el sitio

### 1. Crear el repositorio en GitHub

1. Ve a github.com e inicia sesión
2. Clic en el botón verde "New" (repositorio nuevo)
3. Nombre: `constituyente`
4. Visibilidad: **Public** (necesario para Netlify gratuito)
5. Clic en "Create repository"
6. Sube todos estos archivos usando "uploading an existing file"

### 2. Conectar con Netlify

1. Ve a app.netlify.com e inicia sesión
2. Clic en "Add new site" → "Import an existing project"
3. Elige GitHub y selecciona el repositorio `constituyente`
4. En "Build settings" deja todo vacío (es un sitio estático)
5. Clic en "Deploy site"

### 3. Conectar tu dominio constituyente.com.co

1. En Netlify: Site settings → Domain management → Add domain
2. Escribe: `constituyente.com.co`
3. Netlify te dará unos nameservers (ej: dns1.p01.nsone.net)
4. Ve al panel de tu registrador de dominio (.co) y cambia los nameservers

### 4. Activar el panel de administración (Decap CMS)

1. En Netlify: Site settings → Identity → Enable Identity
2. En la misma página: Registration → Invite only
3. Ir a: Site settings → Identity → Services → Git Gateway → Enable
4. Luego: Identity → Invite users → escribe tu correo
5. Revisa tu correo y acepta la invitación
6. El panel estará en: https://constituyente.com.co/admin

### 5. Importante: editar config.yml

Abre el archivo `admin/config.yml` y cambia esta línea:

```
repo: TU-USUARIO/constituyente
```

por tu usuario real de GitHub, por ejemplo:

```
repo: juanperez/constituyente
```

---

## Cómo publicar una noticia

1. Ve a constituyente.com.co/admin
2. Inicia sesión con tu correo
3. Clic en "Noticias" → "Índice de noticias"
4. Agrega una nueva entrada con título, fuente, fecha, URL y resumen
5. Clic en "Publish" — aparece en el sitio en segundos

## Cómo publicar un artículo del blog

1. Ve a constituyente.com.co/admin
2. Clic en "Blog" → "Índice del blog"
3. Agrega el artículo con título, slug, categoría, autor, fecha y resumen
4. Clic en "Publish"

---

## Estructura de archivos

```
constituyente/
├── index.html          — Página principal
├── blog.html           — Listado del blog
├── comite.html         — Quiénes somos
├── netlify.toml        — Configuración de Netlify
├── css/
│   └── style.css       — Estilos del sitio
├── js/
│   └── main.js         — Carga dinámica de contenido
├── content/
│   ├── noticias/
│   │   └── index.json  — Lista de noticias (editar desde CMS)
│   └── blog/
│       └── index.json  — Lista de artículos (editar desde CMS)
└── admin/
    ├── index.html      — Panel de administración
    └── config.yml      — Configuración del CMS
```
