/* ============================================================
   Resultados oficiales en directo del Mundial 2026.
   ------------------------------------------------------------
   Este archivo arranca VACÍO: mientras no haya nada relleno,
   el ranking muestra a todo el mundo con 0 puntos.
   A medida que vayas escribiendo resultados aquí (orden final
   de un grupo, ganadores de eliminatorias, premios, etc.), la
   app recalcula automáticamente las puntuaciones de cada
   participante. Lo que dejes vacío ("" o []) sigue contando
   como "pendiente" y no resta puntos a nadie.

   Si quieres volver a partir de cero, copia el contenido de
   results-empty.js sobre este archivo.
   ------------------------------------------------------------
   Cambios importantes:
   - YA NO se predicen resultados exactos de partidos: solo el
     ORDEN en que terminan los equipos en cada grupo.
     Por eso este archivo no tiene "groupMatches".
   - "thirdPlace" es la lista de los 8 mejores terceros que
     pasan a dieciseisavos, en el orden 1º-8º.
   - "awards" tiene 5 categorías nuevas y divertidas.
   ============================================================ */

const RESULTS = {
  // Orden final de cada grupo: 1º, 2º, 3º, 4º.
  groups: {
    A: ["México", "Sudáfrica", "Corea del Sur", "República Checa"],
    B: ["Suiza", "Canadá", "Bosnia y Herzegovina", "Catar"],
    C: ["Brasil", "Marruecos", "Escocia", "Haití"],
    D: ["Estados Unidos", "Australia", "Paraguay", "Turquía"],
    E: ["Alemania", "Costa de Marfil", "Ecuador", "Curazao"],
    F: ["Países Bajos", "Japón", "Suecia", "Túnez"],
    G: ["Bélgica", "Egipto", "Irán", "Nueva Zelanda"],
    H: ["España", "Cabo Verde", "Uruguay", "Arabia Saudí"],
    I: ["Francia", "Noruega", "Senegal", "Irak"],
    J: ["Argentina", "Austria", "Argelia", "Jordania"],
    K: ["Colombia", "Portugal", "RD del Congo", "Uzbekistán"],
    L: ["Inglaterra", "Croacia", "Ghana", "Panamá"],
  },

  // Los 8 mejores terceros que clasifican a dieciseisavos,
  // en orden (1º mejor tercero → 8º mejor tercero).
  thirdPlace: [
    "RD del Congo",
    "Suecia",
    "Ghana",
    "Ecuador",
    "Bosnia y Herzegovina",
    "Argelia",
    "Paraguay",
    "Senegal",
  ],

  // Quiniela 1X2 — resultados reales de los 3 partidos fijos.
  // Valores admitidos: "1" (gana team1), "X" (empate), "2" (gana team2).
  // Las claves coinciden con `[team1, team2].sort().join('__')` definido en
  // QUINIELA_1X2_MATCHES dentro de app.js. Dejar "" mientras el partido no
  // se haya jugado.
  quiniela1x2: {
    "Corea del Sur__México": "1",
    Escocia__Marruecos: "2",
    España__Uruguay: "2",
  },

  knockout: {
    round32: [
      "México",
      "Sudáfrica",
      "Suiza",
      "Canadá",
      "Brasil",
      "Marruecos",
      "Estados Unidos",
      "Australia",
      "Alemania",
      "Costa de Marfil",
      "Países Bajos",
      "Japón",
      "Bélgica",
      "Egipto",
      "España",
      "Cabo Verde",
      "Francia",
      "Noruega",
      "Argentina",
      "Austria",
      "Colombia",
      "Portugal",
      "Inglaterra",
      "Croacia",
      "RD del Congo",
      "Suecia",
      "Ghana",
      "Ecuador",
      "Bosnia y Herzegovina",
      "Argelia",
      "Paraguay",
      "Senegal",
    ],
    round16: ["Canadá"],
    quarterfinals: [],
    semifinals: [],

    champion: "",
    runnerUp: "",
    finalists: [],

    thirdPlaceWinner: "",
    final: "",
    thirdPlace: "",

    matches: {
      round32: [{ match: 73, winner: "Canadá" }],
      round16: [],
      quarterfinals: [],
      semifinals: [],
      thirdPlace: [],
      final: [],
    },
  },

  semifinalists: [],
  finalists: [],

  champion: "",
  runnerUp: "",
  thirdPlaceWinner: "",

  // 5 categorías divertidas — todas son una sola elección por categoría.
  // "topScorer", "topAssister" y "goldenGlove" esperan el NOMBRE de un jugador
  //   (de los listados en AWARD_PLAYERS dentro de app.js).
  // "topScoringTeam" y "mostConcededTeam" esperan el NOMBRE de una selección
  //   (tal y como aparece en los grupos).
  awards: {
    topScorer: "",
    topAssister: "",
    goldenGlove: "",
    topScoringTeam: "",
    mostConcededTeam: "",
  },
};
