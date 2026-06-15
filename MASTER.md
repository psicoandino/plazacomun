# Plaza Comun beta_001 - Guia maestra de estructura

Este documento explica la estructura base de `beta_001` para que una persona o agente pueda entender, mantener y ampliar el sitio sin cambiar su logica central.

## Principio del proyecto

`beta_001` es un sitio estatico en vanilla HTML, CSS y JavaScript. No usa framework, build step, base de datos ni servidor propio.

La idea principal es separar tres responsabilidades:

- `index.html` muestra el archivo/listado de posts.
- `post.html` funciona como plantilla reusable para cualquier post.
- Los archivos JSON guardan el contenido y el indice editorial.

## Estructura principal

```text
beta_001/
├── index.html
├── post.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── app.js
│       └── post.js
├── data/
│   └── posts-index.json
├── content/
│   └── posts/
│       ├── raw/
│       │   └── chile_desempleo_para_curacion.json
│       ├── 2026_05_08_desempleo-chile-brechas-acceso.json
│       └── 2026_05_08_salud-mental-liceos.json
└── tests/
    └── validate-structure.js
```

## Secciones y responsabilidades

### `index.html`

Es la portada de la beta. Su funcion es mostrar el listado de posts disponibles.

No contiene el contenido completo de cada post. Solo carga `assets/js/app.js`, que lee `data/posts-index.json` y renderiza las tarjetas.

### `post.html`

Es la plantilla unica para leer posts.

No debe duplicarse por cada publicacion. Recibe el post mediante el parametro `id` en la URL:

```text
post.html?id=2026_05_08_salud-mental-liceos
```

Ese `id` se usa para cargar:

```text
content/posts/2026_05_08_salud-mental-liceos.json
```

### `data/posts-index.json`

Es el indice editorial publico. Controla que posts aparecen en la portada.

Cada entrada contiene los datos resumidos del post:

- `id`
- `title`
- `dek`
- `axisLabel`
- `territory`
- `publishedLabel`
- `url`

Este archivo no debe guardar el post completo. Solo debe contener la informacion necesaria para listar, filtrar o enlazar posts.

### `content/posts/`

Contiene el contenido completo de cada post.

*   `content/posts/raw/`: Subcarpeta que contiene los archivos JSON de extracción original (materia prima) antes de la curación.

La convencion de nombre es:

```text
YYYY_MM_DD_slug-del-post.json
```

Ejemplo:

```text
2026_06_15_nuevo-beneficio-local.json
```

Esta estructura mantiene todos los posts en una sola carpeta para facilitar busqueda, lectura y mantenimiento. La fecha queda integrada en el nombre del archivo, por lo que no se necesitan carpetas profundas como `posts/YYYY/MM/DD/` en esta etapa.

### `assets/js/app.js`

Controla la portada.

Responsabilidades:

- Cargar `data/posts-index.json`.
- Renderizar las tarjetas de posts.
- Mantener el modo claro/oscuro.
- Mostrar errores simples si el indice no carga.

### `assets/js/post.js`

Controla la lectura individual de posts.

Responsabilidades:

- Leer el parametro `id` desde la URL.
- Validar que el `id` tenga formato seguro.
- Cargar el JSON correspondiente desde `content/posts/`.
- Renderizar titulo, bajada, metadatos y secciones.
- Mostrar un mensaje de error si el post no existe.

### `assets/css/styles.css`

Contiene los estilos compartidos de portada y post.

En esta beta se reutiliza el lenguaje visual existente del proyecto para concentrar el experimento en arquitectura de contenido, no en rediseño.

### `tests/validate-structure.js`

Es una validacion liviana de estructura.

Comprueba que:

- Exista `index.html`.
- Exista `post.html`.
- Existan los JS y CSS principales.
- `posts-index.json` tenga posts.
- Cada `id` tenga formato `YYYY_MM_DD_slug`.
- Cada post listado tenga su archivo JSON correspondiente.
- Cada post tenga campos minimos como `title`, `dek`, `publishedAt` y `sections`.

## Workflow para subir un nuevo post

### 0. Guardar la materia prima (opcional)

Guardar el archivo JSON de extracción original en:

```text
content/posts/raw/
```

### 1. Crear el archivo del post

Crear un nuevo JSON en:

```text
content/posts/
```

Con nombre:

```text
YYYY_MM_DD_slug-del-post.json
```

Ejemplo:

```text
2026_06_15_acceso-salud-comunal.json
```

### 2. Definir el `id`

El `id` debe ser exactamente igual al nombre del archivo sin `.json`.

Ejemplo:

```json
"id": "2026_06_15_acceso-salud-comunal"
```

### 3. Escribir el contenido completo

El post debe incluir al menos:

```json
{
  "id": "2026_06_15_acceso-salud-comunal",
  "title": "Titulo del post",
  "dek": "Resumen breve del post.",
  "publishedAt": "2026-06-15",
  "publishedLabel": "2026-06-15",
  "axisLabel": "Servicios publicos y acceso",
  "territory": "Territorio relacionado",
  "readingTime": "5 min",
  "methodLabel": "Curaduria editorial",
  "sections": [
    {
      "heading": "Que esta pasando",
      "body": "Contenido de la seccion."
    }
  ]
}
```

### 4. Agregar el post al indice

Editar:

```text
data/posts-index.json
```

Agregar una entrada con el mismo `id`:

```json
{
  "id": "2026_06_15_acceso-salud-comunal",
  "title": "Titulo del post",
  "dek": "Resumen breve del post.",
  "axisLabel": "Servicios publicos y acceso",
  "territory": "Territorio relacionado",
  "publishedLabel": "2026-06-15",
  "url": "post.html?id=2026_06_15_acceso-salud-comunal"
}
```

### 5. Compartir la URL

La URL compartible del post sera:

```text
post.html?id=2026_06_15_acceso-salud-comunal
```

## Reglas importantes

1. No crear un HTML nuevo por cada post.
2. No duplicar `post.html`.
3. No guardar posts completos dentro de `posts-index.json`.
4. El `id`, el nombre del archivo y la URL deben coincidir.
5. Mantener los posts en `content/posts/` mientras el volumen sea manejable.
6. Si el proyecto crece mucho, recien ahi evaluar paginacion, busqueda o carpetas por ano.

## Decision senior

Para esta beta, la mejor estructura es un archivo `post.html` reusable y posts planos nombrados como `YYYY_MM_DD_slug.json`.

Esto reduce friccion, evita sobreingenieria, facilita busqueda local y conserva URLs compartibles. Tambien deja abierta la puerta a futuras capas como comentarios, reacciones, fuentes, actualizaciones o moderacion sin cambiar la base del sitio.
