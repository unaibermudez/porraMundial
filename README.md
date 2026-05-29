# ⚽ Quiniela LKS Next — Mundial 2026

La quiniela oficial de pasillo, café y Teams paralelo para la peña de **LKS Next**.

---

## ¿Qué es esto?

Una aplicación web para hacer apuestas entre compañeros sobre el Mundial 2026. Sin dinero de por medio (ojalá), solo gloria eterna y el derecho a alardear en el chat de empresa.

## ¿Qué puedes hacer?

- **Fase de grupos**: ordena las selecciones de cada grupo según cómo crees que van a quedar.
- **Mejores terceros**: elige cuáles de los 12 terceros clasificados pasan a dieciseisavos.
- **Eliminatorias**: completa el cuadro hasta el campeón del mundo.
- **Premios individuales**:
  - 🥇 Máximo Goleador
  - 🎯 Máximo Asistente
  - 🧤 Guante de Oro
  - ⚽ Equipo Más Goleador
  - 🥅 Equipo Más Goleado
- **Ranking**: comprueba en tiempo real quién tiene más ojo con el fútbol (y quién debería dedicarse a otra cosa).

## Sistema de puntuación

| Acierto | Puntos |
|---|---|
| 1º de grupo | 4 |
| 2º de grupo | 3 |
| 3º de grupo | 2 |
| Mejor tercero clasificado | 1 |
| Pasa a 1/16 | 2 |
| Pasa a 1/8 | 3 |
| Pasa a cuartos | 5 |
| Pasa a semis | 10 |
| Finalista | 20 |
| **Campeón** | **30** |
| 3er y 4º puesto | 15 |
| Máximo Goleador | 10 |
| Máximo Asistente | 5 |
| Guante de Oro | 5 |
| Equipo Más Goleador | 5 |
| Equipo Más Goleado | 8 |

## Stack técnico

- HTML
- CSS
- JavaScript
- Google Sheets (para guardar apuestas y calcular el ranking)
- Demasiado café

## ¿Cómo adaptarlo para otro grupo?

Si quieres montar tu propia quiniela:

1. Haz un fork del repositorio.
2. Crea tu propio Google Sheet con la misma estructura y publícalo como CSV (`Archivo → Compartir → Publicar en la web → CSV`).
3. Crea tu propio Google Form para recibir las apuestas.
4. Sustituye las 3 variables del principio de `app.js`:
   - `LEADERBOARD_CSV_URL` → URL del CSV publicado de tu hoja de cálculo.
   - `FORM_ID` → ID de tu Google Form.
   - `ENTRY_ID` → ID del campo de respuesta larga en tu formulario.

---

*Hecho con cariño (y demasiado café) para LKS Next. Que gane el mejor… o el que más suerte tenga.*
