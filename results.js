/* ============================================================
   Resultados oficiales en directo del Mundial 2026.
   ------------------------------------------------------------
   Este archivo se va rellenando a medida que avanza el torneo.
   Mientras un campo esté vacío ("" o []) la app lo trata como
   "pendiente" y no resta puntos a nadie.

   Edita este archivo (o sustitúyelo por la plantilla
   results-empty.js) cuando quieras "publicar" nuevos resultados.

   IMPORTANTE: ya no se predicen los resultados exactos de los
   partidos de grupo, sólo el ORDEN final de cada grupo. Por eso
   este archivo NO contiene "groupMatches".
   ============================================================ */

const RESULTS = {
  // Orden final de cada grupo (1º, 2º, 3º, 4º).
  // Ejemplo ilustrativo: cuando empiece el torneo se reseteará.
  groups: {
    A: ["Mexico", "South Africa", "Czech Republic", "South Korea"],
    B: ["Switzerland", "Canada", "Qatar", "Bosnia & Herzegovina"],
    C: ["Brazil", "Scotland", "Morocco", "Haiti"],
    D: ["Turkey", "Paraguay", "USA", "Australia"],
    E: ["Ivory Coast", "Curaçao", "Ecuador", "Germany"],
    F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
    G: ["Egypt", "Belgium", "New Zealand", "Iran"],
    H: ["Uruguay", "Cape Verde", "Spain", "Saudi Arabia"],
    I: ["Norway", "France", "Iraq", "Senegal"],
    J: ["Jordan", "Argentina", "Algeria", "Austria"],
    K: ["DR Congo", "Portugal", "Colombia", "Uzbekistan"],
    L: ["Ghana", "Panama", "Croatia", "England"]
  },

  // Los 8 mejores terceros que clasifican a dieciseisavos,
  // en orden (1º mejor tercero → 8º mejor tercero).
  thirdPlace: [
    "Sweden",
    "Colombia",
    "Iraq",
    "Morocco",
    "Algeria",
    "Spain",
    "Ecuador",
    "New Zealand"
  ],

  knockout: {
    round32: [
      "South Africa", "Ivory Coast", "Netherlands", "Brazil",
      "Norway", "France", "Mexico", "Algeria",
      "Turkey", "Morocco", "Portugal", "Uruguay",
      "Switzerland", "Jordan", "Ecuador", "Belgium"
    ],
    round16: [
      "Netherlands", "Norway", "France", "Algeria",
      "Uruguay", "Morocco", "Belgium", "Ecuador"
    ],
    quarterfinals: ["Norway", "Morocco", "Algeria", "Ecuador"],
    semifinals: ["Norway", "Algeria"],

    champion: "Norway",
    runnerUp: "Algeria",
    finalists: ["Norway", "Algeria"],

    thirdPlaceWinner: "Morocco",
    final: "Norway",
    thirdPlace: "Morocco",

    matches: {
      round32: [
        { match: 73, team1: "South Africa",   team2: "Canada",      winner: "South Africa" },
        { match: 74, team1: "Ivory Coast",    team2: "Spain",       winner: "Ivory Coast" },
        { match: 75, team1: "Netherlands",    team2: "Scotland",    winner: "Netherlands" },
        { match: 76, team1: "Brazil",         team2: "Japan",       winner: "Brazil" },
        { match: 77, team1: "Norway",         team2: "New Zealand", winner: "Norway" },
        { match: 78, team1: "Curaçao",        team2: "France",      winner: "France" },
        { match: 79, team1: "Mexico",         team2: "Sweden",      winner: "Mexico" },
        { match: 80, team1: "Ghana",          team2: "Algeria",     winner: "Algeria" },
        { match: 81, team1: "Turkey",         team2: "Colombia",    winner: "Turkey" },
        { match: 82, team1: "Egypt",          team2: "Morocco",     winner: "Morocco" },
        { match: 83, team1: "Portugal",       team2: "Panama",      winner: "Portugal" },
        { match: 84, team1: "Uruguay",        team2: "Argentina",   winner: "Uruguay" },
        { match: 85, team1: "Switzerland",    team2: "Iraq",        winner: "Switzerland" },
        { match: 86, team1: "Jordan",         team2: "Cape Verde",  winner: "Jordan" },
        { match: 87, team1: "DR Congo",       team2: "Ecuador",     winner: "Ecuador" },
        { match: 88, team1: "Paraguay",       team2: "Belgium",     winner: "Belgium" }
      ],
      round16: [
        { match: 89, team1: "South Africa", team2: "Netherlands", winner: "Netherlands" },
        { match: 90, team1: "Ivory Coast",  team2: "Norway",      winner: "Norway" },
        { match: 91, team1: "Brazil",       team2: "France",      winner: "France" },
        { match: 92, team1: "Mexico",       team2: "Algeria",     winner: "Algeria" },
        { match: 93, team1: "Portugal",     team2: "Uruguay",     winner: "Uruguay" },
        { match: 94, team1: "Turkey",       team2: "Morocco",     winner: "Morocco" },
        { match: 95, team1: "Jordan",       team2: "Belgium",     winner: "Belgium" },
        { match: 96, team1: "Switzerland",  team2: "Ecuador",     winner: "Ecuador" }
      ],
      quarterfinals: [
        { match: 97,  team1: "Netherlands", team2: "Norway",  winner: "Norway" },
        { match: 98,  team1: "Uruguay",     team2: "Morocco", winner: "Morocco" },
        { match: 99,  team1: "France",      team2: "Algeria", winner: "Algeria" },
        { match: 100, team1: "Belgium",     team2: "Ecuador", winner: "Ecuador" }
      ],
      semifinals: [
        { match: 101, team1: "Norway",  team2: "Morocco", winner: "Norway" },
        { match: 102, team1: "Algeria", team2: "Ecuador", winner: "Algeria" }
      ],
      thirdPlace: [
        { match: 103, team1: "Morocco", team2: "Ecuador", winner: "Morocco" }
      ],
      final: [
        { match: 104, team1: "Norway", team2: "Algeria", winner: "Norway" }
      ]
    }
  },

  semifinalists: ["Norway", "Morocco", "Algeria", "Ecuador"],
  finalists: ["Norway", "Algeria"],

  champion: "Norway",
  runnerUp: "Algeria",
  thirdPlaceWinner: "Morocco",

  // 5 categorías nuevas. Mientras estén vacías no se puntúan.
  awards: {
    topScorer: "",        // 🥇 Máximo Goleador (jugador)
    topAssister: "",      // 🎯 Máximo Asistente (jugador)
    goldenGlove: "",      // 🧤 Guante de Oro / Portero menos goleado (jugador)
    topScoringTeam: "",   // ⚽ Equipo Más Goleador
    surpriseTeam: ""      // 😱 Sorpresa del Mundial (equipo)
  }
};
