# Resumen Maestro — Plaza Común / Psicoandino
**Sesión:** Junio 2026 | **Autor:** Ricardo Alberto

---

## 1. El Ecosistema

**Psicoandino** es la marca madre. Su ADN: Knowledge → Research → Development.
**Plaza Común** es el brazo de difusión público. Su relación: Psicoandino investiga, Plaza Común traduce y publica.

Son el mismo árbol. Psicoandino es la raíz. Plaza Común es el fruto visible.

---

## 2. La Filosofía Central

> Nacemos sin manual. El sistema opera igual si lo entendés o no.
> Plaza Común traduce las reglas del lugar donde vivimos.
> Sin partido. Sin agenda. Sin juicio.

**Concepto organizador:** *Arqueología de sistemas públicos.*
Desenterrar cómo opera realmente la máquina del Estado para que el ciudadano pueda usarla a su favor.

**Lo que NO es Plaza Común:**
- No es periodismo de actualidad
- No es activismo político
- No tiene inclinación ideológica
- No condesciente ni alecciona

**Lo que SÍ es:**
- Traducción del Estado al español chileno cotidiano
- Información de par a par
- Utilidad práctica inmediata
- Dignidad cognitiva del lector

---

## 3. El Manifiesto (v3 — listo para publicar)

Porque nacemos sin manual.

Llegamos a un mundo que ya estaba operando antes de nosotros. Con sus reglas, sus sistemas, sus causas y sus efectos. Nadie nos pide permiso. Nadie nos explica el contrato.

Pero el contrato existe igual.

Hay leyes que determinan lo que podés hacer. Instituciones que deciden lo que te corresponde. Plazos que corren aunque no los conozcas. Beneficios que expiran en silencio.

Comprender ese sistema no es un privilegio — es una posibilidad abierta para cualquier persona que quiera habitarlo con más libertad.

En Plaza Común traducimos las reglas del lugar donde vivimos. Sin partido. Sin agenda. Sin juicio sobre de dónde venís ni hacia dónde vais.

Solo las reglas del lugar donde vivís, traducidas.

Porque entender es el primer territorio que nadie te puede quitar.

**Estructura invisible:** Árbol de la vida (Cábala).
Kether (arriba) → "Porque nacemos sin manual" — lo abstracto, el origen.
Tronco → el sistema que opera igual sepas o no.
Malkuth (abajo) → "el primer territorio que nadie te puede quitar" — lo concreto, lo territorial.

---

## 4. La Audiencia

**Perfil:** Persona chilena, 20–40 años, sectores populares o clase media.
**Característica clave:** Busca desde la intuición funcional y la jerga cotidiana. El Estado le responde desde la norma jurídica. Plaza Común vive en ese medio.

**Búsquedas reales con mayor volumen mensual:**
- "cómo saber qué bonos tengo con mi rut" → 250.000–350.000
- "cómo saber en qué tramo de fonasa estoy" → 110.000–140.000
- "cómo recuperar mi clave única" → 80.000–100.000
- "cómo calcular boleta de honorarios líquida" → 75.000–90.000
- "cómo salir de dicom" → 65.000–80.000

---

## 5. El Vacío que Plaza Común Ocupa

Nadie está respondiendo desde el lado del ciudadano:
- El Estado comunica desde la norma jurídica
- Los abogados comunican para cobrar
- Los bancos comunican para vender
- Los medios comunican desde la agenda política

**El espacio libre:** traductor neutral, sin sesgo, con utilidad práctica inmediata.

---

## 6. Los 10 Conceptos Fundacionales (La Escuela)

Secuencia de dependencias lógicas — cada concepto es prerequisito del siguiente.

| Nivel | # | Concepto |
|---|---|---|
| 1 — Infraestructura | 1 | La Clave Única: tu identidad digital |
| 1 — Infraestructura | 2 | El RSH: el algoritmo que te clasifica |
| 2 — Salud | 3 | Tramos Fonasa vs RSH: dos sistemas distintos |
| 2 — Salud | 4 | Copago Cero y GES: la red de seguridad sanitaria |
| 3 — Trabajo | 5 | Boleta de honorarios y el 15.25%: tu seguridad social |
| 3 — Trabajo | 6 | Iniciación de actividades: formalizarte sin miedo |
| 3 — Trabajo | 7 | Contrato y finiquito: tu escudo laboral |
| 4 — Deuda | 8 | FUAS y CAE: el financiamiento del futuro |
| 4 — Deuda | 9 | DICOM y prescripción: el reseteo financiero |
| 5 — Territorio | 10 | La municipalidad: el Estado que tenés más cerca |

**Primer concepto piloto a escribir:** #1 — La Clave Única.

---

## 7. El Formato de Cada Artículo

Patrón fijo, máximo 800 palabras:

1. **La Fricción** — el problema cotidiano que el lector quiere resolver
2. **La Arquitectura** — cómo diseñó el Estado esa herramienta (sin juicios)
3. **El Hack Operativo** — el paso a paso exacto para actuar ahora

---

## 8. La Identidad Visual

**Paleta — reinterpretación de la bandera chilena:**
- Negro OLED `#000000` → territorio dominante (ahorra energía en pantallas OLED)
- Blanco → texto principal
- Acento dinámico elegido por el usuario:
  - `sangre` #B71C2F — rojo bandera original
  - `cobre` #2E7A6E — óxido de cobre / calipso
  - `tierra` #2E5E3E — verde suelo chileno
  - `mostaza` #8A5E10 — amarillo cálido

**Stack técnico:** Vanilla HTML + CSS + JS. Sin framework. Sin base de datos.
**Arquitectura:** `index.html` (portada) + `post.html` (template único) + JSONs de contenido.

---

## 9. La Arquitectura del Sitio (beta_001)

```
plaza-comun/
├── index.html              — portada / archivo de posts
├── post.html               — template reutilizable para todos los posts
├── assets/
│   ├── css/styles.css
│   └── js/
│       ├── app.js          — lógica de portada
│       └── post.js         — lógica de lectura individual
├── data/
│   └── posts-index.json    — índice editorial público
└── content/
    └── posts/
        ├── raw/            — materia prima antes de curación
        └── YYYY_MM_DD_slug.json — posts publicados
```

**Para publicar un post nuevo:**
1. Crear `content/posts/YYYY_MM_DD_slug.json`
2. Agregar entrada en `data/posts-index.json`
3. URL compartible: `post.html?id=YYYY_MM_DD_slug`

---

## 10. El Pipeline Editorial (con IA)

1. **Búsqueda humana** — Ricardo define el tema y el ángulo
2. **Extracción** — script produce JSON con fuentes en `content/posts/raw/`
3. **Curación IA** — agente con `master-curation-prompt-v1.md` transforma el raw en post estructurado
4. **Revisión humana** — Ricardo aprueba antes de publicar
5. **Publicación** — JSON final + entrada en índice

**Principio:** Human-in-the-loop. No automatización total. La intuición editorial es de Ricardo.

---

## 11. División de Roles con IA

| Ricardo | IA (Claude) |
|---|---|
| Intuición, alma, valores | Pipeline, arquitectura, orden |
| Qué se siente verdadero | Qué sigue y por qué |
| Aprobación final | Propuesta y ejecución |

---

## 12. Próximos Pasos en Orden

1. **Publicar manifiesto** — página `/manifiesto` en el sitio
2. **Escribir concepto #1** — La Clave Única (Fricción / Arquitectura / Hack)
3. **Diseñar experiencia bibliográfica** — citas integradas en el cuerpo, no lista al final
4. **Definir sección Escuela** — los 10 conceptos como currículum navegable
5. **Monetización** — investigar modelos de proyectos editoriales independientes similares

---

## Prompt de Contexto para Nueva Sesión

```
Soy Ricardo Alberto, creador de Plaza Común (portal de 
inteligencia cívica chilena) y Psicoandino (marca madre: 
knowledge, research, development).

Plaza Común traduce el Estado chileno al español cotidiano.
Concepto organizador: arqueología de sistemas públicos.
Sin ideología. Sin agenda. Utilidad práctica.

Stack: vanilla HTML/CSS/JS. Sin framework.
Manifiesto: listo (v3, estructura árbol de la vida).
10 conceptos fundacionales: definidos y priorizados.
Formato de artículo: Fricción / Arquitectura / Hack Operativo.

División de trabajo: Ricardo pone el alma e intuición.
Claude lleva el pipeline y propone el orden.

PRÓXIMO PASO: escribir concepto piloto #1 — La Clave Única.
Formato: Fricción / Arquitectura / Hack Operativo. Máx 800 palabras.
Tono: par a par, español chileno, sin condescendencia.