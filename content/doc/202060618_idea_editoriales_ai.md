# Concepto: Staff Editorial de Agentes IA para Plaza Común

## Idea General

Plaza Común no se concibe como un sitio de noticias tradicional ni como un sistema completamente automatizado. La idea es construir una red de asistentes editoriales especializados que colaboren con un editor humano.

El objetivo no es reemplazar el criterio editorial humano, sino ampliar la capacidad de observación, análisis, contraste y producción de contenido.

La estructura se parece más a una pequeña redacción periodística que a un único chatbot.

---

## Principio Rector

La IA no decide qué es verdad.

La IA ayuda a:

* observar
* investigar
* contrastar
* sintetizar
* cuestionar
* redactar

La decisión final permanece siempre en el editor humano.

---

## Arquitectura Conceptual

### Editor Jefe (Humano)

Responsabilidades:

* Define agenda editorial.
* Selecciona temas.
* Aprueba publicaciones.
* Resuelve controversias.
* Mantiene la línea editorial.

Todos los agentes reportan finalmente a esta figura.

---

## Agente 1: Curador de Observación Pública

Rol:

Detectar señales relevantes dentro del flujo de información.

Entradas:

* Noticias.
* Comunicados públicos.
* Datos estatales.
* Informes.
* Documentos técnicos.

Funciones:

* Clasificar contenido.
* Detectar tendencias.
* Agrupar temas similares.
* Identificar eventos emergentes.
* Priorizar material para revisión.

Salida:

Lista priorizada de temas potencialmente relevantes.

---

## Agente 2: Investigador Documental

Rol:

Expandir contexto.

Funciones:

* Buscar antecedentes.
* Localizar fuentes primarias.
* Recuperar legislación.
* Identificar estadísticas.
* Detectar evidencia faltante.

Salida:

Dossier documental.

---

## Agente 3: Verificador Metodológico

Rol:

Auditar afirmaciones.

Funciones:

* Revisar coherencia.
* Detectar saltos lógicos.
* Señalar afirmaciones sin evidencia.
* Identificar contradicciones.
* Clasificar nivel de confianza.

Salida:

Informe de confiabilidad.

---

## Agente 4: Analista Territorial

Rol:

Traducir información nacional a impactos concretos.

Funciones:

* Identificar territorios afectados.
* Detectar diferencias regionales.
* Analizar efectos locales.
* Construir lectura territorial.

Salida:

Resumen territorial.

---

## Agente 5: Traductor Ciudadano

Rol:

Transformar lenguaje técnico en lenguaje cotidiano.

Funciones:

* Simplificar conceptos.
* Eliminar jerga.
* Explicar procedimientos.
* Generar ejemplos.

Pregunta central:

"¿Cómo se lo explicaríamos a una persona común?"

Salida:

Versión comprensible.

---

## Agente 6: Columnista de Perspectivas

Rol:

Ejercer crítica intelectual.

Puede operar mediante múltiples variantes.

### Variante Liberal

Busca:

* Libertades individuales.
* Menor intervención estatal.
* Incentivos de mercado.

### Variante Socialdemócrata

Busca:

* Equidad.
* Protección social.
* Capacidades estatales.

### Variante Conservadora

Busca:

* Instituciones.
* Continuidad histórica.
* Estabilidad.

### Variante Progresista

Busca:

* Inclusión.
* Derechos.
* Transformación social.

### Variante Técnica

Busca:

* Evidencia.
* Costos.
* Viabilidad.

Salida:

Múltiples interpretaciones del mismo fenómeno.

---

## Agente 7: Escéptico Profesional

Rol:

Atacar las conclusiones preliminares.

Funciones:

* Buscar contraejemplos.
* Identificar sesgos.
* Detectar sobreinterpretaciones.
* Cuestionar causalidades débiles.

Pregunta central:

"¿Y si esta conclusión estuviera equivocada?"

Salida:

Informe crítico.

---

## Agente 8: Redactor Senior

Rol:

Construir la versión editorial final.

Funciones:

* Organizar estructura narrativa.
* Integrar evidencia.
* Mantener claridad.
* Ajustar tono.

Salida:

Borrador publicable.

---

## Agente 9: Editor de Estilo

Rol:

Revisar calidad editorial.

Funciones:

* Claridad.
* Coherencia.
* Precisión.
* Fluidez.
* Consistencia con el manifiesto editorial.

Salida:

Versión final revisada.

---

## Flujo Ideal

Extracción
↓
Curador
↓
Investigador
↓
Verificador
↓
Analista Territorial
↓
Traductor Ciudadano
↓
Perspectivas Ideológicas
↓
Escéptico
↓
Redactor Senior
↓
Editor de Estilo
↓
Editor Humano
↓
Publicación

---

## Implementación Inicial Recomendada

No construir agentes autónomos todavía.

Primera etapa:

* Un conjunto de prompts especializados.
* Un archivo Markdown por rol.
* Ejecución manual.
* Supervisión humana completa.

Cada agente es inicialmente:

* una identidad,
* un conjunto de instrucciones,
* criterios de evaluación,
* formato de salida.

Sólo después de validar el proceso editorial durante varios meses tendría sentido automatizar partes del flujo mediante agentes persistentes o frameworks especializados.

La hipótesis central es que Plaza Común podría operar como una pequeña redacción híbrida humano-IA donde distintos agentes aportan perspectivas complementarias, reduciendo puntos ciegos y aumentando el rigor editorial sin perder control humano sobre el producto final.
