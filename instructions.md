# Instrucciones para agentes — Quiniela LKS Next · Mundial 2026

Este documento recoge todo lo que un agente de IA necesita saber para trabajar con este repositorio de forma eficiente y sin romper nada.

---

## ¿Qué es este proyecto?

Una aplicación web de quiniela del Mundial de Fútbol 2026 para el equipo interno de LKS Next. Funciona íntegramente en el navegador, sin servidor ni proceso de build: basta con abrir `index.html`.

---

## Estructura de archivos

| Archivo | Propósito |
|---|---|
| `index.html` | Punto de entrada. Incluye todos los scripts y estilos. Contiene también los modales de nombre y carga. |
| `app.js` | Lógica principal: grupos, eliminatorias, premios, ranking, integración con Google Forms y Google Sheets. **Es el archivo más grande y crítico.** |
| `results.js` | Resultados oficiales del torneo (se rellena a medida que avanza el Mundial). Es el único archivo que se actualiza regularmente durante el torneo. |
| `results-empty.js` | Plantilla vacía de `results.js`. Sirve como referencia de la estructura esperada o para reiniciar el estado. **No se incluye en `index.html` ni se debe modificar salvo emergencia.** |
| `third_place_table.js` | Tabla autogenerada que mapea combinaciones de mejores terceros a sus posiciones en el cuadro eliminatorio. No se edita a mano. |
| `style.css` | Todos los estilos de la aplicación. |
| `favicon.ico` | Favicon. |
| `node_modules/` | Dependencias de Node.js usadas sólo para tests o herramientas locales. No son parte del bundle de producción. |

---

## Stack técnico

- HTML + CSS + JavaScript vanilla (sin frameworks, sin TypeScript, sin bundler)
- **No hay proceso de build.** Para probar cambios, basta con abrir `index.html` en un navegador.
- No hay `package.json` en la raíz; `node_modules/` es residual de herramientas auxiliares.
- Dependencia externa de estilos: `flag-icons` vía CDN (`cdn.jsdelivr.net`).
- Datos del torneo: `openfootball/worldcup.json` en GitHub (`DATA_SRC` en `app.js`).

---

## Regla crítica: cache busting

**Cada vez que modifiques `app.js`, `results.js`, `style.css` o `third_place_table.js`, debes actualizar el parámetro `?v=...` del `<script>` o `<link>` correspondiente en `index.html`.**

Líneas relevantes en `index.html`:

```html
<link rel="stylesheet" href="style.css?v=NUEVO_VALOR">
...
<script src="third_place_table.js?v=NUEVO_VALOR"></script>
<script src="results.js?v=NUEVO_VALOR"></script>
<script src="app.js?v=NUEVO_VALOR"></script>
```

El valor de `?v=` es libre (una palabra descriptiva del cambio es la convención del proyecto). Si no se actualiza, los usuarios con la versión cacheada en el navegador no verán los cambios.

---

## Constantes clave en `app.js`

| Constante | Descripción |
|---|---|
| `DATA_SRC` | URL base del JSON de openfootball con el calendario oficial del Mundial 2026. |
| `LEADERBOARD_CSV_URL` | URL del CSV publicado desde Google Sheets con el ranking. |
| `FORM_ID` | ID del Google Form donde se recogen las apuestas. |
| `ENTRY_ID` | ID del campo de respuesta del formulario (`entry.XXXXXXX`). |
| `puntuaciones` | Objeto con todos los valores de puntos por categoría (grupos, eliminatorias, premios). |
| `AWARDS_CONFIG` | Array declarativo de los 5 premios individuales (goleador, asistente, portero, etc.). |
| `QUINIELA_1X2_MATCHES` | Los 3 partidos fijos de la quiniela 1X2 (uno siempre es de España). |
| `TEAM_NAME_ES` | Diccionario de traducción de nombres de selección del inglés al español. |

---

## Cómo actualizar resultados durante el torneo

Edita **únicamente `results.js`** con los datos reales. La estructura es:

```js
const RESULTS = {
  groups: {
    A: ["España", "Marruecos", "Escocia", "Uruguay"], // orden final 1º→4º
    // ...
  },
  thirdPlace: ["España", "Portugal", ...], // los 8 mejores terceros clasificados
  quiniela1x2: {
    "Morocco__Scotland": "1", // "1", "X" o "2"
    "Spain__Uruguay":    "2",
    "Mexico__South Korea": "X"
  },
  knockout: {
    round32: ["España", "Marruecos", ...],
    // ...
    champion: "España",
  },
  awards: {
    topScorer: "Kylian Mbappé",
    // ...
  }
};
```

Consulta `results-empty.js` para ver la estructura completa con comentarios.

Tras editar `results.js`, **actualiza `?v=...` en `index.html`**.

---

## Cómo adaptar el proyecto para otro grupo o torneo

1. Haz fork del repositorio.
2. En `app.js`, sustituye:
   - `LEADERBOARD_CSV_URL` → URL de tu hoja de cálculo publicada como CSV.
   - `FORM_ID` → ID de tu Google Form.
   - `ENTRY_ID` → ID del campo de entrada de tu formulario.
3. Ajusta `QUINIELA_1X2_MATCHES` con los partidos que quieras fijar.
4. Actualiza `TEAM_NAME_ES` si hay equipos que no estén traducidos.
5. Actualiza el `?v=...` de `app.js` en `index.html`.

---

## Notas adicionales

- Los nombres de equipos en toda la app están en **español** (ver `TEAM_NAME_ES` en `app.js`). Al introducir resultados en `results.js` usa los nombres en español.
- Las claves de `quiniela1x2` en `results.js` se forman con los nombres de los equipos **en inglés** ordenados alfabéticamente y unidos por `__` (ej. `"Morocco__Scotland"`). Ver `QUINIELA_1X2_MATCHES` en `app.js` para obtener las claves exactas.
- `third_place_table.js` no se edita manualmente; es una tabla de lookup autogenerada.
- No hay tests automatizados ni scripts de CI configurados en el repositorio.
