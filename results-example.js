/* ============================================================
   EJEMPLO de results.js — sólo para referencia, NO se carga en la app.
   Muestra el formato exacto que hay que usar para rellenar los
   resultados reales partido a partido durante el torneo.
   ============================================================

   FLUJO RECOMENDADO:
   1. Termina la fase de grupos → rellena `groups` y `thirdPlace`
   2. Terminan los octavos     → rellena `knockout.round32` y `knockout.matches.round32`
   3. Terminan los cuartos     → `knockout.round16` + `knockout.matches.round16`
   4. Terminan las semis       → `knockout.quarterfinals` + `knockout.semifinalists`...
   5. Termina el torneo        → `champion`, `runnerUp`, `thirdPlaceWinner` + premios

   IMPORTANTE:
   - Los nombres de equipos deben ser los nombres en ESPAÑOL que usa la app
     (los traducidos en TEAM_NAME_ES dentro de app.js).
   - Las claves de `quiniela1x2` son los dos equipos ordenados alfabéticamente
     separados por `__`. Ver ejemplos abajo.
   - Deja "" o [] para lo que aún no ha ocurrido — no penaliza a nadie.
   ============================================================ */

const RESULTS = {

  // ----------------------------------------------------------
  // FASE DE GRUPOS
  // Orden final 1º → 4º dentro de cada grupo.
  // Los nombres deben coincidir exactamente con los de la app.
  // ----------------------------------------------------------
  groups: {
    A: ['México', 'Ecuador', 'Venezuela', 'Jamaica'],
    B: ['USA', 'Canadá', 'Panamá', 'Cuba'],
    C: ['España', 'Marruecos', 'Escocia', 'Sudán del Sur'],   // ficticio
    D: ['Brasil', 'Colombia', 'Paraguay', 'Bolivia'],
    E: ['Argentina', 'Chile', 'Perú', 'Haití'],
    F: ['Francia', 'Alemania', 'Portugal', 'Turquía'],         // ficticio
    G: ['Inglaterra', 'Países Bajos', 'Polonia', 'Irán'],
    H: ['Uruguay', 'España', 'Senegal', 'Japón'],              // España garantizada aquí
    I: ['Bélgica', 'Croacia', 'Dinamarca', 'Suiza'],
    J: ['Australia', 'Arabia Saudita', 'Corea del Sur', 'Iraq'],
    K: ['Sudáfrica', 'Egipto', 'Ghana', 'Nigeria'],
    L: ['Camerún', 'Mali', 'Costa de Marfil', 'Argelia']
  },

  // ----------------------------------------------------------
  // MEJORES TERCEROS
  // Los 8 terceros que clasifican a dieciseisavos, ordenados
  // de mejor (1º) a peor (8º) según criterios FIFA.
  // ----------------------------------------------------------
  thirdPlace: [
    'España',        // 1er mejor tercero
    'Marruecos',     // 2º
    'Colombia',      // 3º
    'Senegal',       // 4º
    'Japón',         // 5º
    'Bélgica',       // 6º
    'Australia',     // 7º
    'Nigeria'        // 8º
  ],

  // ----------------------------------------------------------
  // QUINIELA 1X2
  // Clave = [equipo1, equipo2].sort().join('__')  ← orden alfabético
  // Valor = "1" (gana el primero), "X" (empate), "2" (gana el segundo)
  //
  // Los 3 partidos fijos de esta quiniela son:
  //   México vs Corea del Sur  → clave: 'Corea del Sur__México'
  //   Escocia vs Marruecos     → clave: 'Escocia__Marruecos'
  //   Uruguay vs España        → clave: 'España__Uruguay'
  // ----------------------------------------------------------
  quiniela1x2: {
    'Corea del Sur__México': '1',   // gana México (es el primero en la clave? no, el primero es Corea)
                                     // "1" = gana Corea del Sur, "2" = gana México, "X" = empate
    'Escocia__Marruecos':   '2',   // gana Marruecos
    'España__Uruguay':      '1'    // gana España
  },

  // ----------------------------------------------------------
  // ELIMINATORIAS
  // Cada array contiene los equipos que CLASIFICARON a esa fase.
  // ----------------------------------------------------------
  knockout: {

    // Los 32 equipos que llegan a la ronda de 64 (no hay puntos aquí,
    // pero la app lo usa para calcular etapas siguientes).
    round32: [
      'México', 'Ecuador',     // Grupo A: 1º y 2º
      'USA', 'Canadá',         // Grupo B
      'España', 'Marruecos',   // Grupo C — ojo: aquí va el 1º y 2º del grupo C real
      'Brasil', 'Colombia',
      'Argentina', 'Chile',
      'Francia', 'Alemania',
      'Inglaterra', 'Países Bajos',
      'Uruguay', 'Senegal',    // Grupo H: Uruguay 1º, España como mejor tercero
      'Bélgica', 'Croacia',
      'Australia', 'Arabia Saudita',
      'Sudáfrica', 'Egipto',
      'Camerún', 'Mali',
      // + los 8 mejores terceros:
      'España', 'Marruecos', 'Colombia', 'Senegal',
      'Japón', 'Bélgica', 'Australia', 'Nigeria'
      // (en la práctica son 32 equipos únicos; ajusta según el cuadro real de la FIFA)
    ],

    // Los 16 equipos que pasan a octavos de final.
    round16: [
      'México', 'Brasil', 'Francia', 'Argentina',
      'España', 'Inglaterra', 'Uruguay', 'Alemania',
      'Colombia', 'USA', 'Marruecos', 'Senegal',
      'Bélgica', 'Croacia', 'Países Bajos', 'Japón'
    ],

    // Los 8 equipos que pasan a cuartos.
    quarterfinals: [
      'Brasil', 'Francia', 'España', 'Argentina',
      'México', 'Alemania', 'Uruguay', 'Marruecos'
    ],

    // Los 4 equipos que pasan a semifinales.
    semifinals: [
      'Brasil', 'Francia', 'España', 'Argentina'
    ],

    // Campeón y subcampeón.
    champion:         'España',
    runnerUp:         'Francia',

    // Ganador del partido por el 3er puesto.
    thirdPlaceWinner: 'Brasil',

    // Campos auxiliares (la app los usa internamente).
    finalists: ['España', 'Francia'],
    final:     'España',
    thirdPlace: 'Brasil',

    // ----------------------------------------------------------
    // RESULTADOS PARTIDO A PARTIDO (opcional pero recomendado)
    // Cada elemento: { team1, team2, score1, score2 }
    // score = goles en 90' (sin contar prórroga ni penales).
    // Si hay prórroga/penales, añade: extra: true, penalties: { score1, score2 }
    // ----------------------------------------------------------
    matches: {
      round32: [
        { team1: 'México',    team2: 'Brasil',    score1: 1, score2: 2 },
        { team1: 'Francia',   team2: 'Marruecos', score1: 2, score2: 1 }
        // ... (32 partidos en total)
      ],
      round16: [
        { team1: 'Brasil',  team2: 'Colombia', score1: 3, score2: 0 },
        { team1: 'Francia', team2: 'Alemania', score1: 2, score2: 1 }
        // ...
      ],
      quarterfinals: [
        { team1: 'Brasil',  team2: 'Argentina', score1: 1, score2: 1, extra: true, penalties: { score1: 4, score2: 3 } },
        { team1: 'Francia', team2: 'España',    score1: 0, score2: 1 }
        // ...
      ],
      semifinals: [
        { team1: 'España', team2: 'Brasil',  score1: 2, score2: 1 },
        { team1: 'Francia', team2: 'México', score1: 3, score2: 0 }
      ],
      thirdPlace: [
        { team1: 'Brasil', team2: 'México', score1: 2, score2: 0 }
      ],
      final: [
        { team1: 'España', team2: 'Francia', score1: 1, score2: 0 }
      ]
    }
  },

  // Campos de nivel superior que la app también lee directamente:
  semifinalists:    ['Brasil', 'Francia', 'España', 'México'],
  finalists:        ['España', 'Francia'],
  champion:         'España',
  runnerUp:         'Francia',
  thirdPlaceWinner: 'Brasil',

  // ----------------------------------------------------------
  // PREMIOS INDIVIDUALES Y DE EQUIPO
  //
  // topScorer, topAssister, goldenGlove → nombre exacto del jugador
  //   tal como aparece en AWARD_PLAYERS dentro de app.js.
  // topScoringTeam, mostConcededTeam    → nombre del país en español.
  // ----------------------------------------------------------
  awards: {
    topScorer:        'Kylian Mbappé',       // Francia
    topAssister:      'Pedri',               // España
    goldenGlove:      'Unai Simón',          // España
    topScoringTeam:   'España',
    mostConcededTeam: 'Jamaica'
  }

};
