# ⚽ Quiniela Festako Erregeak — Mundial 2026

La quiniela oficial de la kuadrilla Festako Erregeak para el Mundial 2026.

---

## ¿Qué es esto?

Una aplicación web para hacer apuestas entre compañeros sobre el Mundial 2026. Sin dinero de por medio (ojalá), solo gloria eterna y el derecho a alardear en el chat de empresa.

## ¿Qué puedes hacer?

### 🌍 Fase de grupos

Ordena los equipos de cada grupo según cómo crees que terminarán.

Se puntúa cada posición acertada:

- 1º clasificado → 5 puntos
- 2º clasificado → 5 puntos
- 3º clasificado → 5 puntos
- 4º clasificado → 5 puntos

### 🥉 Mejores terceros

Selecciona cuáles serán los mejores terceros clasificados que accederán a las eliminatorias.

- Cada mejor tercero acertado → 1 punto

### 🎯 Quiniela 1X2

Predice el resultado de tres partidos seleccionados de la fase de grupos.

- Cada resultado acertado → 1 punto

Formato:

- 1 = gana el equipo local
- X = empate
- 2 = gana el equipo visitante

### 🥊 Eliminatorias

Completa todo el cuadro eliminatorio hasta el campeón.

#### Puntuación

| Acierto | Puntos |
|----------|----------|
| Clasificado para Octavos | 5 |
| Clasificado para Cuartos | 5 |
| Clasificado para Semifinales | 10 |
| Finalista | 20 |
| Campeón del Mundo | 30 |
| Ganador del partido por el 3º puesto | 15 |

### 🏆 Premios individuales

| Premio | Puntos |
|----------|----------|
| 🥇 Máximo Goleador | 5 |
| 🎯 Máximo Asistente | 3 |
| 🧤 Guante de Oro | 3 |
| ⚽ Equipo Más Goleador | 3 |
| 🥅 Equipo Más Goleado | 3 |

### 📊 Ranking

Una vez empiece el Mundial, las puntuaciones se calcularán automáticamente y podrás consultar la clasificación general para comprobar quién lidera la competición.

---

## Resumen de puntuaciones

| Categoría | Puntos |
|------------|------------|
| Posición correcta en grupo | 5 |
| Mejor tercero clasificado | 1 |
| Quiniela 1X2 | 1 |
| Clasificado para Octavos | 5 |
| Clasificado para Cuartos | 5 |
| Clasificado para Semifinales | 10 |
| Finalista | 20 |
| Campeón | 30 |
| Ganador del 3º puesto | 15 |
| Máximo Goleador | 5 |
| Máximo Asistente | 3 |
| Guante de Oro | 3 |
| Equipo Más Goleador | 3 |
| Equipo Más Goleado | 3 |

---

## Puntuación máxima teórica

### Fase de grupos

12 grupos × 4 posiciones × 5 puntos = **240 puntos**

### Mejores terceros

8 clasificados × 1 punto = **8 puntos**

### Quiniela 1X2

3 partidos × 1 punto = **3 puntos**

### Eliminatorias

- Octavos: 16 equipos × 5 = 80
- Cuartos: 8 equipos × 5 = 40
- Semifinales: 4 equipos × 10 = 40
- Finalistas: 2 equipos × 20 = 40
- Campeón: 30
- Tercer puesto: 15

Total eliminatorias = **245 puntos**

### Premios

5 + 3 + 3 + 3 + 3 = **17 puntos**

### TOTAL MÁXIMO POSIBLE

**513 puntos**

---

## Stack técnico

- HTML
- CSS
- JavaScript
- Google Forms
- Google Sheets (para guardar apuestas y calcular el ranking)
- Demasiado café

---

## ¿Cómo adaptarlo para otro grupo?

Esta guía asume que tienes una cuenta de Google y acceso a GitHub. No necesitas saber programar — solo seguir los pasos.

---

### Paso 1 — Copia el proyecto a tu cuenta de GitHub

1. Ve a [github.com](https://github.com) y crea una cuenta si no tienes una (es gratis).
2. Entra al repositorio original y pulsa el botón **Fork** (arriba a la derecha).
3. Dale un nombre a tu copia (por ejemplo, `porraMiKuadrilla`) y pulsa **Create fork**.

Ya tienes tu propia copia del proyecto que puedes modificar sin tocar el original.

---

### Paso 2 — Crea el formulario de Google para recoger las apuestas

Las apuestas se envían a un **Google Form** que tú controlas.

1. Ve a [forms.google.com](https://forms.google.com) e inicia sesión con tu cuenta de Google.
2. Pulsa **+** para crear un formulario nuevo.
3. Ponle un título (por ejemplo, "Porra Mundial 2026 - Mi Grupo").
4. Elimina cualquier pregunta que venga por defecto.
5. Añade **una sola pregunta** de tipo **Respuesta larga** (el icono de líneas). El título de la pregunta puede ser cualquier cosa, como "Datos".
6. Guarda el formulario.

Ahora necesitas dos datos del formulario: el **ID del formulario** y el **ID del campo**.

**Cómo obtener el ID del formulario:**
- Mira la URL del formulario mientras lo editas. Tendrá este aspecto:
  `https://docs.google.com/forms/d/`**`1FAIpQLSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`**`/edit`
- La parte en negrita es tu `FORM_ID`. Cópiala.

**Cómo obtener el ID del campo (ENTRY_ID):**
1. Con el formulario abierto en modo edición, haz clic en los tres puntos (⋮) arriba a la derecha y selecciona **Obtener enlace previamente rellenado**.
2. Escribe cualquier texto en el campo de respuesta larga y pulsa **Obtener enlace**.
3. Copia el enlace que aparece. Tendrá este aspecto:
   `https://docs.google.com/forms/d/e/.../viewform?usp=pp_url&entry.`**`1234567890`**`=texto`
4. El número después de `entry.` es tu `ENTRY_ID`. Anota `entry.1234567890` (con el `entry.` delante).

---

### Paso 3 — Crea la hoja de cálculo para el ranking

Las respuestas del formulario se guardan en Google Sheets y la app las lee para mostrar el ranking.

1. Ve a [sheets.google.com](https://sheets.google.com) y crea una hoja nueva.
2. En el menú superior de tu formulario (del Paso 2), pulsa el icono de hoja de cálculo 🟢 o ve a **Respuestas → Ver en Sheets**. Esto vincula el formulario con la hoja automáticamente.
3. Una vez vinculados, vuelve a la hoja de cálculo.
4. En el menú superior, ve a **Archivo → Compartir → Publicar en la web**.
5. En el desplegable, selecciona la hoja donde se guardan las respuestas (normalmente "Respuestas de formulario 1").
6. Cambia el formato a **Valores separados por comas (.csv)**.
7. Pulsa **Publicar** y confirma.
8. Copia la URL que aparece — esa es tu `LEADERBOARD_CSV_URL`.

---

### Paso 4 — Edita el código con tus datos

Ahora tienes que reemplazar los tres valores en el archivo `app.js` de tu fork.

1. Ve a tu repositorio en GitHub.
2. Haz clic en el archivo `app.js`.
3. Pulsa el icono del lápiz ✏️ (arriba a la derecha del archivo) para editarlo.
4. Pulsa **Ctrl+F** (o **Cmd+F** en Mac) para buscar dentro del archivo.
5. Busca `LEADERBOARD_CSV_URL` y reemplaza la URL que hay entre comillas por la tuya del Paso 3.
6. Busca `FORM_ID` y reemplaza el valor entre comillas por el tuyo del Paso 2.
7. Busca `ENTRY_ID` y reemplaza el valor entre comillas por el tuyo (con el `entry.` delante).
8. Pulsa **Commit changes** (abajo o arriba a la derecha) para guardar.

---

### Paso 5 — Publica la app en GitHub Pages (gratis)

GitHub Pages sirve tu app como una página web sin coste alguno.

1. En tu repositorio de GitHub, ve a **Settings** (la rueda dentada ⚙️).
2. En el menú lateral, busca **Pages**.
3. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
4. Pulsa **Save**.
5. Espera un minuto y recarga la página. Aparecerá una URL del tipo `https://tu-usuario.github.io/porraMiKuadrilla/` — ¡esa es tu app!

Comparte esa URL con tu grupo y que empiece la quiniela.

---

### Opcional — Personaliza el nombre del grupo

Si quieres cambiar "Festako Erregeak" por el nombre de tu grupo:

1. En `app.js`, busca `Festako Erregeak` y reemplázalo por el nombre de tu grupo.
2. En `index.html`, busca el título en la etiqueta `<title>` y en el `<h1>` principal y cámbialo también.

---

### Resumen de los tres valores que necesitas cambiar en `app.js`

| Variable | Dónde encontrarla |
|---|---|
| `LEADERBOARD_CSV_URL` | URL de publicación CSV de tu Google Sheet (Paso 3) |
| `FORM_ID` | ID en la URL de tu Google Form (Paso 2) |
| `ENTRY_ID` | ID del campo en el enlace previamente rellenado, con `entry.` delante (Paso 2) |

---

Hecho con cariño (y demasiado café) para la kuadrilla Festako Erregeak. Que gane el mejor… o el que más suerte tenga.
