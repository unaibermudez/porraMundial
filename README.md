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

1. Haz un fork del repositorio.
2. Crea tu propia hoja de cálculo y publícala como CSV.
3. Crea tu propio Google Form para recoger las apuestas.
4. Sustituye en `app.js`:

- `LEADERBOARD_CSV_URL`
- `FORM_ID`
- `ENTRY_ID`

por los valores correspondientes a tu formulario y hoja de cálculo.

---

Hecho con cariño (y demasiado café) para la kuadrilla Festako Erregeak. Que gane el mejor… o el que más suerte tenga.
