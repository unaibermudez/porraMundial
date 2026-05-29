/* ============================================================
   2026 FIFA World Cup Prediction Game - app.js
   Data fetched from openfootball/worldcup.json
   ============================================================ */

const DATA_SRC = 'https://raw.githubusercontent.com/openfootball/worldcup.json/refs/heads/master/2026';
const LEADERBOARD_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDwcurPFZ1PgxTQ_o_D4D4Xjboy1lUrU711uWdLIKXVnWofbf_CwGEeaTL0VaLAX7SOHlRYBCuybu_/pub?gid=1132102352&single=true&output=csv'
const FORM_ID = '1FAIpQLSd9OPSO4JwC6aDS0dtN9FkpmIiCCijgQztklxLC410HTgvjUg';
const ENTRY_ID = 'entry.479239932';

const puntuaciones = {
  grupos: {
    posicion: {
      primero: 4,
      segundo: 3,
      tercero: 2
    },
    mejorTercero: 1
  },
  eliminatorias: {
    round32: 2,
    round16: 3,
    quarterfinals: 5,
    semifinals: 10,
    finalist: 20,
    champion: 30,
    thirdPlace: 15
  },
  premios: {
    topScorer: 5,
    topAssister: 3,
    goldenGlove: 3,
    topScoringTeam: 3,
    mostConcededTeam: 3
  }
};

// Configuración declarativa de los 5 premios.
// `kind` indica si el valor seleccionable es un jugador (de AWARD_PLAYERS)
// o un equipo (de cualquier selección participante en el Mundial).
const AWARDS_CONFIG = [
  { key: 'topScorer',      selectId: 'awardTopScorer',      kind: 'player', emoji: '🥇', label: 'Máximo Goleador',          points: puntuaciones.premios.topScorer },
  { key: 'topAssister',    selectId: 'awardTopAssister',    kind: 'player', emoji: '🎯', label: 'Máximo Asistente',         points: puntuaciones.premios.topAssister },
  { key: 'goldenGlove',    selectId: 'awardGoldenGlove',    kind: 'player', emoji: '🧤', label: 'Guante de Oro (portero)',  points: puntuaciones.premios.goldenGlove },
  { key: 'topScoringTeam',    selectId: 'awardTopScoringTeam',    kind: 'team',   emoji: '⚽', label: 'Equipo Más Goleador',      points: puntuaciones.premios.topScoringTeam },
  { key: 'mostConcededTeam',  selectId: 'awardMostConcededTeam',  kind: 'team',   emoji: '🥅', label: 'Equipo Más Goleado',       points: puntuaciones.premios.mostConcededTeam }
];

const AWARD_SELECT_IDS = AWARDS_CONFIG.map(a => a.selectId);

function emptyAwardsState() {
  const empty = {};
  AWARDS_CONFIG.forEach(a => { empty[a.key] = ''; });
  return empty;
}

const FLAG_CODE = {
  'Mexico':'mx','South Africa':'za','South Korea':'kr','Czech Republic':'cz',
  'Canada':'ca','Bosnia & Herzegovina':'ba','Qatar':'qa','Switzerland':'ch',
  'Brazil':'br','Morocco':'ma','Haiti':'ht','Scotland':'gb-sct',
  'USA':'us','Paraguay':'py','Australia':'au','Turkey':'tr',
  'Germany':'de','Cura\u00e7ao':'cw','Ivory Coast':'ci','Ecuador':'ec',
  'Netherlands':'nl','Japan':'jp','Sweden':'se','Tunisia':'tn',
  'Belgium':'be','Egypt':'eg','Iran':'ir','New Zealand':'nz',
  'Spain':'es','Cape Verde':'cv','Saudi Arabia':'sa','Uruguay':'uy',
  'France':'fr','Senegal':'sn','Iraq':'iq','Norway':'no',
  'Argentina':'ar','Algeria':'dz','Austria':'at','Jordan':'jo',
  'Portugal':'pt','DR Congo':'cd','Uzbekistan':'uz','Colombia':'co',
  'England':'gb-eng','Croatia':'hr','Ghana':'gh','Panama':'pa'
};

const AWARD_PLAYERS = [

  // Mexico
  { name: 'Guillermo Ochoa', country: 'Mexico' },
  { name: 'Luis Malagón', country: 'Mexico' },
  { name: 'Raúl Rangel', country: 'Mexico' },
  { name: 'Jorge Sánchez', country: 'Mexico' },
  { name: 'César Montes', country: 'Mexico' },
  { name: 'Johan Vásquez', country: 'Mexico' },
  { name: 'Edson Álvarez', country: 'Mexico' },
  { name: 'Israel Reyes', country: 'Mexico' },
  { name: 'Jesús Gallardo', country: 'Mexico' },
  { name: 'Gerardo Arteaga', country: 'Mexico' },
  { name: 'Néstor Araujo', country: 'Mexico' },
  { name: 'Julián Araujo', country: 'Mexico' },
  { name: 'Kevin Álvarez', country: 'Mexico' },
  { name: 'Luis Romo', country: 'Mexico' },
  { name: 'Erick Sánchez', country: 'Mexico' },
  { name: 'Luis Chávez', country: 'Mexico' },
  { name: 'Orbelín Pineda', country: 'Mexico' },
  { name: 'Marcel Ruiz', country: 'Mexico' },
  { name: 'Carlos Rodríguez', country: 'Mexico' },
  { name: 'Hirving Lozano', country: 'Mexico' },
  { name: 'Alexis Vega', country: 'Mexico' },
  { name: 'Santiago Giménez', country: 'Mexico' },
  { name: 'Henry Martín', country: 'Mexico' },
  { name: 'Raúl Jiménez', country: 'Mexico' },
  { name: 'Julián Quiñones', country: 'Mexico' },
  { name: 'Uriel Antuna', country: 'Mexico' },

  // South Africa
  { name: 'Ronwen Williams', country: 'South Africa' },
  { name: 'Ricardo Goss', country: 'South Africa' },
  { name: 'Sipho Chaine', country: 'South Africa' },
  { name: 'Mothobi Mvala', country: 'South Africa' },
  { name: 'Siyanda Xulu', country: 'South Africa' },
  { name: 'Nyiko Mobbie', country: 'South Africa' },
  { name: 'Khuliso Mudau', country: 'South Africa' },
  { name: 'Aubrey Modiba', country: 'South Africa' },
  { name: 'Innocent Maela', country: 'South Africa' },
  { name: 'Grant Kekana', country: 'South Africa' },
  { name: 'Siyabonga Ngezana', country: 'South Africa' },
  { name: 'Nkosinathi Sibisi', country: 'South Africa' },
  { name: 'Teboho Mokoena', country: 'South Africa' },
  { name: 'Sphephelo Sithole', country: 'South Africa' },
  { name: 'Themba Zwane', country: 'South Africa' },
  { name: 'Bongokuhle Hlongwane', country: 'South Africa' },
  { name: 'Mihlali Mayambela', country: 'South Africa' },
  { name: 'Patrick Maswanganyi', country: 'South Africa' },
  { name: 'Thapelo Maseko', country: 'South Africa' },
  { name: 'Percy Tau', country: 'South Africa' },
  { name: 'Lyle Foster', country: 'South Africa' },
  { name: 'Evidence Makgopa', country: 'South Africa' },
  { name: 'Iqraam Rayners', country: 'South Africa' },
  { name: 'Mduduzi Shabalala', country: 'South Africa' },
  { name: 'Zakhele Lepasa', country: 'South Africa' },
  { name: 'Oswin Appollis', country: 'South Africa' },

  // South Korea
  { name: 'Kim Seung-gyu', country: 'South Korea' },
  { name: 'Jo Hyeon-woo', country: 'South Korea' },
  { name: 'Song Bum-keun', country: 'South Korea' },
  { name: 'Kim Min-jae', country: 'South Korea' },
  { name: 'Kim Young-gwon', country: 'South Korea' },
  { name: 'Kim Ju-sung', country: 'South Korea' },
  { name: 'Jung Seung-hyun', country: 'South Korea' },
  { name: 'Park Jin-seop', country: 'South Korea' },
  { name: 'Kim Jin-su', country: 'South Korea' },
  { name: 'Lee Myung-jae', country: 'South Korea' },
  { name: 'Seol Young-woo', country: 'South Korea' },
  { name: 'Hwang Jae-won', country: 'South Korea' },
  { name: 'Hwang In-beom', country: 'South Korea' },
  { name: 'Lee Jae-sung', country: 'South Korea' },
  { name: 'Park Yong-woo', country: 'South Korea' },
  { name: 'Hong Hyun-seok', country: 'South Korea' },
  { name: 'Baek Seung-ho', country: 'South Korea' },
  { name: 'Lee Kang-in', country: 'South Korea' },
  { name: 'Bae Jun-ho', country: 'South Korea' },
  { name: 'Son Heung-min', country: 'South Korea' },
  { name: 'Hwang Hee-chan', country: 'South Korea' },
  { name: 'Cho Gue-sung', country: 'South Korea' },
  { name: 'Oh Hyeon-gyu', country: 'South Korea' },
  { name: 'Jeong Sang-bin', country: 'South Korea' },
  { name: 'Um Won-sang', country: 'South Korea' },
  { name: 'Lee Dong-gyeong', country: 'South Korea' },

  // Czech Republic
  { name: 'Jindřich Staněk', country: 'Czech Republic' },
  { name: 'Vítězslav Jaroš', country: 'Czech Republic' },
  { name: 'Matěj Kovář', country: 'Czech Republic' },
  { name: 'Tomáš Holeš', country: 'Czech Republic' },
  { name: 'Robin Hranáč', country: 'Czech Republic' },
  { name: 'Martin Vitík', country: 'Czech Republic' },
  { name: 'David Doudera', country: 'Czech Republic' },
  { name: 'David Jurásek', country: 'Czech Republic' },
  { name: 'Ladislav Krejčí', country: 'Czech Republic' },
  { name: 'David Zima', country: 'Czech Republic' },
  { name: 'Tomáš Vlček', country: 'Czech Republic' },
  { name: 'Vladimír Coufal', country: 'Czech Republic' },
  { name: 'Tomáš Souček', country: 'Czech Republic' },
  { name: 'Lukáš Provod', country: 'Czech Republic' },
  { name: 'Pavel Šulc', country: 'Czech Republic' },
  { name: 'Antonín Barák', country: 'Czech Republic' },
  { name: 'Michal Sadílek', country: 'Czech Republic' },
  { name: 'Adam Hložek', country: 'Czech Republic' },
  { name: 'Václav Černý', country: 'Czech Republic' },
  { name: 'Patrik Schick', country: 'Czech Republic' },
  { name: 'Tomáš Chorý', country: 'Czech Republic' },
  { name: 'Mojmír Chytil', country: 'Czech Republic' },
  { name: 'Matěj Jurásek', country: 'Czech Republic' },
  { name: 'Ondřej Lingr', country: 'Czech Republic' },
  { name: 'Petr Ševčík', country: 'Czech Republic' },
  { name: 'Lukáš Červ', country: 'Czech Republic' },

  // Canada
  { name: 'Maxime Crépeau', country: 'Canada' },
  { name: 'Dayne St. Clair', country: 'Canada' },
  { name: 'Tom McGill', country: 'Canada' },
  { name: 'Alphonso Davies', country: 'Canada' },
  { name: 'Sam Adekugbe', country: 'Canada' },
  { name: 'Richie Laryea', country: 'Canada' },
  { name: 'Alistair Johnston', country: 'Canada' },
  { name: 'Moïse Bombito', country: 'Canada' },
  { name: 'Derek Cornelius', country: 'Canada' },
  { name: 'Steven Vitória', country: 'Canada' },
  { name: 'Joel Waterman', country: 'Canada' },
  { name: 'Kamal Miller', country: 'Canada' },
  { name: 'Stephen Eustáquio', country: 'Canada' },
  { name: 'Ismaël Koné', country: 'Canada' },
  { name: 'Mathieu Choinière', country: 'Canada' },
  { name: 'Liam Fraser', country: 'Canada' },
  { name: 'Niko Sigur', country: 'Canada' },
  { name: 'Tajon Buchanan', country: 'Canada' },
  { name: 'Jacob Shaffelburg', country: 'Canada' },
  { name: 'Jonathan David', country: 'Canada' },
  { name: 'Cyle Larin', country: 'Canada' },
  { name: 'Jonathan Osorio', country: 'Canada' },
  { name: 'Junior Hoilett', country: 'Canada' },
  { name: 'Theo Bair', country: 'Canada' },
  { name: 'Daniel Jebbison', country: 'Canada' },
  { name: 'Ali Ahmed', country: 'Canada' },

  // Bosnia & Herzegovina
  { name: 'Nikola Vasilj', country: 'Bosnia & Herzegovina' },
  { name: 'Ibrahim Šehić', country: 'Bosnia & Herzegovina' },
  { name: 'Vladan Kovačević', country: 'Bosnia & Herzegovina' },
  { name: 'Sead Kolašinac', country: 'Bosnia & Herzegovina' },
  { name: 'Amar Dedić', country: 'Bosnia & Herzegovina' },
  { name: 'Nihad Mujakić', country: 'Bosnia & Herzegovina' },
  { name: 'Dennis Hadžikadunić', country: 'Bosnia & Herzegovina' },
  { name: 'Anel Ahmedhodžić', country: 'Bosnia & Herzegovina' },
  { name: 'Adrian Leon Barišić', country: 'Bosnia & Herzegovina' },
  { name: 'Eldar Ćivić', country: 'Bosnia & Herzegovina' },
  { name: 'Toni Šunjić', country: 'Bosnia & Herzegovina' },
  { name: 'Sanjin Prcić', country: 'Bosnia & Herzegovina' },
  { name: 'Miralem Pjanić', country: 'Bosnia & Herzegovina' },
  { name: 'Edin Višća', country: 'Bosnia & Herzegovina' },
  { name: 'Rade Krunić', country: 'Bosnia & Herzegovina' },
  { name: 'Amir Hadžiahmetović', country: 'Bosnia & Herzegovina' },
  { name: 'Benjamin Tahirović', country: 'Bosnia & Herzegovina' },
  { name: 'Haris Tabaković', country: 'Bosnia & Herzegovina' },
  { name: 'Said Hamulić', country: 'Bosnia & Herzegovina' },
  { name: 'Edin Džeko', country: 'Bosnia & Herzegovina' },
  { name: 'Ermedin Demirović', country: 'Bosnia & Herzegovina' },
  { name: 'Smail Prevljak', country: 'Bosnia & Herzegovina' },
  { name: 'Dženan Pejčinović', country: 'Bosnia & Herzegovina' },
  { name: 'Luka Menalo', country: 'Bosnia & Herzegovina' },
  { name: 'Armin Gigović', country: 'Bosnia & Herzegovina' },
  { name: 'Ervin Zukanović', country: 'Bosnia & Herzegovina' },

  // Qatar
  { name: 'Meshaal Barsham', country: 'Qatar' },
  { name: 'Saad Al Sheeb', country: 'Qatar' },
  { name: 'Yousef Hassan', country: 'Qatar' },
  { name: 'Pedro Miguel', country: 'Qatar' },
  { name: 'Bassam Al-Rawi', country: 'Qatar' },
  { name: 'Boualem Khoukhi', country: 'Qatar' },
  { name: 'Tarek Salman', country: 'Qatar' },
  { name: 'Homam Ahmed', country: 'Qatar' },
  { name: 'Sultan Al-Brake', country: 'Qatar' },
  { name: 'Mohammed Abdulsamad', country: 'Qatar' },
  { name: 'Jassem Gaber', country: 'Qatar' },
  { name: 'Abdulkarim Hassan', country: 'Qatar' },
  { name: 'Hassan Al-Haydos', country: 'Qatar' },
  { name: 'Karim Boudiaf', country: 'Qatar' },
  { name: 'Mostafa Meshaal', country: 'Qatar' },
  { name: 'Abdulaziz Hatem', country: 'Qatar' },
  { name: 'Assim Madibo', country: 'Qatar' },
  { name: 'Akram Afif', country: 'Qatar' },
  { name: 'Ismaeel Mohammad', country: 'Qatar' },
  { name: 'Almoez Ali', country: 'Qatar' },
  { name: 'Yusuf Abdurisag', country: 'Qatar' },
  { name: 'Mohammed Muntari', country: 'Qatar' },
  { name: 'Hashim Ali', country: 'Qatar' },
  { name: 'Ahmed Alaaeldin', country: 'Qatar' },
  { name: 'Ahmed Aledan', country: 'Qatar' },
  { name: 'Khalid Muneer', country: 'Qatar' },

  // Switzerland
  { name: 'Yann Sommer', country: 'Switzerland' },
  { name: 'Gregor Kobel', country: 'Switzerland' },
  { name: 'Yvon Mvogo', country: 'Switzerland' },
  { name: 'Manuel Akanji', country: 'Switzerland' },
  { name: 'Nico Elvedi', country: 'Switzerland' },
  { name: 'Ricardo Rodríguez', country: 'Switzerland' },
  { name: 'Fabian Schär', country: 'Switzerland' },
  { name: 'Silvan Widmer', country: 'Switzerland' },
  { name: 'Cédric Zesiger', country: 'Switzerland' },
  { name: 'Aurèle Amenda', country: 'Switzerland' },
  { name: 'Becir Omeragic', country: 'Switzerland' },
  { name: 'Edimilson Fernandes', country: 'Switzerland' },
  { name: 'Granit Xhaka', country: 'Switzerland' },
  { name: 'Remo Freuler', country: 'Switzerland' },
  { name: 'Denis Zakaria', country: 'Switzerland' },
  { name: 'Michel Aebischer', country: 'Switzerland' },
  { name: 'Fabian Rieder', country: 'Switzerland' },
  { name: 'Vincent Sierro', country: 'Switzerland' },
  { name: 'Ardon Jashari', country: 'Switzerland' },
  { name: 'Breel Embolo', country: 'Switzerland' },
  { name: 'Xherdan Shaqiri', country: 'Switzerland' },
  { name: 'Ruben Vargas', country: 'Switzerland' },
  { name: 'Dan Ndoye', country: 'Switzerland' },
  { name: 'Zeki Amdouni', country: 'Switzerland' },
  { name: 'Renato Steffen', country: 'Switzerland' },
  { name: 'Noah Okafor', country: 'Switzerland' },

  // Brazil
  { name: 'Alisson Becker', country: 'Brazil' },
  { name: 'Ederson', country: 'Brazil' },
  { name: 'Bento', country: 'Brazil' },
  { name: 'Marquinhos', country: 'Brazil' },
  { name: 'Gabriel Magalhães', country: 'Brazil' },
  { name: 'Éder Militão', country: 'Brazil' },
  { name: 'Murillo', country: 'Brazil' },
  { name: 'Beraldo', country: 'Brazil' },
  { name: 'Danilo', country: 'Brazil' },
  { name: 'Vanderson', country: 'Brazil' },
  { name: 'Wendell', country: 'Brazil' },
  { name: 'Caio Henrique', country: 'Brazil' },
  { name: 'Abner', country: 'Brazil' },
  { name: 'Bruno Guimarães', country: 'Brazil' },
  { name: 'Casemiro', country: 'Brazil' },
  { name: 'André', country: 'Brazil' },
  { name: 'Lucas Paquetá', country: 'Brazil' },
  { name: 'Gerson', country: 'Brazil' },
  { name: 'João Gomes', country: 'Brazil' },
  { name: 'Vinícius Júnior', country: 'Brazil' },
  { name: 'Rodrygo', country: 'Brazil' },
  { name: 'Raphinha', country: 'Brazil' },
  { name: 'Endrick', country: 'Brazil' },
  { name: 'Neymar', country: 'Brazil' },
  { name: 'Gabriel Martinelli', country: 'Brazil' },
  { name: 'Savinho', country: 'Brazil' },

  // Haiti
  { name: 'Johny Placide', country: 'Haiti' },
  { name: 'Steeve Saint-Duc', country: 'Haiti' },
  { name: 'Lossémy Karaboué', country: 'Haiti' },
  { name: 'Ricardo Adé', country: 'Haiti' },
  { name: 'Carlens Arcus', country: 'Haiti' },
  { name: 'Andrew Jean-Baptiste', country: 'Haiti' },
  { name: 'Garven-Michée Metusala', country: 'Haiti' },
  { name: 'Jems Geffrard', country: 'Haiti' },
  { name: 'Steven Saba', country: 'Haiti' },
  { name: 'Zachary Brault-Guillard', country: 'Haiti' },
  { name: 'Ronaldo Damus', country: 'Haiti' },
  { name: 'Bryan Alceus', country: 'Haiti' },
  { name: 'Danley Jean Jacques', country: 'Haiti' },
  { name: 'Leverton Pierre', country: 'Haiti' },
  { name: 'Carl Sainté', country: 'Haiti' },
  { name: 'Frantzdy Pierrot', country: 'Haiti' },
  { name: 'Wilde-Donald Guerrier', country: 'Haiti' },
  { name: 'Derrick Etienne', country: 'Haiti' },
  { name: 'Don Deedson Louicius', country: 'Haiti' },
  { name: 'Duckens Nazon', country: 'Haiti' },
  { name: 'Fafà Picault', country: 'Haiti' },
  { name: 'Jean-Eudes Maurice', country: 'Haiti' },
  { name: 'Jean Marc Alexandre', country: 'Haiti' },
  { name: 'Mikael Cantave', country: 'Haiti' },
  { name: 'Wilde-Donald Joseph', country: 'Haiti' },

  // Morocco
  { name: 'Yassine Bounou', country: 'Morocco' },
  { name: 'Munir Mohamedi', country: 'Morocco' },
  { name: 'Anas Zniti', country: 'Morocco' },
  { name: 'Achraf Hakimi', country: 'Morocco' },
  { name: 'Noussair Mazraoui', country: 'Morocco' },
  { name: 'Romain Saïss', country: 'Morocco' },
  { name: 'Nayef Aguerd', country: 'Morocco' },
  { name: 'Jawad El Yamiq', country: 'Morocco' },
  { name: 'Adam Masina', country: 'Morocco' },
  { name: 'Yahya Attiat-Allah', country: 'Morocco' },
  { name: 'Yahia Jabrane', country: 'Morocco' },
  { name: 'Chadi Riad', country: 'Morocco' },
  { name: 'Sofyan Amrabat', country: 'Morocco' },
  { name: 'Azzedine Ounahi', country: 'Morocco' },
  { name: 'Selim Amallah', country: 'Morocco' },
  { name: 'Bilal El Khannouss', country: 'Morocco' },
  { name: 'Ismael Saibari', country: 'Morocco' },
  { name: 'Abdessamad Ezzalzouli', country: 'Morocco' },
  { name: 'Amir Richardson', country: 'Morocco' },
  { name: 'Hakim Ziyech', country: 'Morocco' },
  { name: 'Youssef En-Nesyri', country: 'Morocco' },
  { name: 'Soufiane Rahimi', country: 'Morocco' },
  { name: 'Brahim Díaz', country: 'Morocco' },
  { name: 'Ayoub El Kaabi', country: 'Morocco' },
  { name: 'Zakaria Aboukhlal', country: 'Morocco' },
  { name: 'Eliesse Ben Seghir', country: 'Morocco' },

  // Scotland
  { name: 'Angus Gunn', country: 'Scotland' },
  { name: 'Craig Gordon', country: 'Scotland' },
  { name: 'Liam Kelly', country: 'Scotland' },
  { name: 'Andy Robertson', country: 'Scotland' },
  { name: 'Kieran Tierney', country: 'Scotland' },
  { name: 'Aaron Hickey', country: 'Scotland' },
  { name: 'Anthony Ralston', country: 'Scotland' },
  { name: 'Nathan Patterson', country: 'Scotland' },
  { name: 'John Souttar', country: 'Scotland' },
  { name: 'Grant Hanley', country: 'Scotland' },
  { name: 'Scott McKenna', country: 'Scotland' },
  { name: 'Jack Hendry', country: 'Scotland' },
  { name: 'Ryan Porteous', country: 'Scotland' },
  { name: 'Scott McTominay', country: 'Scotland' },
  { name: 'Callum McGregor', country: 'Scotland' },
  { name: 'John McGinn', country: 'Scotland' },
  { name: 'Billy Gilmour', country: 'Scotland' },
  { name: 'Stuart Armstrong', country: 'Scotland' },
  { name: 'Kenny McLean', country: 'Scotland' },
  { name: 'Lewis Ferguson', country: 'Scotland' },
  { name: 'Che Adams', country: 'Scotland' },
  { name: 'Lyndon Dykes', country: 'Scotland' },
  { name: 'Ryan Christie', country: 'Scotland' },
  { name: 'James Forrest', country: 'Scotland' },
  { name: 'Lawrence Shankland', country: 'Scotland' },
  { name: 'Tommy Conway', country: 'Scotland' },

  // Australia
  { name: 'Mathew Ryan', country: 'Australia' },
  { name: 'Joe Gauci', country: 'Australia' },
  { name: 'Lawrence Thomas', country: 'Australia' },
  { name: 'Harry Souttar', country: 'Australia' },
  { name: 'Kye Rowles', country: 'Australia' },
  { name: 'Cameron Burgess', country: 'Australia' },
  { name: 'Aziz Behich', country: 'Australia' },
  { name: 'Gethin Jones', country: 'Australia' },
  { name: 'Milos Degenek', country: 'Australia' },
  { name: 'Thomas Deng', country: 'Australia' },
  { name: 'Jordan Bos', country: 'Australia' },
  { name: 'Lewis Miller', country: 'Australia' },
  { name: 'Alessandro Circati', country: 'Australia' },
  { name: 'Aiden O\'Neill', country: 'Australia' },
  { name: 'Connor Metcalfe', country: 'Australia' },
  { name: 'Jackson Irvine', country: 'Australia' },
  { name: 'Riley McGree', country: 'Australia' },
  { name: 'Keanu Baccus', country: 'Australia' },
  { name: 'Patrick Yazbek', country: 'Australia' },
  { name: 'Cameron Devlin', country: 'Australia' },
  { name: 'Mitchell Duke', country: 'Australia' },
  { name: 'Kusini Yengi', country: 'Australia' },
  { name: 'Mohamed Toure', country: 'Australia' },
  { name: 'Brandon Borrello', country: 'Australia' },
  { name: 'Sammy Silvera', country: 'Australia' },
  { name: 'Craig Goodwin', country: 'Australia' },

  // Paraguay
  { name: 'Roberto Fernández', country: 'Paraguay' },
  { name: 'Carlos Coronel', country: 'Paraguay' },
  { name: 'Ángel González', country: 'Paraguay' },
  { name: 'Junior Alonso', country: 'Paraguay' },
  { name: 'Gustavo Gómez', country: 'Paraguay' },
  { name: 'Omar Alderete', country: 'Paraguay' },
  { name: 'Robert Rojas', country: 'Paraguay' },
  { name: 'Fabián Balbuena', country: 'Paraguay' },
  { name: 'Juan Cáceres', country: 'Paraguay' },
  { name: 'Ronaldo Martínez', country: 'Paraguay' },
  { name: 'Andrés Cubas', country: 'Paraguay' },
  { name: 'Blas Riveros', country: 'Paraguay' },
  { name: 'Saúl Salcedo', country: 'Paraguay' },
  { name: 'Damián Bobadilla', country: 'Paraguay' },
  { name: 'Mathías Villasanti', country: 'Paraguay' },
  { name: 'Diego Gómez', country: 'Paraguay' },
  { name: 'Richard Sánchez', country: 'Paraguay' },
  { name: 'Lorenzo Melgarejo', country: 'Paraguay' },
  { name: 'Julio Enciso', country: 'Paraguay' },
  { name: 'Miguel Almirón', country: 'Paraguay' },
  { name: 'Antonio Sanabria', country: 'Paraguay' },
  { name: 'Adam Bareiro', country: 'Paraguay' },
  { name: 'Gabriel Ávalos', country: 'Paraguay' },
  { name: 'Ramón Sosa', country: 'Paraguay' },
  { name: 'Alex Arce', country: 'Paraguay' },
  { name: 'Damián Martínez', country: 'Paraguay' },

  // Turkey
  { name: 'Uğurcan Çakır', country: 'Turkey' },
  { name: 'Mert Günok', country: 'Turkey' },
  { name: 'Altay Bayındır', country: 'Turkey' },
  { name: 'Merih Demiral', country: 'Turkey' },
  { name: 'Çağlar Söyüncü', country: 'Turkey' },
  { name: 'Samet Akaydin', country: 'Turkey' },
  { name: 'Zeki Çelik', country: 'Turkey' },
  { name: 'Ferdi Kadıoğlu', country: 'Turkey' },
  { name: 'Eren Elmalı', country: 'Turkey' },
  { name: 'Mert Müldür', country: 'Turkey' },
  { name: 'Abdülkerim Bardakcı', country: 'Turkey' },
  { name: 'Kaan Ayhan', country: 'Turkey' },
  { name: 'Hakan Çalhanoğlu', country: 'Turkey' },
  { name: 'Orkun Kökçü', country: 'Turkey' },
  { name: 'İsmail Yüksek', country: 'Turkey' },
  { name: 'Salih Özcan', country: 'Turkey' },
  { name: 'Kenan Yıldız', country: 'Turkey' },
  { name: 'Arda Güler', country: 'Turkey' },
  { name: 'İrfan Can Kahveci', country: 'Turkey' },
  { name: 'Cengiz Ünder', country: 'Turkey' },
  { name: 'Kerem Aktürkoğlu', country: 'Turkey' },
  { name: 'Barış Alper Yılmaz', country: 'Turkey' },
  { name: 'Yusuf Yazıcı', country: 'Turkey' },
  { name: 'Semih Kılıçsoy', country: 'Turkey' },
  { name: 'Bertuğ Yıldırım', country: 'Turkey' },

  // USA
  { name: 'Matt Turner', country: 'USA' },
  { name: 'Ethan Horvath', country: 'USA' },
  { name: 'Patrick Schulte', country: 'USA' },
  { name: 'Sergiño Dest', country: 'USA' },
  { name: 'Antonee Robinson', country: 'USA' },
  { name: 'Tim Ream', country: 'USA' },
  { name: 'Chris Richards', country: 'USA' },
  { name: 'Cameron Carter-Vickers', country: 'USA' },
  { name: 'Miles Robinson', country: 'USA' },
  { name: 'Joe Scally', country: 'USA' },
  { name: 'Mark McKenzie', country: 'USA' },
  { name: 'Auston Trusty', country: 'USA' },
  { name: 'DeJuan Jones', country: 'USA' },
  { name: 'Tyler Adams', country: 'USA' },
  { name: 'Weston McKennie', country: 'USA' },
  { name: 'Yunus Musah', country: 'USA' },
  { name: 'Johnny Cardoso', country: 'USA' },
  { name: 'Luca de la Torre', country: 'USA' },
  { name: 'Gianluca Busio', country: 'USA' },
  { name: 'Malik Tillman', country: 'USA' },
  { name: 'Christian Pulisic', country: 'USA' },
  { name: 'Tim Weah', country: 'USA' },
  { name: 'Brenden Aaronson', country: 'USA' },
  { name: 'Giovanni Reyna', country: 'USA' },
  { name: 'Folarin Balogun', country: 'USA' },
  { name: 'Ricardo Pepi', country: 'USA' },

  // Curaçao
  { name: 'Eloy Room', country: 'Curaçao' },
  { name: 'Kenton Kerr', country: 'Curaçao' },
  { name: 'Jairzinho Pieter', country: 'Curaçao' },
  { name: 'Cuco Martina', country: 'Curaçao' },
  { name: 'Bart Vriends', country: 'Curaçao' },
  { name: 'Sherel Floranus', country: 'Curaçao' },
  { name: 'Juriën Gaari', country: 'Curaçao' },
  { name: 'Armando Obispo', country: 'Curaçao' },
  { name: 'Roshon van Eijma', country: 'Curaçao' },
  { name: 'Rangelo Janga', country: 'Curaçao' },
  { name: 'Shermar Martina', country: 'Curaçao' },
  { name: 'Brendan Schoop', country: 'Curaçao' },
  { name: 'Leandro Bacuna', country: 'Curaçao' },
  { name: 'Roly Bonevacia', country: 'Curaçao' },
  { name: 'Jurich Carolina', country: 'Curaçao' },
  { name: 'Jurgen Locadia', country: 'Curaçao' },
  { name: 'Tahith Chong', country: 'Curaçao' },
  { name: 'Sontje Hansen', country: 'Curaçao' },
  { name: 'Kevin Felida', country: 'Curaçao' },
  { name: 'Bryan Linssen', country: 'Curaçao' },
  { name: 'Brandley Kuwas', country: 'Curaçao' },
  { name: 'Gervane Kastaneer', country: 'Curaçao' },
  { name: 'Vurnon Anita', country: 'Curaçao' },
  { name: 'Ar\'jany Martha', country: 'Curaçao' },
  { name: 'Anthony van den Hurk', country: 'Curaçao' },
  { name: 'Livano Comenencia', country: 'Curaçao' },

  // Ecuador
  { name: 'Hernán Galíndez', country: 'Ecuador' },
  { name: 'Alexander Domínguez', country: 'Ecuador' },
  { name: 'Moisés Ramírez', country: 'Ecuador' },
  { name: 'Pervis Estupiñán', country: 'Ecuador' },
  { name: 'Ángelo Preciado', country: 'Ecuador' },
  { name: 'Piero Hincapié', country: 'Ecuador' },
  { name: 'Félix Torres', country: 'Ecuador' },
  { name: 'William Pacho', country: 'Ecuador' },
  { name: 'Joel Ordóñez', country: 'Ecuador' },
  { name: 'Xavier Arreaga', country: 'Ecuador' },
  { name: 'Robert Arboleda', country: 'Ecuador' },
  { name: 'Diego Palacios', country: 'Ecuador' },
  { name: 'Moisés Caicedo', country: 'Ecuador' },
  { name: 'Alan Franco', country: 'Ecuador' },
  { name: 'Patrickson Delgado', country: 'Ecuador' },
  { name: 'Jhojan Julio', country: 'Ecuador' },
  { name: 'Kendry Páez', country: 'Ecuador' },
  { name: 'Gonzalo Plata', country: 'Ecuador' },
  { name: 'Nilson Angulo', country: 'Ecuador' },
  { name: 'Enner Valencia', country: 'Ecuador' },
  { name: 'Kevin Rodríguez', country: 'Ecuador' },
  { name: 'Jeremy Sarmiento', country: 'Ecuador' },
  { name: 'Leonardo Campana', country: 'Ecuador' },
  { name: 'John Yeboah', country: 'Ecuador' },
  { name: 'Djorkaeff Reasco', country: 'Ecuador' },
  { name: 'Ángel Mena', country: 'Ecuador' },

  // Germany
  { name: 'Marc-André ter Stegen', country: 'Germany' },
  { name: 'Manuel Neuer', country: 'Germany' },
  { name: 'Oliver Baumann', country: 'Germany' },
  { name: 'Antonio Rüdiger', country: 'Germany' },
  { name: 'Nico Schlotterbeck', country: 'Germany' },
  { name: 'Jonathan Tah', country: 'Germany' },
  { name: 'Waldemar Anton', country: 'Germany' },
  { name: 'Benjamin Henrichs', country: 'Germany' },
  { name: 'Joshua Kimmich', country: 'Germany' },
  { name: 'David Raum', country: 'Germany' },
  { name: 'Maximilian Mittelstädt', country: 'Germany' },
  { name: 'Robin Koch', country: 'Germany' },
  { name: 'Pascal Groß', country: 'Germany' },
  { name: 'Toni Kroos', country: 'Germany' },
  { name: 'Ilkay Gündoğan', country: 'Germany' },
  { name: 'Robert Andrich', country: 'Germany' },
  { name: 'Aleksandar Pavlović', country: 'Germany' },
  { name: 'Florian Wirtz', country: 'Germany' },
  { name: 'Jamal Musiala', country: 'Germany' },
  { name: 'Leroy Sané', country: 'Germany' },
  { name: 'Kai Havertz', country: 'Germany' },
  { name: 'Niclas Füllkrug', country: 'Germany' },
  { name: 'Deniz Undav', country: 'Germany' },
  { name: 'Chris Führich', country: 'Germany' },
  { name: 'Maximilian Beier', country: 'Germany' },
  { name: 'Thomas Müller', country: 'Germany' },

  // Ivory Coast
  { name: 'Yahia Fofana', country: 'Ivory Coast' },
  { name: 'Mohamed Koné', country: 'Ivory Coast' },
  { name: 'Badra Ali Sangaré', country: 'Ivory Coast' },
  { name: 'Serge Aurier', country: 'Ivory Coast' },
  { name: 'Wilfried Singo', country: 'Ivory Coast' },
  { name: 'Ghislain Konan', country: 'Ivory Coast' },
  { name: 'Evan Ndicka', country: 'Ivory Coast' },
  { name: 'Odilon Kossounou', country: 'Ivory Coast' },
  { name: 'Willy Boly', country: 'Ivory Coast' },
  { name: 'Eric Bailly', country: 'Ivory Coast' },
  { name: 'Ousmane Diomandé', country: 'Ivory Coast' },
  { name: 'Sinaly Diomandé', country: 'Ivory Coast' },
  { name: 'Boubacar Kouassi', country: 'Ivory Coast' },
  { name: 'Franck Kessié', country: 'Ivory Coast' },
  { name: 'Seko Fofana', country: 'Ivory Coast' },
  { name: 'Ibrahim Sangaré', country: 'Ivory Coast' },
  { name: 'Yves Bissouma', country: 'Ivory Coast' },
  { name: 'Lassine Diabaté', country: 'Ivory Coast' },
  { name: 'Hamed Junior Traorè', country: 'Ivory Coast' },
  { name: 'Jean Michaël Seri', country: 'Ivory Coast' },
  { name: 'Sébastien Haller', country: 'Ivory Coast' },
  { name: 'Nicolas Pépé', country: 'Ivory Coast' },
  { name: 'Max Gradel', country: 'Ivory Coast' },
  { name: 'Karim Konaté', country: 'Ivory Coast' },
  { name: 'Simon Adingra', country: 'Ivory Coast' },
  { name: 'Jérémie Boga', country: 'Ivory Coast' },

  // Japan
  { name: 'Zion Suzuki', country: 'Japan' },
  { name: 'Daniel Schmidt', country: 'Japan' },
  { name: 'Keisuke Osako', country: 'Japan' },
  { name: 'Ko Itakura', country: 'Japan' },
  { name: 'Takehiro Tomiyasu', country: 'Japan' },
  { name: 'Hiroki Sakai', country: 'Japan' },
  { name: 'Yukinari Sugawara', country: 'Japan' },
  { name: 'Hiroki Itō', country: 'Japan' },
  { name: 'Shogo Taniguchi', country: 'Japan' },
  { name: 'Daiki Hashioka', country: 'Japan' },
  { name: 'Seiya Maikuma', country: 'Japan' },
  { name: 'Yuto Nagatomo', country: 'Japan' },
  { name: 'Wataru Endō', country: 'Japan' },
  { name: 'Hidemasa Morita', country: 'Japan' },
  { name: 'Ao Tanaka', country: 'Japan' },
  { name: 'Daichi Kamada', country: 'Japan' },
  { name: 'Reo Hatate', country: 'Japan' },
  { name: 'Junya Itō', country: 'Japan' },
  { name: 'Kaoru Mitoma', country: 'Japan' },
  { name: 'Takefusa Kubo', country: 'Japan' },
  { name: 'Daizen Maeda', country: 'Japan' },
  { name: 'Ayase Ueda', country: 'Japan' },
  { name: 'Takuma Asano', country: 'Japan' },
  { name: 'Shuto Machino', country: 'Japan' },
  { name: 'Keito Nakamura', country: 'Japan' },
  { name: 'Mao Hosoya', country: 'Japan' },

  // Netherlands
  { name: 'Bart Verbruggen', country: 'Netherlands' },
  { name: 'Mark Flekken', country: 'Netherlands' },
  { name: 'Justin Bijlow', country: 'Netherlands' },
  { name: 'Virgil van Dijk', country: 'Netherlands' },
  { name: 'Stefan de Vrij', country: 'Netherlands' },
  { name: 'Matthijs de Ligt', country: 'Netherlands' },
  { name: 'Nathan Aké', country: 'Netherlands' },
  { name: 'Lutsharel Geertruida', country: 'Netherlands' },
  { name: 'Daley Blind', country: 'Netherlands' },
  { name: 'Denzel Dumfries', country: 'Netherlands' },
  { name: 'Jeremie Frimpong', country: 'Netherlands' },
  { name: 'Micky van de Ven', country: 'Netherlands' },
  { name: 'Jurriën Timber', country: 'Netherlands' },
  { name: 'Jorrel Hato', country: 'Netherlands' },
  { name: 'Frenkie de Jong', country: 'Netherlands' },
  { name: 'Tijjani Reijnders', country: 'Netherlands' },
  { name: 'Ryan Gravenberch', country: 'Netherlands' },
  { name: 'Xavi Simons', country: 'Netherlands' },
  { name: 'Joey Veerman', country: 'Netherlands' },
  { name: 'Quinten Timber', country: 'Netherlands' },
  { name: 'Mats Wieffer', country: 'Netherlands' },
  { name: 'Memphis Depay', country: 'Netherlands' },
  { name: 'Cody Gakpo', country: 'Netherlands' },
  { name: 'Wout Weghorst', country: 'Netherlands' },
  { name: 'Donyell Malen', country: 'Netherlands' },
  { name: 'Brian Brobbey', country: 'Netherlands' },

  // Sweden
  { name: 'Robin Olsen', country: 'Sweden' },
  { name: 'Kristoffer Nordfeldt', country: 'Sweden' },
  { name: 'Viktor Johansson', country: 'Sweden' },
  { name: 'Victor Lindelöf', country: 'Sweden' },
  { name: 'Isak Hien', country: 'Sweden' },
  { name: 'Gabriel Gudmundsson', country: 'Sweden' },
  { name: 'Emil Krafth', country: 'Sweden' },
  { name: 'Daniel Svensson', country: 'Sweden' },
  { name: 'Hjalmar Ekdal', country: 'Sweden' },
  { name: 'Linus Wahlqvist', country: 'Sweden' },
  { name: 'Carl Starfelt', country: 'Sweden' },
  { name: 'Joakim Nilsson', country: 'Sweden' },
  { name: 'Albin Ekdal', country: 'Sweden' },
  { name: 'Mattias Svanberg', country: 'Sweden' },
  { name: 'Yasin Ayari', country: 'Sweden' },
  { name: 'Jens Cajuste', country: 'Sweden' },
  { name: 'Jesper Karlsson', country: 'Sweden' },
  { name: 'Anthony Elanga', country: 'Sweden' },
  { name: 'Dejan Kulusevski', country: 'Sweden' },
  { name: 'Hugo Larsson', country: 'Sweden' },
  { name: 'Alexander Isak', country: 'Sweden' },
  { name: 'Viktor Gyökeres', country: 'Sweden' },
  { name: 'Marcus Berg', country: 'Sweden' },
  { name: 'Lucas Bergvall', country: 'Sweden' },
  { name: 'Emil Forsberg', country: 'Sweden' },
  { name: 'Jordan Larsson', country: 'Sweden' },

  // Tunisia
  { name: 'Aymen Dahmen', country: 'Tunisia' },
  { name: 'Bechir Ben Saïd', country: 'Tunisia' },
  { name: 'Mouez Hassen', country: 'Tunisia' },
  { name: 'Mohamed Dräger', country: 'Tunisia' },
  { name: 'Ali Abdi', country: 'Tunisia' },
  { name: 'Yan Valery', country: 'Tunisia' },
  { name: 'Montassar Talbi', country: 'Tunisia' },
  { name: 'Dylan Bronn', country: 'Tunisia' },
  { name: 'Yassine Meriah', country: 'Tunisia' },
  { name: 'Nader Ghandri', country: 'Tunisia' },
  { name: 'Wajdi Kechrida', country: 'Tunisia' },
  { name: 'Rami Kaib', country: 'Tunisia' },
  { name: 'Aïssa Laïdouni', country: 'Tunisia' },
  { name: 'Ellyes Skhiri', country: 'Tunisia' },
  { name: 'Ferjani Sassi', country: 'Tunisia' },
  { name: 'Hannibal Mejbri', country: 'Tunisia' },
  { name: 'Mohamed Ali Ben Romdhane', country: 'Tunisia' },
  { name: 'Anis Ben Slimane', country: 'Tunisia' },
  { name: 'Naïm Sliti', country: 'Tunisia' },
  { name: 'Wahbi Khazri', country: 'Tunisia' },
  { name: 'Youssef Msakni', country: 'Tunisia' },
  { name: 'Issam Jebali', country: 'Tunisia' },
  { name: 'Seifeddine Jaziri', country: 'Tunisia' },
  { name: 'Taha Yassine Khenissi', country: 'Tunisia' },
  { name: 'Elias Achouri', country: 'Tunisia' },
  { name: 'Hazem Mastouri', country: 'Tunisia' },

  // Belgium
  { name: 'Koen Casteels', country: 'Belgium' },
  { name: 'Matz Sels', country: 'Belgium' },
  { name: 'Thomas Kaminski', country: 'Belgium' },
  { name: 'Jan Vertonghen', country: 'Belgium' },
  { name: 'Wout Faes', country: 'Belgium' },
  { name: 'Arthur Theate', country: 'Belgium' },
  { name: 'Zeno Debast', country: 'Belgium' },
  { name: 'Maxim De Cuyper', country: 'Belgium' },
  { name: 'Timothy Castagne', country: 'Belgium' },
  { name: 'Thomas Meunier', country: 'Belgium' },
  { name: 'Sebastiaan Bornauw', country: 'Belgium' },
  { name: 'Ameen Al-Dakhil', country: 'Belgium' },
  { name: 'Kevin De Bruyne', country: 'Belgium' },
  { name: 'Youri Tielemans', country: 'Belgium' },
  { name: 'Amadou Onana', country: 'Belgium' },
  { name: 'Orel Mangala', country: 'Belgium' },
  { name: 'Arthur Vermeeren', country: 'Belgium' },
  { name: 'Leandro Trossard', country: 'Belgium' },
  { name: 'Jérémy Doku', country: 'Belgium' },
  { name: 'Charles De Ketelaere', country: 'Belgium' },
  { name: 'Romelu Lukaku', country: 'Belgium' },
  { name: 'Loïs Openda', country: 'Belgium' },
  { name: 'Dodi Lukebakio', country: 'Belgium' },
  { name: 'Yannick Carrasco', country: 'Belgium' },
  { name: 'Johan Bakayoko', country: 'Belgium' },
  { name: 'Michy Batshuayi', country: 'Belgium' },

  // Egypt
  { name: 'Mohamed El Shenawy', country: 'Egypt' },
  { name: 'Mohamed Sobhy', country: 'Egypt' },
  { name: 'Mohamed Abou Gabal', country: 'Egypt' },
  { name: 'Ahmed Hegazi', country: 'Egypt' },
  { name: 'Mahmoud Hamdy', country: 'Egypt' },
  { name: 'Mohamed Abdelmonem', country: 'Egypt' },
  { name: 'Omar Kamal', country: 'Egypt' },
  { name: 'Mohamed Hany', country: 'Egypt' },
  { name: 'Ahmed Fatouh', country: 'Egypt' },
  { name: 'Yasser Ibrahim', country: 'Egypt' },
  { name: 'Ahmed Sayed', country: 'Egypt' },
  { name: 'Karim Fouad', country: 'Egypt' },
  { name: 'Mohamed Elneny', country: 'Egypt' },
  { name: 'Hamdi Fathi', country: 'Egypt' },
  { name: 'Tarek Hamed', country: 'Egypt' },
  { name: 'Akram Tawfik', country: 'Egypt' },
  { name: 'Emam Ashour', country: 'Egypt' },
  { name: 'Mostafa Mohamed', country: 'Egypt' },
  { name: 'Trezeguet', country: 'Egypt' },
  { name: 'Marwan Attia', country: 'Egypt' },
  { name: 'Mohamed Salah', country: 'Egypt' },
  { name: 'Omar Marmoush', country: 'Egypt' },
  { name: 'Mostafa Fathi', country: 'Egypt' },
  { name: 'Ibrahim Adel', country: 'Egypt' },
  { name: 'Ahmed Sayed Zizo', country: 'Egypt' },
  { name: 'Hossam Hassan', country: 'Egypt' },

  // Iran
  { name: 'Alireza Beiranvand', country: 'Iran' },
  { name: 'Amir Abedzadeh', country: 'Iran' },
  { name: 'Payam Niazmand', country: 'Iran' },
  { name: 'Sadegh Moharrami', country: 'Iran' },
  { name: 'Ehsan Hajsafi', country: 'Iran' },
  { name: 'Milad Mohammadi', country: 'Iran' },
  { name: 'Shojae Khalilzadeh', country: 'Iran' },
  { name: 'Morteza Pouraliganji', country: 'Iran' },
  { name: 'Majid Hosseini', country: 'Iran' },
  { name: 'Aref Gholami', country: 'Iran' },
  { name: 'Hossein Kanaani', country: 'Iran' },
  { name: 'Ramin Rezaeian', country: 'Iran' },
  { name: 'Saeid Ezatolahi', country: 'Iran' },
  { name: 'Ahmad Nourollahi', country: 'Iran' },
  { name: 'Saman Ghoddos', country: 'Iran' },
  { name: 'Alireza Jahanbakhsh', country: 'Iran' },
  { name: 'Mehdi Torabi', country: 'Iran' },
  { name: 'Ali Karimi', country: 'Iran' },
  { name: 'Mohammad Mohebi', country: 'Iran' },
  { name: 'Soroush Rafiei', country: 'Iran' },
  { name: 'Mehdi Taremi', country: 'Iran' },
  { name: 'Sardar Azmoun', country: 'Iran' },
  { name: 'Karim Ansarifard', country: 'Iran' },
  { name: 'Ali Gholizadeh', country: 'Iran' },
  { name: 'Allahyar Sayyadmanesh', country: 'Iran' },
  { name: 'Shahab Zahedi', country: 'Iran' },

  // New Zealand
  { name: 'Oliver Sail', country: 'New Zealand' },
  { name: 'Alex Paulsen', country: 'New Zealand' },
  { name: 'Max Crocombe', country: 'New Zealand' },
  { name: 'Michael Boxall', country: 'New Zealand' },
  { name: 'Tyler Bindon', country: 'New Zealand' },
  { name: 'Nando Pijnaker', country: 'New Zealand' },
  { name: 'Liberato Cacace', country: 'New Zealand' },
  { name: 'Tim Payne', country: 'New Zealand' },
  { name: 'Francis de Vries', country: 'New Zealand' },
  { name: 'Finn Surman', country: 'New Zealand' },
  { name: 'Dane Ingham', country: 'New Zealand' },
  { name: 'Bill Tuiloma', country: 'New Zealand' },
  { name: 'Joe Bell', country: 'New Zealand' },
  { name: 'Marko Stamenić', country: 'New Zealand' },
  { name: 'Matthew Garbett', country: 'New Zealand' },
  { name: 'Ben Old', country: 'New Zealand' },
  { name: 'Sarpreet Singh', country: 'New Zealand' },
  { name: 'Callum McCowatt', country: 'New Zealand' },
  { name: 'Alex Greive', country: 'New Zealand' },
  { name: 'Elijah Just', country: 'New Zealand' },
  { name: 'Chris Wood', country: 'New Zealand' },
  { name: 'Kosta Barbarouses', country: 'New Zealand' },
  { name: 'Logan Rogerson', country: 'New Zealand' },
  { name: 'Eli Just', country: 'New Zealand' },
  { name: 'Storm Roux', country: 'New Zealand' },
  { name: 'Matthew Conroy', country: 'New Zealand' },

  // Cape Verde
  { name: 'Vozinha', country: 'Cape Verde' },
  { name: 'Márcio Rosa', country: 'Cape Verde' },
  { name: 'Bruno Varela', country: 'Cape Verde' },
  { name: 'Stopira', country: 'Cape Verde' },
  { name: 'Diney Borges', country: 'Cape Verde' },
  { name: 'Roberto Lopes', country: 'Cape Verde' },
  { name: 'Logan Costa', country: 'Cape Verde' },
  { name: 'Sidny Cabral', country: 'Cape Verde' },
  { name: 'Steven Moreira', country: 'Cape Verde' },
  { name: 'Jeffry Fortes', country: 'Cape Verde' },
  { name: 'Diego Souza', country: 'Cape Verde' },
  { name: 'Kevin Pina', country: 'Cape Verde' },
  { name: 'Kenny Rocha', country: 'Cape Verde' },
  { name: 'Laros Duarte', country: 'Cape Verde' },
  { name: 'Patrick Andrade', country: 'Cape Verde' },
  { name: 'Pedro Brito', country: 'Cape Verde' },
  { name: 'Telmo Arcanjo', country: 'Cape Verde' },
  { name: 'Ryan Mendes', country: 'Cape Verde' },
  { name: 'Garry Rodrigues', country: 'Cape Verde' },
  { name: 'Yannick Semedo', country: 'Cape Verde' },
  { name: 'Jovane Cabral', country: 'Cape Verde' },
  { name: 'Bebé', country: 'Cape Verde' },
  { name: 'Júlio Tavares', country: 'Cape Verde' },
  { name: 'Gilson Tavares', country: 'Cape Verde' },
  { name: 'Willy Semedo', country: 'Cape Verde' },
  { name: 'Dailon Livramento', country: 'Cape Verde' },

  // Saudi Arabia
  { name: 'Mohammed Al-Owais', country: 'Saudi Arabia' },
  { name: 'Nawaf Al-Aqidi', country: 'Saudi Arabia' },
  { name: 'Ahmed Al-Kassar', country: 'Saudi Arabia' },
  { name: 'Saud Abdulhamid', country: 'Saudi Arabia' },
  { name: 'Yasser Al-Shahrani', country: 'Saudi Arabia' },
  { name: 'Sultan Al-Ghannam', country: 'Saudi Arabia' },
  { name: 'Ali Al-Bulaihi', country: 'Saudi Arabia' },
  { name: 'Hassan Tambakti', country: 'Saudi Arabia' },
  { name: 'Abdulelah Al-Amri', country: 'Saudi Arabia' },
  { name: 'Mohammed Al-Breik', country: 'Saudi Arabia' },
  { name: 'Ahmed Bamsaud', country: 'Saudi Arabia' },
  { name: 'Ali Lajami', country: 'Saudi Arabia' },
  { name: 'Salem Al-Dawsari', country: 'Saudi Arabia' },
  { name: 'Mohamed Kanno', country: 'Saudi Arabia' },
  { name: 'Abdullah Otayf', country: 'Saudi Arabia' },
  { name: 'Nasser Al-Dawsari', country: 'Saudi Arabia' },
  { name: 'Abdulrahman Ghareeb', country: 'Saudi Arabia' },
  { name: 'Hattan Bahebri', country: 'Saudi Arabia' },
  { name: 'Riyadh Sharahili', country: 'Saudi Arabia' },
  { name: 'Salman Al-Faraj', country: 'Saudi Arabia' },
  { name: 'Saleh Al-Shehri', country: 'Saudi Arabia' },
  { name: 'Firas Al-Buraikan', country: 'Saudi Arabia' },
  { name: 'Abdullah Al-Hamdan', country: 'Saudi Arabia' },
  { name: 'Haitham Asiri', country: 'Saudi Arabia' },
  { name: 'Abdullah Radif', country: 'Saudi Arabia' },
  { name: 'Musab Al-Juwayr', country: 'Saudi Arabia' },

  // Spain
  { name: 'Unai Simón', country: 'Spain' },
  { name: 'David Raya', country: 'Spain' },
  { name: 'Álex Remiro', country: 'Spain' },
  { name: 'Dani Carvajal', country: 'Spain' },
  { name: 'Pau Cubarsí', country: 'Spain' },
  { name: 'Aymeric Laporte', country: 'Spain' },
  { name: 'Robin Le Normand', country: 'Spain' },
  { name: 'Dean Huijsen', country: 'Spain' },
  { name: 'Marc Cucurella', country: 'Spain' },
  { name: 'Pedro Porro', country: 'Spain' },
  { name: 'Alejandro Grimaldo', country: 'Spain' },
  { name: 'Jesús Navas', country: 'Spain' },
  { name: 'Daniel Vivian', country: 'Spain' },
  { name: 'Rodri', country: 'Spain' },
  { name: 'Pedri', country: 'Spain' },
  { name: 'Mikel Merino', country: 'Spain' },
  { name: 'Fabián Ruiz', country: 'Spain' },
  { name: 'Aleix García', country: 'Spain' },
  { name: 'Gavi', country: 'Spain' },
  { name: 'Fermín López', country: 'Spain' },
  { name: 'Lamine Yamal', country: 'Spain' },
  { name: 'Nico Williams', country: 'Spain' },
  { name: 'Dani Olmo', country: 'Spain' },
  { name: 'Álvaro Morata', country: 'Spain' },
  { name: 'Álex Baena', country: 'Spain' },
  { name: 'Mikel Oyarzabal', country: 'Spain' },
  { name: 'Adrian Zurdito Garcia', country: 'Spain' },

  // Uruguay
  { name: 'Sergio Rochet', country: 'Uruguay' },
  { name: 'Santiago Mele', country: 'Uruguay' },
  { name: 'Franco Israel', country: 'Uruguay' },
  { name: 'Ronald Araújo', country: 'Uruguay' },
  { name: 'José María Giménez', country: 'Uruguay' },
  { name: 'Sebastián Cáceres', country: 'Uruguay' },
  { name: 'Mathías Olivera', country: 'Uruguay' },
  { name: 'Nahitan Nández', country: 'Uruguay' },
  { name: 'Guillermo Varela', country: 'Uruguay' },
  { name: 'Joaquín Piquerez', country: 'Uruguay' },
  { name: 'Santiago Bueno', country: 'Uruguay' },
  { name: 'Bruno Méndez', country: 'Uruguay' },
  { name: 'Fede Valverde', country: 'Uruguay' },
  { name: 'Manuel Ugarte', country: 'Uruguay' },
  { name: 'Rodrigo Bentancur', country: 'Uruguay' },
  { name: 'Nicolás de la Cruz', country: 'Uruguay' },
  { name: 'Giorgian de Arrascaeta', country: 'Uruguay' },
  { name: 'Maximiliano Araújo', country: 'Uruguay' },
  { name: 'Facundo Pellistri', country: 'Uruguay' },
  { name: 'Darwin Núñez', country: 'Uruguay' },
  { name: 'Maximiliano Gómez', country: 'Uruguay' },
  { name: 'Agustín Canobbio', country: 'Uruguay' },
  { name: 'Brian Rodríguez', country: 'Uruguay' },
  { name: 'Cristian Olivera', country: 'Uruguay' },
  { name: 'Luciano Rodríguez', country: 'Uruguay' },
  { name: 'Facundo Torres', country: 'Uruguay' },
  { name: 'Beatriz Jefa Perez', country: 'Uruguay' },

  // France
  { name: 'Mike Maignan', country: 'France' },
  { name: 'Brice Samba', country: 'France' },
  { name: 'Lucas Chevalier', country: 'France' },
  { name: 'Jules Koundé', country: 'France' },
  { name: 'William Saliba', country: 'France' },
  { name: 'Ibrahima Konaté', country: 'France' },
  { name: 'Dayot Upamecano', country: 'France' },
  { name: 'Theo Hernández', country: 'France' },
  { name: 'Lucas Hernández', country: 'France' },
  { name: 'Benjamin Pavard', country: 'France' },
  { name: 'Jonathan Clauss', country: 'France' },
  { name: 'Wesley Fofana', country: 'France' },
  { name: 'Castello Lukeba', country: 'France' },
  { name: 'Aurélien Tchouaméni', country: 'France' },
  { name: 'Eduardo Camavinga', country: 'France' },
  { name: 'Adrien Rabiot', country: 'France' },
  { name: 'Warren Zaïre-Emery', country: 'France' },
  { name: 'Youssouf Fofana', country: 'France' },
  { name: 'N\'Golo Kanté', country: 'France' },
  { name: 'Manu Koné', country: 'France' },
  { name: 'Kylian Mbappé', country: 'France' },
  { name: 'Ousmane Dembélé', country: 'France' },
  { name: 'Marcus Thuram', country: 'France' },
  { name: 'Michael Olise', country: 'France' },
  { name: 'Bradley Barcola', country: 'France' },
  { name: 'Désiré Doué', country: 'France' },

  // Iraq
  { name: 'Jalal Hassan', country: 'Iraq' },
  { name: 'Fahad Talib', country: 'Iraq' },
  { name: 'Ahmed Basil', country: 'Iraq' },
  { name: 'Hussein Ali', country: 'Iraq' },
  { name: 'Merchas Doski', country: 'Iraq' },
  { name: 'Zaid Tahseen', country: 'Iraq' },
  { name: 'Saad Natiq', country: 'Iraq' },
  { name: 'Ahmed Yahya', country: 'Iraq' },
  { name: 'Manaf Younus', country: 'Iraq' },
  { name: 'Akam Hashim', country: 'Iraq' },
  { name: 'Frans Putros', country: 'Iraq' },
  { name: 'Mustafa Nadhim', country: 'Iraq' },
  { name: 'Ibrahim Bayesh', country: 'Iraq' },
  { name: 'Amir Al-Ammari', country: 'Iraq' },
  { name: 'Osama Rashid', country: 'Iraq' },
  { name: 'Bashar Resan', country: 'Iraq' },
  { name: 'Sherko Karim', country: 'Iraq' },
  { name: 'Hussein Jabbar', country: 'Iraq' },
  { name: 'Yousif Amyn', country: 'Iraq' },
  { name: 'Zidane Iqbal', country: 'Iraq' },
  { name: 'Aymen Hussein', country: 'Iraq' },
  { name: 'Ali Al-Hamadi', country: 'Iraq' },
  { name: 'Mohanad Ali', country: 'Iraq' },
  { name: 'Hussein Ali Saeed', country: 'Iraq' },
  { name: 'Mohammed Qasim', country: 'Iraq' },
  { name: 'Hassan Abdulkareem', country: 'Iraq' },

  // Norway
  { name: 'Ørjan Nyland', country: 'Norway' },
  { name: 'Egil Selvik', country: 'Norway' },
  { name: 'Sten Grytebust', country: 'Norway' },
  { name: 'Stefan Strandberg', country: 'Norway' },
  { name: 'Leo Østigård', country: 'Norway' },
  { name: 'Kristoffer Ajer', country: 'Norway' },
  { name: 'Marcus Holmgren Pedersen', country: 'Norway' },
  { name: 'Birger Meling', country: 'Norway' },
  { name: 'Andreas Hanche-Olsen', country: 'Norway' },
  { name: 'Julian Ryerson', country: 'Norway' },
  { name: 'Fredrik André Bjørkan', country: 'Norway' },
  { name: 'David Møller Wolfe', country: 'Norway' },
  { name: 'Sander Berge', country: 'Norway' },
  { name: 'Morten Thorsby', country: 'Norway' },
  { name: 'Patrick Berg', country: 'Norway' },
  { name: 'Fredrik Aursnes', country: 'Norway' },
  { name: 'Mathias Normann', country: 'Norway' },
  { name: 'Antonio Nusa', country: 'Norway' },
  { name: 'Oscar Bobb', country: 'Norway' },
  { name: 'Kristian Thorstvedt', country: 'Norway' },
  { name: 'Erling Haaland', country: 'Norway' },
  { name: 'Martin Ødegaard', country: 'Norway' },
  { name: 'Alexander Sørloth', country: 'Norway' },
  { name: 'Jørgen Strand Larsen', country: 'Norway' },
  { name: 'Ola Solbakken', country: 'Norway' },
  { name: 'Mohamed Elyounoussi', country: 'Norway' },

  // Senegal
  { name: 'Édouard Mendy', country: 'Senegal' },
  { name: 'Seny Dieng', country: 'Senegal' },
  { name: 'Mory Diaw', country: 'Senegal' },
  { name: 'Kalidou Koulibaly', country: 'Senegal' },
  { name: 'Abdou Diallo', country: 'Senegal' },
  { name: 'Moussa Niakhaté', country: 'Senegal' },
  { name: 'Formose Mendy', country: 'Senegal' },
  { name: 'Ismail Jakobs', country: 'Senegal' },
  { name: 'Krépin Diatta', country: 'Senegal' },
  { name: 'Youssouf Sabaly', country: 'Senegal' },
  { name: 'El Hadji Malick Diouf', country: 'Senegal' },
  { name: 'Antoine Mendy', country: 'Senegal' },
  { name: 'Idrissa Gana Gueye', country: 'Senegal' },
  { name: 'Pape Matar Sarr', country: 'Senegal' },
  { name: 'Nampalys Mendy', country: 'Senegal' },
  { name: 'Pape Gueye', country: 'Senegal' },
  { name: 'Lamine Camara', country: 'Senegal' },
  { name: 'Pathé Ciss', country: 'Senegal' },
  { name: 'Iliman Ndiaye', country: 'Senegal' },
  { name: 'Habib Diarra', country: 'Senegal' },
  { name: 'Sadio Mané', country: 'Senegal' },
  { name: 'Ismaïla Sarr', country: 'Senegal' },
  { name: 'Boulaye Dia', country: 'Senegal' },
  { name: 'Nicolas Jackson', country: 'Senegal' },
  { name: 'Habib Diallo', country: 'Senegal' },
  { name: 'Chérif Ndiaye', country: 'Senegal' },

  // Algeria
  { name: 'Raïs M\'Bolhi', country: 'Algeria' },
  { name: 'Anthony Mandrea', country: 'Algeria' },
  { name: 'Alexis Guendouz', country: 'Algeria' },
  { name: 'Aïssa Mandi', country: 'Algeria' },
  { name: 'Ramy Bensebaini', country: 'Algeria' },
  { name: 'Youcef Atal', country: 'Algeria' },
  { name: 'Mohamed Farès', country: 'Algeria' },
  { name: 'Rayan Aït-Nouri', country: 'Algeria' },
  { name: 'Djamel Benlamri', country: 'Algeria' },
  { name: 'Hocine Benayada', country: 'Algeria' },
  { name: 'Mohamed-Amine Tougaï', country: 'Algeria' },
  { name: 'Houssem Aouar', country: 'Algeria' },
  { name: 'Ismaël Bennacer', country: 'Algeria' },
  { name: 'Nabil Bentaleb', country: 'Algeria' },
  { name: 'Adam Ounas', country: 'Algeria' },
  { name: 'Adam Zorgane', country: 'Algeria' },
  { name: 'Sofiane Feghouli', country: 'Algeria' },
  { name: 'Yacine Brahimi', country: 'Algeria' },
  { name: 'Saïd Benrahma', country: 'Algeria' },
  { name: 'Rachid Ghezzal', country: 'Algeria' },
  { name: 'Riyad Mahrez', country: 'Algeria' },
  { name: 'Islam Slimani', country: 'Algeria' },
  { name: 'Baghdad Bounedjah', country: 'Algeria' },
  { name: 'Amine Gouiri', country: 'Algeria' },
  { name: 'Mohamed Amoura', country: 'Algeria' },
  { name: 'Andy Delort', country: 'Algeria' },
  // Argentina
  { name: 'Emiliano Martínez', country: 'Argentina' },
  { name: 'Gerónimo Rulli', country: 'Argentina' },
  { name: 'Walter Benítez', country: 'Argentina' },
  { name: 'Cristian Romero', country: 'Argentina' },
  { name: 'Nicolás Otamendi', country: 'Argentina' },
  { name: 'Lisandro Martínez', country: 'Argentina' },
  { name: 'Nahuel Molina', country: 'Argentina' },
  { name: 'Marcos Acuña', country: 'Argentina' },
  { name: 'Nicolás Tagliafico', country: 'Argentina' },
  { name: 'Gonzalo Montiel', country: 'Argentina' },
  { name: 'Germán Pezzella', country: 'Argentina' },
  { name: 'Leonardo Balerdi', country: 'Argentina' },
  { name: 'Valentín Barco', country: 'Argentina' },
  { name: 'Rodrigo De Paul', country: 'Argentina' },
  { name: 'Leandro Paredes', country: 'Argentina' },
  { name: 'Enzo Fernández', country: 'Argentina' },
  { name: 'Alexis Mac Allister', country: 'Argentina' },
  { name: 'Exequiel Palacios', country: 'Argentina' },
  { name: 'Giovani Lo Celso', country: 'Argentina' },
  { name: 'Thiago Almada', country: 'Argentina' },
  { name: 'Lionel Messi', country: 'Argentina' },
  { name: 'Lautaro Martínez', country: 'Argentina' },
  { name: 'Julián Álvarez', country: 'Argentina' },
  { name: 'Ángel Di María', country: 'Argentina' },
  { name: 'Nicolás González', country: 'Argentina' },
  { name: 'Giuliano Simeone', country: 'Argentina' },

  // Austria
  { name: 'Patrick Pentz', country: 'Austria' },
  { name: 'Heinz Lindner', country: 'Austria' },
  { name: 'Niklas Hedl', country: 'Austria' },
  { name: 'David Alaba', country: 'Austria' },
  { name: 'Maximilian Wöber', country: 'Austria' },
  { name: 'Kevin Danso', country: 'Austria' },
  { name: 'Philipp Lienhart', country: 'Austria' },
  { name: 'Stefan Posch', country: 'Austria' },
  { name: 'Phillipp Mwene', country: 'Austria' },
  { name: 'Andreas Ulmer', country: 'Austria' },
  { name: 'Flavius Daniliuc', country: 'Austria' },
  { name: 'Leopold Querfeld', country: 'Austria' },
  { name: 'Marcel Sabitzer', country: 'Austria' },
  { name: 'Konrad Laimer', country: 'Austria' },
  { name: 'Florian Grillitsch', country: 'Austria' },
  { name: 'Nicolas Seiwald', country: 'Austria' },
  { name: 'Christoph Baumgartner', country: 'Austria' },
  { name: 'Patrick Wimmer', country: 'Austria' },
  { name: 'Romano Schmid', country: 'Austria' },
  { name: 'Marko Arnautović', country: 'Austria' },
  { name: 'Michael Gregoritsch', country: 'Austria' },
  { name: 'Maximilian Entrup', country: 'Austria' },
  { name: 'Junior Adamu', country: 'Austria' },
  { name: 'Karim Onisiwo', country: 'Austria' },
  { name: 'Andreas Weimann', country: 'Austria' },
  { name: 'Sasa Kalajdzic', country: 'Austria' },

  // Jordan
  { name: 'Yazeed Abulaila', country: 'Jordan' },
  { name: 'Abdullah Al-Fakhouri', country: 'Jordan' },
  { name: 'Suleiman Al-Faraj', country: 'Jordan' },
  { name: 'Bara\'a Marei', country: 'Jordan' },
  { name: 'Salem Al-Ajalin', country: 'Jordan' },
  { name: 'Yazan Al-Arab', country: 'Jordan' },
  { name: 'Abdallah Nasib', country: 'Jordan' },
  { name: 'Ihsan Haddad', country: 'Jordan' },
  { name: 'Ehsan Haddad', country: 'Jordan' },
  { name: 'Feras Shelbaieh', country: 'Jordan' },
  { name: 'Mahmoud Al-Mardi', country: 'Jordan' },
  { name: 'Saleh Rateb', country: 'Jordan' },
  { name: 'Noor Al-Rawabdeh', country: 'Jordan' },
  { name: 'Nizar Al-Rashdan', country: 'Jordan' },
  { name: 'Mahmoud Al-Mawas', country: 'Jordan' },
  { name: 'Rajaei Ayed', country: 'Jordan' },
  { name: 'Yazan Al-Naimat', country: 'Jordan' },
  { name: 'Mousa Al-Tamari', country: 'Jordan' },
  { name: 'Ali Olwan', country: 'Jordan' },
  { name: 'Anas Al-Awadat', country: 'Jordan' },
  { name: 'Mohammad Abu Hasheesh', country: 'Jordan' },
  { name: 'Hamza Al-Dardour', country: 'Jordan' },
  { name: 'Yousef Abu Jalbush', country: 'Jordan' },
  { name: 'Mohanad Abu Taha', country: 'Jordan' },
  { name: 'Mahmoud Al-Naber', country: 'Jordan' },
  { name: 'Ali Al-Mahmoud', country: 'Jordan' },

  // Colombia
  { name: 'David Ospina', country: 'Colombia' },
  { name: 'Camilo Vargas', country: 'Colombia' },
  { name: 'Álvaro Montero', country: 'Colombia' },
  { name: 'Daniel Muñoz', country: 'Colombia' },
  { name: 'Santiago Arias', country: 'Colombia' },
  { name: 'Davinson Sánchez', country: 'Colombia' },
  { name: 'Yerry Mina', country: 'Colombia' },
  { name: 'Jhon Lucumí', country: 'Colombia' },
  { name: 'Carlos Cuesta', country: 'Colombia' },
  { name: 'Johan Mojica', country: 'Colombia' },
  { name: 'Deiver Machado', country: 'Colombia' },
  { name: 'Cristian Borja', country: 'Colombia' },
  { name: 'Jefferson Lerma', country: 'Colombia' },
  { name: 'Richard Ríos', country: 'Colombia' },
  { name: 'Mateus Uribe', country: 'Colombia' },
  { name: 'James Rodríguez', country: 'Colombia' },
  { name: 'Juan Fernando Quintero', country: 'Colombia' },
  { name: 'Yaser Asprilla', country: 'Colombia' },
  { name: 'Kevin Castaño', country: 'Colombia' },
  { name: 'Jorge Carrascal', country: 'Colombia' },
  { name: 'Luis Díaz', country: 'Colombia' },
  { name: 'Jhon Arias', country: 'Colombia' },
  { name: 'Luis Sinisterra', country: 'Colombia' },
  { name: 'Jhon Córdoba', country: 'Colombia' },
  { name: 'Rafael Santos Borré', country: 'Colombia' },
  { name: 'Jhon Durán', country: 'Colombia' },

  // DR Congo
  { name: 'Lionel Mpasi', country: 'DR Congo' },
  { name: 'Timothy Fayulu', country: 'DR Congo' },
  { name: 'Dimitry Bertaud', country: 'DR Congo' },
  { name: 'Chancel Mbemba', country: 'DR Congo' },
  { name: 'Gédéon Kalulu', country: 'DR Congo' },
  { name: 'Arthur Masuaku', country: 'DR Congo' },
  { name: 'Henock Inonga', country: 'DR Congo' },
  { name: 'Aaron Tshibola', country: 'DR Congo' },
  { name: 'Axel Tuanzebe', country: 'DR Congo' },
  { name: 'Rocky Bushiri', country: 'DR Congo' },
  { name: 'Ngal\'ayel Mukau', country: 'DR Congo' },
  { name: 'Joris Kayembe', country: 'DR Congo' },
  { name: 'Samuel Moutoussamy', country: 'DR Congo' },
  { name: 'Charles Pickel', country: 'DR Congo' },
  { name: 'Edo Kayembe', country: 'DR Congo' },
  { name: 'Théo Bongonda', country: 'DR Congo' },
  { name: 'Gaël Kakuta', country: 'DR Congo' },
  { name: 'Yoane Wissa', country: 'DR Congo' },
  { name: 'Cédric Bakambu', country: 'DR Congo' },
  { name: 'Silas Katompa Mvumpa', country: 'DR Congo' },
  { name: 'Fiston Mayele', country: 'DR Congo' },
  { name: 'Meschack Elia', country: 'DR Congo' },
  { name: 'Simon Banza', country: 'DR Congo' },
  { name: 'Grady Diangana', country: 'DR Congo' },
  { name: 'Dylan Batubinsika', country: 'DR Congo' },
  { name: 'Noah Sadiki', country: 'DR Congo' },

  // Portugal
  { name: 'Diogo Costa', country: 'Portugal' },
  { name: 'Rui Patrício', country: 'Portugal' },
  { name: 'José Sá', country: 'Portugal' },
  { name: 'Rúben Dias', country: 'Portugal' },
  { name: 'Pepe', country: 'Portugal' },
  { name: 'António Silva', country: 'Portugal' },
  { name: 'Gonçalo Inácio', country: 'Portugal' },
  { name: 'Diogo Dalot', country: 'Portugal' },
  { name: 'Nuno Mendes', country: 'Portugal' },
  { name: 'João Cancelo', country: 'Portugal' },
  { name: 'Nélson Semedo', country: 'Portugal' },
  { name: 'Danilo Pereira', country: 'Portugal' },
  { name: 'Renato Veiga', country: 'Portugal' },
  { name: 'Bruno Fernandes', country: 'Portugal' },
  { name: 'Bernardo Silva', country: 'Portugal' },
  { name: 'Vitinha', country: 'Portugal' },
  { name: 'João Neves', country: 'Portugal' },
  { name: 'Rúben Neves', country: 'Portugal' },
  { name: 'João Palhinha', country: 'Portugal' },
  { name: 'Otávio', country: 'Portugal' },
  { name: 'Cristiano Ronaldo', country: 'Portugal' },
  { name: 'Rafael Leão', country: 'Portugal' },
  { name: 'Pedro Neto', country: 'Portugal' },
  { name: 'Gonçalo Ramos', country: 'Portugal' },
  { name: 'João Félix', country: 'Portugal' },
  { name: 'Francisco Conceição', country: 'Portugal' },

  // Uzbekistan
  { name: 'Utkir Yusupov', country: 'Uzbekistan' },
  { name: 'Abduvohid Nematov', country: 'Uzbekistan' },
  { name: 'Vladimir Nazarov', country: 'Uzbekistan' },
  { name: 'Abdukodir Khusanov', country: 'Uzbekistan' },
  { name: 'Rustamjon Ashurmatov', country: 'Uzbekistan' },
  { name: 'Akmal Mozgovoy', country: 'Uzbekistan' },
  { name: 'Sherzod Nasrullaev', country: 'Uzbekistan' },
  { name: 'Khojiakbar Alijonov', country: 'Uzbekistan' },
  { name: 'Farrukh Sayfiev', country: 'Uzbekistan' },
  { name: 'Umar Eshmurodov', country: 'Uzbekistan' },
  { name: 'Egor Krimets', country: 'Uzbekistan' },
  { name: 'Anvarjon Fayzullaev', country: 'Uzbekistan' },
  { name: 'Otabek Shukurov', country: 'Uzbekistan' },
  { name: 'Jaloliddin Masharipov', country: 'Uzbekistan' },
  { name: 'Azizbek Turgunboev', country: 'Uzbekistan' },
  { name: 'Abbosbek Fayzullaev', country: 'Uzbekistan' },
  { name: 'Abdurauf Buriev', country: 'Uzbekistan' },
  { name: 'Oston Urunov', country: 'Uzbekistan' },
  { name: 'Jasurbek Yakhshiboev', country: 'Uzbekistan' },
  { name: 'Oybek Bozorov', country: 'Uzbekistan' },
  { name: 'Eldor Shomurodov', country: 'Uzbekistan' },
  { name: 'Igor Sergeev', country: 'Uzbekistan' },
  { name: 'Bobir Davlatov', country: 'Uzbekistan' },
  { name: 'Ulugbek Khoshimov', country: 'Uzbekistan' },
  { name: 'Khojimat Erkinov', country: 'Uzbekistan' },
  { name: 'Sardor Sobirov', country: 'Uzbekistan' },

  // Croatia
  { name: 'Dominik Livaković', country: 'Croatia' },
  { name: 'Ivica Ivušić', country: 'Croatia' },
  { name: 'Nediljko Labrović', country: 'Croatia' },
  { name: 'Joško Gvardiol', country: 'Croatia' },
  { name: 'Marin Pongračić', country: 'Croatia' },
  { name: 'Josip Stanišić', country: 'Croatia' },
  { name: 'Josip Šutalo', country: 'Croatia' },
  { name: 'Borna Sosa', country: 'Croatia' },
  { name: 'Domagoj Vida', country: 'Croatia' },
  { name: 'Martin Erlić', country: 'Croatia' },
  { name: 'Josip Juranović', country: 'Croatia' },
  { name: 'Duje Ćaleta-Car', country: 'Croatia' },
  { name: 'Borna Barišić', country: 'Croatia' },
  { name: 'Luka Modrić', country: 'Croatia' },
  { name: 'Mateo Kovačić', country: 'Croatia' },
  { name: 'Marcelo Brozović', country: 'Croatia' },
  { name: 'Lovro Majer', country: 'Croatia' },
  { name: 'Mario Pašalić', country: 'Croatia' },
  { name: 'Nikola Vlašić', country: 'Croatia' },
  { name: 'Luka Sučić', country: 'Croatia' },
  { name: 'Andrej Kramarić', country: 'Croatia' },
  { name: 'Bruno Petković', country: 'Croatia' },
  { name: 'Marko Livaja', country: 'Croatia' },
  { name: 'Ivan Perišić', country: 'Croatia' },
  { name: 'Ante Budimir', country: 'Croatia' },
  { name: 'Igor Matanović', country: 'Croatia' },

  // England
  { name: 'Jordan Pickford', country: 'England' },
  { name: 'Aaron Ramsdale', country: 'England' },
  { name: 'Dean Henderson', country: 'England' },
  { name: 'Kyle Walker', country: 'England' },
  { name: 'Trent Alexander-Arnold', country: 'England' },
  { name: 'John Stones', country: 'England' },
  { name: 'Marc Guéhi', country: 'England' },
  { name: 'Harry Maguire', country: 'England' },
  { name: 'Luke Shaw', country: 'England' },
  { name: 'Kieran Trippier', country: 'England' },
  { name: 'Ezri Konsa', country: 'England' },
  { name: 'Reece James', country: 'England' },
  { name: 'Levi Colwill', country: 'England' },
  { name: 'Declan Rice', country: 'England' },
  { name: 'Jude Bellingham', country: 'England' },
  { name: 'Kobbie Mainoo', country: 'England' },
  { name: 'Conor Gallagher', country: 'England' },
  { name: 'Adam Wharton', country: 'England' },
  { name: 'Curtis Jones', country: 'England' },
  { name: 'Morgan Gibbs-White', country: 'England' },
  { name: 'Harry Kane', country: 'England' },
  { name: 'Bukayo Saka', country: 'England' },
  { name: 'Phil Foden', country: 'England' },
  { name: 'Cole Palmer', country: 'England' },
  { name: 'Anthony Gordon', country: 'England' },
  { name: 'Ollie Watkins', country: 'England' },

  // Ghana
  { name: 'Lawrence Ati-Zigi', country: 'Ghana' },
  { name: 'Richard Ofori', country: 'Ghana' },
  { name: 'Frederick Asare', country: 'Ghana' },
  { name: 'Daniel Amartey', country: 'Ghana' },
  { name: 'Jonathan Mensah', country: 'Ghana' },
  { name: 'Alexander Djiku', country: 'Ghana' },
  { name: 'Mohammed Salisu', country: 'Ghana' },
  { name: 'Alidu Seidu', country: 'Ghana' },
  { name: 'Jerome Opoku', country: 'Ghana' },
  { name: 'Tariq Lamptey', country: 'Ghana' },
  { name: 'Gideon Mensah', country: 'Ghana' },
  { name: 'Baba Rahman', country: 'Ghana' },
  { name: 'Patric Pfeiffer', country: 'Ghana' },
  { name: 'Thomas Partey', country: 'Ghana' },
  { name: 'Mohammed Kudus', country: 'Ghana' },
  { name: 'Salis Abdul Samed', country: 'Ghana' },
  { name: 'Elisha Owusu', country: 'Ghana' },
  { name: 'Daniel-Kofi Kyereh', country: 'Ghana' },
  { name: 'Andre Ayew', country: 'Ghana' },
  { name: 'Majeed Ashimeru', country: 'Ghana' },
  { name: 'Mohammed Iddrisu', country: 'Ghana' },
  { name: 'Jordan Ayew', country: 'Ghana' },
  { name: 'Antoine Semenyo', country: 'Ghana' },
  { name: 'Iñaki Williams', country: 'Ghana' },
  { name: 'Ernest Nuamah', country: 'Ghana' },
  { name: 'Kamaldeen Sulemana', country: 'Ghana' },

  // Panama
  { name: 'Orlando Mosquera', country: 'Panama' },
  { name: 'Luis Mejía', country: 'Panama' },
  { name: 'José Guerra', country: 'Panama' },
  { name: 'Andrés Andrade', country: 'Panama' },
  { name: 'Michael Murillo', country: 'Panama' },
  { name: 'Edgardo Fariña', country: 'Panama' },
  { name: 'Eric Davis', country: 'Panama' },
  { name: 'Fidel Escobar', country: 'Panama' },
  { name: 'Harold Cummings', country: 'Panama' },
  { name: 'Jorge Gutiérrez', country: 'Panama' },
  { name: 'César Blackman', country: 'Panama' },
  { name: 'Carlos Harvey', country: 'Panama' },
  { name: 'José Córdoba', country: 'Panama' },
  { name: 'Aníbal Godoy', country: 'Panama' },
  { name: 'Adalberto Carrasquilla', country: 'Panama' },
  { name: 'Cristian Martínez', country: 'Panama' },
  { name: 'Édgar Bárcenas', country: 'Panama' },
  { name: 'Iván Anderson', country: 'Panama' },
  { name: 'Cecilio Waterman', country: 'Panama' },
  { name: 'Roderick Miller', country: 'Panama' },
  { name: 'Freddy Góndola', country: 'Panama' },
  { name: 'José Fajardo', country: 'Panama' },
  { name: 'Ismael Díaz', country: 'Panama' },
  { name: 'Tomás Rodríguez', country: 'Panama' },
  { name: 'Eduardo Guerrero', country: 'Panama' },
  { name: 'Azmahar Ariano', country: 'Panama' }

];

// Los tres primeros jugadores de cada país en AWARD_PLAYERS son, por convención,
// los porteros de esa selección. Esto permite filtrar el premio "Guante de Oro"
// para que únicamente puedan elegirse porteros.
const AWARD_GOALKEEPERS = (() => {
  const perCountry = new Map();
  return AWARD_PLAYERS.filter(p => {
    const seen = perCountry.get(p.country) || 0;
    perCountry.set(p.country, seen + 1);
    return seen < 3;
  });
})();

function getAwardPlayersFor(cfg) {
  return cfg && cfg.key === 'goldenGlove' ? AWARD_GOALKEEPERS : AWARD_PLAYERS;
}

function getFlagClass(team) {
  if (!team) return '';
  const code = FLAG_CODE[team];
  return code ? 'fi fi-'+code : '';
}

let TEAMS_BY_GROUP = {};       // {A: [{name,flag,fifa},...], B: [...]}
let GROUP_NAMES = [];
let GROUP_MATCHES_BY_GROUP = {};  // group -> official scheduled matches, sorted by kickoff
let BRACKET_R32 = [];          // [{num,slot1:{type,group,groups?},slot2:{type,...}},...]
let KO_TREE = null;            // built bracket tree for rendering
let LOADED = false;
let tpAllocation = {};         // matchNum -> third-place team name (from FIFA table)

// FIFA ranking fallback for best-third tiebreakers.
// Lower number = better ranking. Update this list whenever you want to mirror a newer
// FIFA/Coca-Cola Men's World Ranking edition. Unknown teams fall back to 999.
const FIFA_RANKING_TIEBREAK = {
  'Argentina': 1,
  'France': 2,
  'Spain': 3,
  'England': 4,
  'Brazil': 5,
  'Portugal': 6,
  'Netherlands': 7,
  'Belgium': 8,
  'Germany': 9,
  'Croatia': 10,
  'Morocco': 11,
  'Colombia': 12,
  'Uruguay': 13,
  'Mexico': 14,
  'USA': 15,
  'Senegal': 16,
  'Japan': 17,
  'Switzerland': 18,
  'Iran': 19,
  'South Korea': 20,
  'Austria': 21,
  'Australia': 22,
  'Qatar': 23,
  'Norway': 24,
  'Ecuador': 25,
  'Turkey': 26,
  'Canada': 27,
  'Sweden': 28,
  'Panama': 29,
  'Egypt': 30,
  'Algeria': 31,
  'Tunisia': 32,
  'Paraguay': 33,
  'Ivory Coast': 34,
  'Saudi Arabia': 35,
  'Scotland': 36,
  'Bosnia & Herzegovina': 37,
  'Czech Republic': 38,
  'Iraq': 39,
  'Uzbekistan': 40,
  'Jordan': 41,
  'DR Congo': 42,
  'South Africa': 43,
  'Cape Verde': 44,
  'New Zealand': 45,
  'Haiti': 46,
  'Curaçao': 47
};

function getTeamConductScore(team) {
  // The app does not ask for yellow/red cards, so every team is neutral by default.
  // If you later add cards, store a numeric conduct score here; higher wins.
  return state.teamConduct?.[team] ?? 0;
}

function getTeamFifaRank(team) {
  return FIFA_RANKING_TIEBREAK[team] ?? 999;
}

function compareBestThirdsByRanking(a, b) {
  // Sin resultados exactos de partidos solo nos quedan los rankings FIFA y
  // la letra del grupo. Sirve como orden por defecto cuando el usuario aún no
  // ha confirmado el orden de los mejores terceros.
  return (getTeamFifaRank(a.team) - getTeamFifaRank(b.team)) ||
    a.group.localeCompare(b.group);
}

function getAllThirdPlaceCandidates() {
  // Tercer puesto que cada grupo (con orden confirmado) tiene a día de hoy.
  return GROUP_NAMES
    .map(group => ({ group, team: state.groups[group]?.[2] || null }))
    .filter(item => item.team);
}

function ensureThirdPlaceRanking() {
  // Mantén state.thirdPlace sincronizado con los terceros vigentes de cada
  // grupo. Conserva el orden que el usuario haya arrastrado para los equipos
  // que sigan siendo terceros; añade los nuevos al final y descarta los que
  // ya no lo sean.
  const candidates = getAllThirdPlaceCandidates();
  const validSet = new Set(candidates.map(c => c.team));
  const existing = (state.thirdPlace || []).filter(team => validSet.has(team));
  const existingSet = new Set(existing);

  // Añade nuevos terceros respetando un orden estable: por ranking FIFA y
  // luego letra del grupo.
  const missing = candidates
    .filter(item => !existingSet.has(item.team))
    .sort(compareBestThirdsByRanking)
    .map(item => item.team);

  state.thirdPlace = [...existing, ...missing];

  if (state.thirdPlace.length < candidates.length) state.thirdPlaceConfirmed = false;
}

function getQualifiedThirdPlaceTeams() {
  // Los 8 primeros del ranking del usuario son los que pasan a 1/16.
  ensureThirdPlaceRanking();
  return state.thirdPlace.slice(0, 8);
}

function buildTPAllocation() {
  tpAllocation = {};
  ensureThirdPlaceRanking();

  const qualifiedTeams = getQualifiedThirdPlaceTeams();
  if (qualifiedTeams.length !== 8) return;

  // Necesitamos saber a qué grupo pertenece cada tercero clasificado para
  // poder usar TP_TABLE, exactamente igual que antes.
  const candidates = getAllThirdPlaceCandidates();
  const groupByTeam = {};
  candidates.forEach(item => { groupByTeam[item.team] = item.group; });

  const byGroup = {};
  qualifiedTeams.forEach(team => {
    const g = groupByTeam[team];
    if (g) byGroup[g] = team;
  });

  if (Object.keys(byGroup).length !== 8) return;

  const groups = Object.keys(byGroup).sort();
  const key = groups.join("");
  const order = TP_TABLE[key];

  if (!order) {
    console.warn("No TP_TABLE mapping found for:", key, groups);
    return;
  }

  TP_COLUMNS.forEach((matchNum, index) => {
    const group = String(order[index]).replace(/^3/, "");
    tpAllocation[matchNum] = byGroup[group] || null;
  });
}

// ---- State ----
let state = {
  groups: {},
  groupsConfirmed: {},      // group letter -> boolean, true cuando el usuario haya confirmado la ordenación
  thirdPlace: [],           // Ranking elegido por el usuario de los 12 terceros (top 8 clasifican)
  thirdPlaceConfirmed: false,
  matchTeams: {},           // matchId -> { team1, team2 }
  knockoutResults: {},      // matchId -> winner team name
  awards: emptyAwardsState()
};

const LOCAL_STORAGE_VERSION = '6';
const LOCAL_STORAGE_VERSION_KEY = 'wc2026_version';
const LOCAL_STORAGE_PICKS_KEY = 'wc2026_picks';
let localSaveTimer = null;

function normalizeLoadedState() {
  ensureGroupsInitialized();
  buildTPAllocation();
  computeMatchTeams();
}

function saveLocalPredictionNow() {
  try {
    const payload = buildPayload();
    payload._localDraftSavedAt = new Date().toISOString();
    localStorage.setItem(LOCAL_STORAGE_PICKS_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn('Could not save local prediction draft:', e);
  }
}

function saveLocalPredictionSoon() {
  clearTimeout(localSaveTimer);
  localSaveTimer = setTimeout(saveLocalPredictionNow, 250);
}

function clearLocalPrediction() {
  clearTimeout(localSaveTimer);
  try { localStorage.removeItem(LOCAL_STORAGE_PICKS_KEY); } catch (e) {}
}

function restoreLocalPrediction() {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_PICKS_KEY);
    if (!saved) return false;

    const data = JSON.parse(saved);

    if (data.groups) {
      GROUP_NAMES.forEach(g => {
        if (Array.isArray(data.groups[g]) && data.groups[g].length) {
          state.groups[g] = data.groups[g].slice();
        }
      });
    }

    if (data.groupsConfirmed) {
      GROUP_NAMES.forEach(g => {
        if (data.groupsConfirmed[g]) state.groupsConfirmed[g] = true;
      });
    }

    if (Array.isArray(data.thirdPlace) && data.thirdPlace.length) {
      state.thirdPlace = data.thirdPlace.slice();
      state.thirdPlaceConfirmed = Boolean(data.thirdPlaceConfirmed);
    }

    if (data.knockout?.matches) {
      Object.values(data.knockout.matches).flat().forEach(match => {
        if (match?.match && match?.winner) {
          state.knockoutResults[match.match] = match.winner;
        }
      });
    } else if (data.knockout) {
      ['round32','round16','quarterfinals','semifinals'].forEach(round => {
        const treeArr = KO_TREE[round] || [];
        (data.knockout[round] || []).forEach((team, index) => {
          if (treeArr[index] && team) state.knockoutResults[treeArr[index].num] = team;
        });
      });
      if (data.knockout.final && KO_TREE.final?.[0]) state.knockoutResults[KO_TREE.final[0].num] = data.knockout.final;
      if (data.knockout.thirdPlace && KO_TREE.thirdPlace?.[0]) state.knockoutResults[KO_TREE.thirdPlace[0].num] = data.knockout.thirdPlace;
    }

    if (data.awards && typeof data.awards === 'object') {
      const merged = emptyAwardsState();
      AWARDS_CONFIG.forEach(a => {
        if (typeof data.awards[a.key] === 'string') merged[a.key] = data.awards[a.key];
      });
      state.awards = merged;
    }

    normalizeLoadedState();
    return true;
  } catch (e) {
    console.warn('Could not restore local prediction draft:', e);
    clearLocalPrediction();
    return false;
  }
}

function closeAwardDropdowns() {
  // Legacy no-op kept because older dropdown code called this from global listeners.
  // Awards now use the popup picker.
}

// ---- Fetch & Parse ----
async function loadData() {
  try {
    const resp = await fetch(DATA_SRC+'/worldcup.json');
    const data = await resp.json();

    // Extract group compositions from group-stage matches (early exit at 4 teams/group)
    TEAMS_BY_GROUP = {};
    const seen = {}, done = {};
    data.matches.forEach(m => {
      const g = m.group;
      if (!g || !g.startsWith('Group ')) return;
      const letter = g.replace('Group ','');
      if (done[letter]) return;
      if (!TEAMS_BY_GROUP[letter]) TEAMS_BY_GROUP[letter] = [];
      if (!seen[letter]) seen[letter] = {};
      [m.team1, m.team2].forEach(t => {
        if (t && !seen[letter][t]) {
          seen[letter][t] = true;
          TEAMS_BY_GROUP[letter].push({ name: t, flag: '', fifa: '' });
        }
      });
      if (TEAMS_BY_GROUP[letter].length >= 4) done[letter] = true;
    });
    GROUP_NAMES = Object.keys(TEAMS_BY_GROUP).sort();

    // Official group-stage schedule from DATA_SRC, used for displaying matchdays in order
    GROUP_MATCHES_BY_GROUP = {};
    data.matches
      .filter(m => m.group && m.group.startsWith('Group '))
      .forEach((m, index) => {
        const letter = m.group.replace('Group ', '');
        if (!GROUP_MATCHES_BY_GROUP[letter]) GROUP_MATCHES_BY_GROUP[letter] = [];
        GROUP_MATCHES_BY_GROUP[letter].push({
          team1: m.team1,
          team2: m.team2,
          date: m.date || '',
          time: m.time || '',
          round: m.round || '',
          ground: m.ground || '',
          originalIndex: index,
          key: groupMatchKey(m.team1, m.team2)
        });
      });

    Object.keys(GROUP_MATCHES_BY_GROUP).forEach(group => {
      GROUP_MATCHES_BY_GROUP[group].sort((a, b) => {
        const dateCmp = String(a.date).localeCompare(String(b.date));
        if (dateCmp) return dateCmp;
        const timeCmp = String(a.time).localeCompare(String(b.time));
        if (timeCmp) return timeCmp;
        return a.originalIndex - b.originalIndex;
      });
    });

    // Initialize state groups
    GROUP_NAMES.forEach(g => {
      state.groups[g] = TEAMS_BY_GROUP[g].map(t => t.name);
    });
    ensureGroupsInitialized();

    // Build bracket using official 2026 FIFA structure
    KO_TREE = {
      round32: [
        {num:73,slot1:{type:'runner_up',group:'A'},slot2:{type:'runner_up',group:'B'}},
        {num:74,slot1:{type:'winner',group:'E'},slot2:{type:'third_place',groups:['A','B','C','D','F']}},
        {num:75,slot1:{type:'winner',group:'F'},slot2:{type:'runner_up',group:'C'}},
        {num:76,slot1:{type:'winner',group:'C'},slot2:{type:'runner_up',group:'F'}},
        {num:77,slot1:{type:'winner',group:'I'},slot2:{type:'third_place',groups:['C','D','F','G','H']}},
        {num:78,slot1:{type:'runner_up',group:'E'},slot2:{type:'runner_up',group:'I'}},
        {num:79,slot1:{type:'winner',group:'A'},slot2:{type:'third_place',groups:['C','E','F','H','I']}},
        {num:80,slot1:{type:'winner',group:'L'},slot2:{type:'third_place',groups:['E','H','I','J','K']}},
        {num:81,slot1:{type:'winner',group:'D'},slot2:{type:'third_place',groups:['B','E','F','I','J']}},
        {num:82,slot1:{type:'winner',group:'G'},slot2:{type:'third_place',groups:['A','E','H','I','J']}},
        {num:83,slot1:{type:'runner_up',group:'K'},slot2:{type:'runner_up',group:'L'}},
        {num:84,slot1:{type:'winner',group:'H'},slot2:{type:'runner_up',group:'J'}},
        {num:85,slot1:{type:'winner',group:'B'},slot2:{type:'third_place',groups:['E','F','G','I','J']}},
        {num:86,slot1:{type:'winner',group:'J'},slot2:{type:'runner_up',group:'H'}},
        {num:87,slot1:{type:'winner',group:'K'},slot2:{type:'third_place',groups:['D','E','I','J','L']}},
        {num:88,slot1:{type:'runner_up',group:'D'},slot2:{type:'runner_up',group:'G'}}
      ],
      round16: [
        {num:89,slot1:{type:'winner_of',matchNum:73},slot2:{type:'winner_of',matchNum:75}},
        {num:90,slot1:{type:'winner_of',matchNum:74},slot2:{type:'winner_of',matchNum:77}},
        {num:91,slot1:{type:'winner_of',matchNum:76},slot2:{type:'winner_of',matchNum:78}},
        {num:92,slot1:{type:'winner_of',matchNum:79},slot2:{type:'winner_of',matchNum:80}},
        {num:93,slot1:{type:'winner_of',matchNum:83},slot2:{type:'winner_of',matchNum:84}},
        {num:94,slot1:{type:'winner_of',matchNum:81},slot2:{type:'winner_of',matchNum:82}},
        {num:95,slot1:{type:'winner_of',matchNum:86},slot2:{type:'winner_of',matchNum:88}},
        {num:96,slot1:{type:'winner_of',matchNum:85},slot2:{type:'winner_of',matchNum:87}}
      ],
      quarterfinals: [
        {num:97,slot1:{type:'winner_of',matchNum:89},slot2:{type:'winner_of',matchNum:90}},
        {num:98,slot1:{type:'winner_of',matchNum:93},slot2:{type:'winner_of',matchNum:94}},
        {num:99,slot1:{type:'winner_of',matchNum:91},slot2:{type:'winner_of',matchNum:92}},
        {num:100,slot1:{type:'winner_of',matchNum:95},slot2:{type:'winner_of',matchNum:96}}
      ],
      semifinals: [
        {num:101,slot1:{type:'winner_of',matchNum:97},slot2:{type:'winner_of',matchNum:98}},
        {num:102,slot1:{type:'winner_of',matchNum:99},slot2:{type:'winner_of',matchNum:100}}
      ],
      thirdPlace: [
        {num:103,slot1:{type:'loser_of',matchNum:101},slot2:{type:'loser_of',matchNum:102}}
      ],
      final: [
        {num:104,slot1:{type:'winner_of',matchNum:101},slot2:{type:'winner_of',matchNum:102}}
      ]
    };
    BRACKET_R32 = KO_TREE.round32;
    LOADED = true;
    return true;
  } catch(e) {
    console.error('Failed to load tournament data:', e);
    showToast('No hay manera de cargar los datos del Mundial. Revisa la conexión (¿otra vez la VPN, en serio?).', true);
    return false;
  }
}

function findTeamGroup(teamName) {
  for (const g of GROUP_NAMES) {
    if (state.groups[g] && state.groups[g].includes(teamName)) return g;
  }
  return TEAMS_BY_GROUP ? Object.keys(TEAMS_BY_GROUP).find(g => TEAMS_BY_GROUP[g].some(t=>t.name===teamName)) : null;
}

function getTeamFlagClass(teamName) { return getFlagClass(teamName); }

// Helpers de partido conservados para compatibilidad: el resto de la app ya no
// se basa en resultados exactos, pero el bracket se sigue beneficiando de los
// metadatos (fechas, jornada, etc.) del fixture oficial si quisiéramos volver
// a mostrarlos.
function groupMatchKey(team1, team2) {
  return [team1, team2].sort().join('__');
}

function getGroupMatchList(group) {
  if (GROUP_MATCHES_BY_GROUP[group] && GROUP_MATCHES_BY_GROUP[group].length) {
    return GROUP_MATCHES_BY_GROUP[group];
  }
  const teams = (TEAMS_BY_GROUP[group] || []).map(t => t.name);
  const matches = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({ team1: teams[i], team2: teams[j], key: groupMatchKey(teams[i], teams[j]), date: '', time: '', round: '', ground: '' });
    }
  }
  return matches;
}

function formatMatchDate(match) {
  if (!match.date) return '';
  const date = new Date(match.date + 'T00:00:00');
  if (Number.isNaN(date.getTime())) return match.date;
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', '').toUpperCase();
}

function getMatchdayNumber(match, fallback) {
  const found = String(match.round || '').match(/\d+/);
  return found ? found[0] : String(fallback + 1);
}

function ensureGroupsInitialized() {
  if (!state.groups) state.groups = {};
  if (!state.groupsConfirmed) state.groupsConfirmed = {};

  GROUP_NAMES.forEach(group => {
    const teams = (TEAMS_BY_GROUP[group] || []).map(t => t.name);
    const current = Array.isArray(state.groups[group]) ? state.groups[group] : [];
    const valid = current.filter(t => teams.includes(t));
    const missing = teams.filter(t => !valid.includes(t));
    state.groups[group] = [...valid, ...missing];
  });

  // El ranking de mejores terceros depende de los terceros vigentes.
  ensureThirdPlaceRanking();
}

function calculateGroupStandings(group) {
  // Sin marcadores exactos no hay puntos reales; devolvemos una "tabla"
  // sintética en el orden que el usuario haya colocado (o, si aún no lo ha
  // hecho, el orden por defecto en el que vienen los equipos).
  ensureGroupsInitialized();
  const order = state.groups[group] || (TEAMS_BY_GROUP[group] || []).map(t => t.name);
  return order.map((team, index) => ({
    team,
    index,
    pts: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    played: 0,
    wins: 0
  }));
}

function isGroupComplete(group) {
  return Boolean(state.groupsConfirmed && state.groupsConfirmed[group]);
}

function moveArrayItem(arr, from, to) {
  if (from === to || from < 0 || to < 0 || from >= arr.length || to >= arr.length) return arr;
  const copy = arr.slice();
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

// Helper genérico de drag-and-drop para listas ordenables verticalmente.
// Llama a `onReorder(fromIndex, toIndex)` cuando el usuario suelta.
// Funciona con HTML5 DnD (escritorio) y con touchstart/move/end (móvil).
function attachSortable(container, itemSelector, onReorder) {
  let dragIndex = null;
  let touchDragEl = null;
  let touchPlaceholder = null;
  let touchStartY = 0;
  let touchStartTop = 0;

  function items() {
    return Array.from(container.querySelectorAll(itemSelector));
  }

  function indexOf(el) {
    return items().indexOf(el);
  }

  items().forEach(item => {
    item.setAttribute('draggable', 'true');
    item.classList.add('sortable-item');

    item.addEventListener('dragstart', e => {
      dragIndex = indexOf(item);
      item.classList.add('sortable-dragging');
      try { e.dataTransfer.setData('text/plain', String(dragIndex)); } catch (err) {}
      if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('sortable-dragging');
      items().forEach(el => el.classList.remove('sortable-over'));
      dragIndex = null;
    });

    item.addEventListener('dragover', e => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
      item.classList.add('sortable-over');
    });

    item.addEventListener('dragleave', () => {
      item.classList.remove('sortable-over');
    });

    item.addEventListener('drop', e => {
      e.preventDefault();
      item.classList.remove('sortable-over');
      const fromIdx = dragIndex;
      const toIdx = indexOf(item);
      if (fromIdx === null || fromIdx === toIdx || fromIdx < 0 || toIdx < 0) return;
      onReorder(fromIdx, toIdx);
    });

    // --- Soporte táctil básico ---
    item.addEventListener('touchstart', e => {
      if (e.touches.length !== 1) return;
      dragIndex = indexOf(item);
      touchDragEl = item;
      touchStartY = e.touches[0].clientY;
      touchStartTop = item.getBoundingClientRect().top;
      item.classList.add('sortable-dragging');
    }, { passive: true });

    item.addEventListener('touchmove', e => {
      if (!touchDragEl || e.touches.length !== 1) return;
      const y = e.touches[0].clientY;
      const dy = y - touchStartY;
      touchDragEl.style.transform = `translateY(${dy}px)`;
      // Resalta el elemento bajo el dedo
      const otherEls = items();
      const targetEl = document.elementFromPoint(e.touches[0].clientX, y);
      otherEls.forEach(el => el.classList.toggle('sortable-over', el !== touchDragEl && el.contains(targetEl)));
      e.preventDefault();
    }, { passive: false });

    item.addEventListener('touchend', e => {
      if (!touchDragEl) return;
      const endY = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : touchStartY;
      const targetEl = document.elementFromPoint(
        (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : 0,
        endY
      );
      const otherEls = items();
      let toIdx = -1;
      otherEls.forEach((el, idx) => {
        if (el !== touchDragEl && el.contains(targetEl)) toIdx = idx;
      });

      touchDragEl.style.transform = '';
      touchDragEl.classList.remove('sortable-dragging');
      otherEls.forEach(el => el.classList.remove('sortable-over'));
      const fromIdx = dragIndex;
      touchDragEl = null;
      dragIndex = null;

      if (toIdx >= 0 && fromIdx !== null && fromIdx !== toIdx) {
        onReorder(fromIdx, toIdx);
      }
    });
  });

  container.addEventListener('dragover', e => e.preventDefault());
}

function openGroupResultsModal(group) {
  ensureGroupsInitialized();

  const modal = document.getElementById('predictionModal');
  const viewer = document.getElementById('predictionViewer');
  modal.style.display = 'flex';

  const initialOrder = (state.groups[group] || []).slice();
  let draft = initialOrder.slice();

  viewer.innerHTML = `
    <div class="group-results-editor group-order-editor">
      <h3>GRUPO ${group}</h3>
      <p class="group-modal-info">Arrastra (o usa las flechas ▲▼) para predecir el orden final del grupo. <strong>1º y 2º pasan directos a dieciseisavos</strong> · <strong>3º entra al sorteo de mejores terceros</strong> · <strong>4º queda eliminado</strong>.</p>
      <div class="group-order-list" id="groupOrderList"></div>
      <div class="group-modal-actions">
        <button type="button" class="toolbar-btn" id="cancelGroupResults">Cerrar</button>
        <button type="button" class="submit-btn" id="saveGroupResults">Guardar</button>
      </div>
    </div>
  `;

  const list = viewer.querySelector('#groupOrderList');

  function fateLabel(idx) {
    if (idx === 0) return { txt: 'Pasa como 1º', cls: 'fate-qualified' };
    if (idx === 1) return { txt: 'Pasa como 2º', cls: 'fate-qualified' };
    if (idx === 2) return { txt: 'Mejor tercero (sorteo)', cls: 'fate-third' };
    return { txt: 'Eliminado', cls: 'fate-out' };
  }

  function redraw() {
    list.innerHTML = '';
    draft.forEach((team, idx) => {
      const fate = fateLabel(idx);
      const row = document.createElement('div');
      row.className = 'group-team pos-' + (idx + 1) + (idx === 3 ? ' eliminated' : '') + (idx === 2 ? ' qualified-third' : '');
      row.dataset.index = String(idx);
      row.innerHTML = `
        <span class="position-badge">${idx + 1}</span>
        <span class="team-flag ${getTeamFlagClass(team)}"></span>
        <span class="team-name">${escapeHtml(team)}</span>
        <span class="group-team-fate ${fate.cls}">${fate.txt}</span>
        <span class="move-btns">
          <button type="button" class="move-up" aria-label="Subir" ${idx === 0 ? 'disabled' : ''}>▲</button>
          <button type="button" class="move-down" aria-label="Bajar" ${idx === draft.length - 1 ? 'disabled' : ''}>▼</button>
        </span>
      `;
      list.appendChild(row);
    });

    list.querySelectorAll('.move-up').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        draft = moveArrayItem(draft, idx, idx - 1);
        redraw();
      });
    });
    list.querySelectorAll('.move-down').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        draft = moveArrayItem(draft, idx, idx + 1);
        redraw();
      });
    });

    attachSortable(list, '.group-team', (fromIdx, toIdx) => {
      draft = moveArrayItem(draft, fromIdx, toIdx);
      redraw();
    });
  }

  redraw();

  document.getElementById('cancelGroupResults').addEventListener('click', closePredictionModal);
  document.getElementById('saveGroupResults').addEventListener('click', () => {
    const previousMatchTeams = cloneMatchTeamsSnapshot();
    state.groups[group] = draft.slice();
    state.groupsConfirmed[group] = true;
    ensureThirdPlaceRanking();
    buildTPAllocation();
    computeMatchTeams();
    cleanupKnockoutAfterGroupChange(previousMatchTeams);
    closePredictionModal();
    renderAll();
    saveLocalPredictionSoon();
  });
}


// ---- Compute match teams from group picks ----
function getSlotTeam(ref) {
  if (!ref) return null;
  if (ref.type === 'winner') return state.groups[ref.group] ? state.groups[ref.group][0] : null;
  if (ref.type === 'runner_up') return state.groups[ref.group] ? state.groups[ref.group][1] : null;
  if (ref.type === 'third_place') return tpAllocation[ref._matchNum] || null;
  if (ref.type === 'winner_of') return state.knockoutResults[ref.matchNum] || null;
  if (ref.type === 'loser_of') {
    const m = state.matchTeams[ref.matchNum];
    const w = state.knockoutResults[ref.matchNum];
    if (!m || !w) return null;
    return m.team1 === w ? m.team2 : m.team1;
  }
  return null;
}

function computeMatchTeams() {
  state.matchTeams = {};

  // R32: resolve from group picks + TP allocation
  KO_TREE.round32.forEach(m => {
    state.matchTeams[m.num] = {
      team1: getSlotTeam(Object.assign({}, m.slot1, {_matchNum: m.num})),
      team2: getSlotTeam(Object.assign({}, m.slot2, {_matchNum: m.num}))
    };
  });

  // R16: resolve winners
  (KO_TREE.round16 || []).forEach(m => {
    state.matchTeams[m.num] = {
      team1: getSlotTeam(m.slot1),
      team2: getSlotTeam(m.slot2)
    };
  });

  // QF
  (KO_TREE.quarterfinals || []).forEach(m => {
    state.matchTeams[m.num] = {
      team1: getSlotTeam(m.slot1),
      team2: getSlotTeam(m.slot2)
    };
  });

  // SF
  (KO_TREE.semifinals || []).forEach(m => {
    state.matchTeams[m.num] = {
      team1: getSlotTeam(m.slot1),
      team2: getSlotTeam(m.slot2)
    };
  });

  // Final
  if (KO_TREE.final && KO_TREE.final[0]) {
    const m = KO_TREE.final[0];
    state.matchTeams[m.num] = {
      team1: getSlotTeam(m.slot1),
      team2: getSlotTeam(m.slot2)
    };
  }

  // Third place
  if (KO_TREE.thirdPlace && KO_TREE.thirdPlace[0]) {
    const m = KO_TREE.thirdPlace[0];
    state.matchTeams[m.num] = {
      team1: getSlotTeam(m.slot1),
      team2: getSlotTeam(m.slot2)
    };
  }
}



// ---- Toast / Loading / Confetti ----
function showToast(msg, error) {
  const c = document.getElementById('toastContainer');
  const d = document.createElement('div');
  d.className = error ? 'error-toast' : 'success-toast';
  d.textContent = msg;
  c.appendChild(d);
  setTimeout(() => d.remove(), 3500);
}

function showLoading(msg) {
  document.getElementById('loadingOverlay').style.display = 'flex';
  document.getElementById('loadingText').textContent = msg || 'Cargando...';
}
function hideLoading() {
  document.getElementById('loadingOverlay').style.display = 'none';
}

function fireConfetti() {
  const colors = ['#FFD700','#FF6B6B','#4CAF50','#64B5F6','#FF8A65','#BA68C8','#FFF176'];
  const c = document.getElementById('confettiContainer');
  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random()*100+'%';
    p.style.width = (6+Math.random()*10)+'px';
    p.style.height = (6+Math.random()*10)+'px';
    p.style.background = colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDuration = (2+Math.random()*3)+'s';
    p.style.animationDelay = Math.random()*0.5+'s';
    c.appendChild(p);
    setTimeout(() => p.remove(), 4000);
  }
}

// ---- Render Group Stage ----
function renderGroups() {
  ensureGroupsInitialized();

  const grid = document.getElementById('groupsGrid');
  grid.innerHTML = '';
  const qualifiedThirds = new Set(getQualifiedThirdPlaceTeams());

  GROUP_NAMES.forEach(g => {
    const complete = isGroupComplete(g);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'group-card group-card-clickable' + (complete ? ' group-complete' : ' group-empty');
    card.title = complete ? 'Editar orden del grupo ' + g : 'Predecir orden del grupo ' + g;

    const h3 = document.createElement('h3');
    h3.textContent = 'Group ' + g;
    card.appendChild(h3);

    const standings = calculateGroupStandings(g);
    standings.forEach((stat, idx) => {
      const team = stat.team;
      const isThird = idx === 2;
      const isFourth = idx === 3;
      const thirdQualified = complete && state.thirdPlaceConfirmed && qualifiedThirds.has(team);
      const eliminated = isFourth || (isThird && complete && state.thirdPlaceConfirmed && !qualifiedThirds.has(team));

      const row = document.createElement('div');
      row.className =
        'group-team pos-' + (idx + 1) +
        (eliminated ? ' eliminated' : '') +
        (isThird && thirdQualified ? ' qualified-third' : '') +
        (!complete ? ' group-team-unconfirmed' : '');

      const badge = document.createElement('span');
      badge.className = 'position-badge';
      badge.textContent = idx + 1;
      row.appendChild(badge);

      const flag = document.createElement('span');
      flag.className = 'team-flag ' + getTeamFlagClass(team);
      row.appendChild(flag);

      const name = document.createElement('span');
      name.className = 'team-name';
      name.textContent = team;
      row.appendChild(name);

      card.appendChild(row);
    });

    const hint = document.createElement('div');
    hint.className = 'group-card-hint';
    hint.textContent = complete ? '✏️ Editar orden' : '👉 Ordenar grupo';
    card.appendChild(hint);

    card.addEventListener('click', () => openGroupResultsModal(g));
    grid.appendChild(card);
  });
}

// ---- Render Best Thirds Panel ----
function renderBestThirds() {
  const container = document.getElementById('bestThirdsPanel');
  if (!container) return;

  ensureThirdPlaceRanking();
  container.innerHTML = '';

  const allConfirmed = GROUP_NAMES.every(g => isGroupComplete(g));
  const candidates = getAllThirdPlaceCandidates();

  if (!allConfirmed || candidates.length < GROUP_NAMES.length) {
    const note = document.createElement('p');
    note.className = 'note-text best-thirds-note';
    note.innerHTML = `Confirma el orden de los <strong>${GROUP_NAMES.length}</strong> grupos para poder ordenar los mejores terceros (ahora mismo confirmados: <strong>${GROUP_NAMES.filter(isGroupComplete).length}/${GROUP_NAMES.length}</strong>).`;
    container.appendChild(note);
    return;
  }

  const panel = document.createElement('div');
  panel.className = 'best-thirds-panel';
  panel.innerHTML = `
    <div class="best-thirds-status">
      ${state.thirdPlaceConfirmed
        ? '<span class="best-thirds-confirmed">✅ Ranking confirmado</span>'
        : '<span class="best-thirds-pending">⚠️ Pendiente de confirmar — arrastra los equipos y pulsa "Confirmar".</span>'}
    </div>
    <div class="best-thirds-list" id="bestThirdsList"></div>
    <div class="best-thirds-actions">
      <button type="button" class="toolbar-btn" id="bestThirdsAutoBtn">⚡ Orden automático (ranking FIFA)</button>
      <button type="button" class="submit-btn" id="bestThirdsConfirmBtn">✅ Confirmar ranking</button>
    </div>
  `;
  container.appendChild(panel);

  const list = panel.querySelector('#bestThirdsList');
  const groupByTeam = {};
  candidates.forEach(c => { groupByTeam[c.team] = c.group; });

  function renderList() {
    list.innerHTML = '';
    state.thirdPlace.forEach((team, idx) => {
      const qualifies = idx < 8;
      const row = document.createElement('div');
      row.className = 'best-third-row' + (qualifies ? ' best-third-qualified' : ' best-third-eliminated');
      row.dataset.team = team;
      row.innerHTML = `
        <span class="best-third-rank">${idx + 1}</span>
        <span class="best-third-status">${qualifies ? '✅' : '❌'}</span>
        <span class="team-flag ${getTeamFlagClass(team)}"></span>
        <span class="best-third-name">${escapeHtml(team)}</span>
        <span class="best-third-group">(3º Grupo ${groupByTeam[team] || '?'})</span>
        <span class="move-btns">
          <button type="button" class="move-up" aria-label="Subir" ${idx === 0 ? 'disabled' : ''}>▲</button>
          <button type="button" class="move-down" aria-label="Bajar" ${idx === state.thirdPlace.length - 1 ? 'disabled' : ''}>▼</button>
        </span>
      `;
      list.appendChild(row);
    });

    list.querySelectorAll('.move-up').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        state.thirdPlace = moveArrayItem(state.thirdPlace, idx, idx - 1);
        state.thirdPlaceConfirmed = false;
        renderAll();
        saveLocalPredictionSoon();
      });
    });
    list.querySelectorAll('.move-down').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        state.thirdPlace = moveArrayItem(state.thirdPlace, idx, idx + 1);
        state.thirdPlaceConfirmed = false;
        renderAll();
        saveLocalPredictionSoon();
      });
    });

    attachSortable(list, '.best-third-row', (fromIdx, toIdx) => {
      const previousMatchTeams = cloneMatchTeamsSnapshot();
      state.thirdPlace = moveArrayItem(state.thirdPlace, fromIdx, toIdx);
      state.thirdPlaceConfirmed = false;
      buildTPAllocation();
      computeMatchTeams();
      cleanupKnockoutAfterGroupChange(previousMatchTeams);
      renderAll();
      saveLocalPredictionSoon();
    });
  }

  renderList();

  panel.querySelector('#bestThirdsAutoBtn').addEventListener('click', () => {
    const previousMatchTeams = cloneMatchTeamsSnapshot();
    state.thirdPlace = candidates
      .slice()
      .sort(compareBestThirdsByRanking)
      .map(c => c.team);
    state.thirdPlaceConfirmed = false;
    buildTPAllocation();
    computeMatchTeams();
    cleanupKnockoutAfterGroupChange(previousMatchTeams);
    renderAll();
    saveLocalPredictionSoon();
  });

  panel.querySelector('#bestThirdsConfirmBtn').addEventListener('click', () => {
    const previousMatchTeams = cloneMatchTeamsSnapshot();
    state.thirdPlaceConfirmed = true;
    buildTPAllocation();
    computeMatchTeams();
    cleanupKnockoutAfterGroupChange(previousMatchTeams);
    renderAll();
    saveLocalPredictionSoon();
    showToast('Mejores terceros confirmados.');
  });
}

// ---- Render Third Place (legacy compact summary, optional) ----
function renderThirdPlace() {
  const container = document.getElementById('thirdPlacePicks');
  if (!container) return;

  ensureThirdPlaceRanking();
  container.innerHTML = '';

  const picked = getQualifiedThirdPlaceTeams();
  if (picked.length === 0) {
    container.innerHTML = '<p class="note-text">Aparecerán aquí cuando confirmes el orden de todos los grupos.</p>';
    return;
  }

  picked.forEach((team, i) => {
    const tag = document.createElement('span');
    tag.className = 'third-pick-tag';
    tag.innerHTML = '<span class="third-pick-num">'+(i+1)+'</span> ' +
      '<span class="'+getTeamFlagClass(team)+'"></span> ' + team;
    container.appendChild(tag);
  });
}

// ---- Render Bracket (tournament tree) ----
function getBracketDisplayOrder() {
  const r32Order = [];
  const r16Order = [];
  const qfOrder = [];

  KO_TREE.semifinals.forEach(sf => {
    [sf.slot1.matchNum, sf.slot2.matchNum].forEach(qfNum => {
      const qfIdx = KO_TREE.quarterfinals.findIndex(m => m.num === qfNum);
      if (qfIdx !== -1) {
        qfOrder.push(qfIdx);

        const qf = KO_TREE.quarterfinals[qfIdx];
        [qf.slot1.matchNum, qf.slot2.matchNum].forEach(r16Num => {
          const r16Idx = KO_TREE.round16.findIndex(m => m.num === r16Num);
          if (r16Idx !== -1) {
            r16Order.push(r16Idx);

            const r16 = KO_TREE.round16[r16Idx];
            [r16.slot1.matchNum, r16.slot2.matchNum].forEach(r32Num => {
              const r32Idx = KO_TREE.round32.findIndex(m => m.num === r32Num);
              if (r32Idx !== -1) r32Order.push(r32Idx);
            });
          }
        });
      }
    });
  });

  return { r32Order, r16Order, qfOrder };
}

function renderBracket() {
  const container = document.getElementById('bracketContainer');
  container.innerHTML = '';
  if (!KO_TREE) return;

  const order = getBracketDisplayOrder();

  const SLOT_H = 46;
  const GAP = 10;
  const MATCH_GAP = 2;
  const LABEL_H = 32;
  const COL_W = 170;
  const CONN_W = 58;

  const MATCH_H = SLOT_H * 2 + MATCH_GAP;
  const STEP = MATCH_H + GAP;

  const cols = [
    10,
    COL_W + CONN_W,
    COL_W * 2 + CONN_W * 2,
    COL_W * 3 + CONN_W * 3,
    COL_W * 4 + CONN_W * 4
  ];

  function matchData(treeArr, ord) {
    return (ord || treeArr.map((_, i) => i)).map(i => {
      const m = treeArr[i];
      const mt = state.matchTeams[m.num] || {};
      return {
        team1: mt.team1,
        team2: mt.team2,
        winner: state.knockoutResults[m.num] || null,
        num: m.num
      };
    });
  }

  const r32 = matchData(KO_TREE.round32, order.r32Order);
  const r16 = matchData(KO_TREE.round16, order.r16Order);
  const qf = matchData(KO_TREE.quarterfinals, order.qfOrder);
  const sf = matchData(KO_TREE.semifinals);

  const r32Tree = order.r32Order.map(i => KO_TREE.round32[i]);
  const r16Tree = order.r16Order.map(i => KO_TREE.round16[i]);
  const qfTree = order.qfOrder.map(i => KO_TREE.quarterfinals[i]);
  const sfTree = KO_TREE.semifinals;

  const finMatch = KO_TREE.final ? KO_TREE.final[0] : null;
  const finNum = finMatch ? finMatch.num : 104;
  const finMt = state.matchTeams[finNum] || {};
  const finalMatch = {
    team1: finMt.team1,
    team2: finMt.team2,
    winner: state.knockoutResults[finNum] || null,
    num: finNum
  };

  const thirdMatchDef = KO_TREE.thirdPlace ? KO_TREE.thirdPlace[0] : null;
  const thirdNum = thirdMatchDef ? thirdMatchDef.num : 103;
  const thirdMt = state.matchTeams[thirdNum] || {};
  const thirdMatch = {
    team1: thirdMt.team1,
    team2: thirdMt.team2,
    winner: state.knockoutResults[thirdNum] || null,
    num: thirdNum
  };

  const r32Tops = r32.map((_, i) => LABEL_H + i * STEP);

  function centerOf(top) {
    return top + SLOT_H;
  }

  function buildTops(dstTree, srcTree, srcTops) {
    return dstTree.map(dst => {
      const s1i = srcTree.findIndex(s => s.num === dst.slot1.matchNum);
      const s2i = srcTree.findIndex(s => s.num === dst.slot2.matchNum);

      if (s1i === -1 || s2i === -1) {
        return LABEL_H;
      }

      const c1 = centerOf(srcTops[s1i]);
      const c2 = centerOf(srcTops[s2i]);

      return ((c1 + c2) / 2) - SLOT_H;
    });
  }

  const r16Tops = buildTops(r16Tree, r32Tree, r32Tops);
  const qfTops = buildTops(qfTree, r16Tree, r16Tops);
  const sfTops = buildTops(sfTree, qfTree, qfTops);

  let finalTop = LABEL_H;
  if (sfTops.length === 2) {
    finalTop = ((centerOf(sfTops[0]) + centerOf(sfTops[1])) / 2) - SLOT_H;
  }

  // El partido por el 3er puesto vive entre las dos semifinales, en la
  // misma columna de semis. La final se queda a la derecha como siempre.
  const thirdTop = finalTop;

  const maxH = LABEL_H + r32.length * STEP + 40;

  const wrapper = document.createElement('div');
  wrapper.style.cssText =
    'position:relative;height:' + maxH + 'px;min-width:' + (COL_W * 5 + CONN_W * 4 + 40) + 'px';

  ['Dieciseisavos', 'Octavos', 'Cuartos', 'Semis', 'Final'].forEach((lbl, i) => {
    const l = document.createElement('div');
    l.className = 'bracket-round-label';
    l.style.cssText =
      'position:absolute;top:2px;left:' + cols[i] + 'px;width:' + COL_W + 'px;text-align:center;';
    l.textContent = lbl;
    wrapper.appendChild(l);
  });

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', maxH);
  svg.style.cssText =
    'position:absolute;top:0;left:0;pointer-events:none;z-index:1;';

  function mkPath(d) {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    p.setAttribute('stroke', '#81C784');
    p.setAttribute('stroke-width', '2');
    p.setAttribute('fill', 'none');
    return p;
  }

  function connect(srcTree, srcTops, dstTree, dstTops, srcLeft, dstLeft) {
    const sx = srcLeft + COL_W - 6;
    const dx = dstLeft + 3;
    const mx = sx + (dx - sx) / 2;

    dstTree.forEach((dst, di) => {
      const s1i = srcTree.findIndex(s => s.num === dst.slot1.matchNum);
      const s2i = srcTree.findIndex(s => s.num === dst.slot2.matchNum);
      if (s1i === -1 || s2i === -1) return;

      const y1 = centerOf(srcTops[s1i]);
      const y2 = centerOf(srcTops[s2i]);
      const yd = centerOf(dstTops[di]);

      svg.appendChild(mkPath(`M${sx},${y1} L${mx},${y1} L${mx},${yd} L${dx},${yd}`));
      svg.appendChild(mkPath(`M${sx},${y2} L${mx},${y2} L${mx},${yd} L${dx},${yd}`));
    });
  }

  function connectSemisToFinal() {
    if (sfTree.length !== 2) return;

    const sx = cols[3] + COL_W - 6;
    const dx = cols[4] + 3;
    const mx = sx + (dx - sx) / 2;
    const yd = centerOf(finalTop);

    sfTops.forEach(top => {
      const y = centerOf(top);
      svg.appendChild(mkPath(`M${sx},${y} L${mx},${y} L${mx},${yd} L${dx},${yd}`));
    });
  }

  function connectSemisToThirdPlace() {
    if (sfTops.length !== 2 || !thirdMatchDef) return;

    const x = cols[3] + (COL_W / 2) - 3;
    const upperBottom = sfTops[0] + MATCH_H;
    const lowerTop = sfTops[1];
    const thirdTopEdge = thirdTop - 6;
    const thirdBottomEdge = thirdTop + MATCH_H + 6;

    if (upperBottom < thirdTopEdge) {
      const p1 = mkPath(`M${x},${upperBottom} L${x},${thirdTopEdge}`);
      p1.setAttribute('stroke-width', '2');
      svg.appendChild(p1);
    }

    if (thirdBottomEdge < lowerTop) {
      const p2 = mkPath(`M${x},${thirdBottomEdge} L${x},${lowerTop}`);
      p2.setAttribute('stroke-width', '2');
      svg.appendChild(p2);
    }
  }

  wrapper.appendChild(svg);

  function slotDiv(team, isWinner, matchNum, slotNum, top, left, extraClass) {
  const hasTeam = Boolean(team);
  const winner = state.knockoutResults[matchNum] || null;
  const isRealWinner = hasTeam && winner && team === winner;
  const isLoser = hasTeam && winner && team !== winner;


  const d = document.createElement('div');

  d.className =
    'bracket-slot' +
    (hasTeam ? ' has-team' : ' empty-slot') +
    (isRealWinner ? ' winner' : '') +
    (isLoser ? ' loser' : '') +
    (extraClass ? ' ' + extraClass : '');

  d.style.cssText =
    'position:absolute;top:' + top + 'px;left:' + left + 'px;width:' + (COL_W - 6) + 'px;z-index:2;';

  d.innerHTML =
    '<span class="slot-flag ' + getFlagClass(team) + '"></span>' +
    '<span class="slot-name">' + (team || '---') + '</span>' +
    '<button class="slot-clear">×</button>';

  d.addEventListener('click', () => {
  const match = state.matchTeams[matchNum] || {};
  const hasBothTeams = Boolean(match.team1 && match.team2);

  if (!hasBothTeams) {
    return;
  }

  const previousWinner = state.knockoutResults[matchNum] || null;

  pickWinner(matchNum, slotNum);

  setTimeout(() => {
    const pickedEl = document.querySelector(
      `.bracket-slot[data-match="${matchNum}"][data-slot="${slotNum}"]`
    );

    if (pickedEl) {
      pickedEl.classList.remove('just-picked');
      void pickedEl.offsetWidth;
      pickedEl.classList.add('just-picked');
    }
  }, 0);
});

  d.dataset.match = matchNum;
  d.dataset.slot = slotNum;

  d.querySelector('.slot-clear').addEventListener('click', e => {
    e.stopPropagation();
    clearKnockoutAndRender(team);
  });

  return d;
}

  function drawRound(matches, tops, colIdx) {
    const left = cols[colIdx];

    matches.forEach((m, i) => {
      const top = tops[i];

      wrapper.appendChild(
        slotDiv(m.team1, m.winner === m.team1, m.num, 1, top, left, '')
      );

      wrapper.appendChild(
        slotDiv(m.team2, m.winner === m.team2, m.num, 2, top + SLOT_H, left, '')
      );
    });
  }

  connect(r32Tree, r32Tops, r16Tree, r16Tops, cols[0], cols[1]);
  connect(r16Tree, r16Tops, qfTree, qfTops, cols[1], cols[2]);
  connect(qfTree, qfTops, sfTree, sfTops, cols[2], cols[3]);
  connectSemisToFinal();
  connectSemisToThirdPlace();

  drawRound(r32, r32Tops, 0);
  drawRound(r16, r16Tops, 1);
  drawRound(qf, qfTops, 2);
  drawRound(sf, sfTops, 3);

  if (thirdMatchDef) {
    const thirdLabel = document.createElement('div');
    thirdLabel.className = 'bracket-round-label';
    thirdLabel.style.cssText =
      'position:absolute;top:' + Math.max(LABEL_H, thirdTop - 26) + 'px;left:' + cols[3] + 'px;width:' + COL_W + 'px;text-align:center;color:#2E7D32;z-index:3;';
    thirdLabel.textContent = '3er puesto';
    wrapper.appendChild(thirdLabel);

    const thirdWinner = thirdMatch.winner || null;
    wrapper.appendChild(
      slotDiv(
        thirdMatch.team1,
        Boolean(thirdMatch.team1 && thirdWinner && thirdMatch.team1 === thirdWinner),
        thirdNum,
        1,
        thirdTop,
        cols[3],
        'third-place-slot'
      )
    );
    wrapper.appendChild(
      slotDiv(
        thirdMatch.team2,
        Boolean(thirdMatch.team2 && thirdWinner && thirdMatch.team2 === thirdWinner),
        thirdNum,
        2,
        thirdTop + SLOT_H,
        cols[3],
        'third-place-slot'
      )
    );
  }

  const finalWinner = finalMatch.winner || null;

  wrapper.appendChild(
    slotDiv(
      finalMatch.team1,
      Boolean(finalMatch.team1 && finalWinner && finalMatch.team1 === finalWinner),
      finNum,
      1,
      finalTop,
      cols[4],
      ''
    )
  );

  wrapper.appendChild(
    slotDiv(
      finalMatch.team2,
      Boolean(finalMatch.team2 && finalWinner && finalMatch.team2 === finalWinner),
      finNum,
      2,
      finalTop + SLOT_H,
      cols[4],
      ''
    )
  );
  container.appendChild(wrapper);
}


function cloneMatchTeamsSnapshot() {
  return JSON.parse(JSON.stringify(state.matchTeams || {}));
}

function sameMatchTeams(a, b) {
  return (a?.team1 || null) === (b?.team1 || null) && (a?.team2 || null) === (b?.team2 || null);
}

function cleanupKnockoutAfterGroupChange(previousMatchTeams) {
  // Si cambiar un resultado de grupos mueve equipos en dieciseisavos, hay que borrar
  // cualquier pick que dependía de la foto anterior. Repetimos hasta estabilizar para
  // que caigan también octavos/cuartos/semis/final cuando su camino ya no existe.
  let changed = true;
  let guard = 0;

  while (changed && guard < 20) {
    changed = false;
    guard += 1;

    buildTPAllocation();
    computeMatchTeams();

    Object.keys(state.knockoutResults).forEach(matchNum => {
      const currentTeams = state.matchTeams[matchNum] || {};
      const previousTeams = previousMatchTeams?.[matchNum] || {};
      const pickedWinner = state.knockoutResults[matchNum];
      const winnerStillInMatch = pickedWinner && (
        pickedWinner === currentTeams.team1 || pickedWinner === currentTeams.team2
      );

      const matchupChanged = previousMatchTeams && !sameMatchTeams(previousTeams, currentTeams);

      if (!winnerStillInMatch || matchupChanged) {
        delete state.knockoutResults[matchNum];
        changed = true;
      }
    });
  }

  buildTPAllocation();
  computeMatchTeams();
}

function pickWinner(matchNum, slotNum) {
  const mt = state.matchTeams[matchNum];
  if (!mt) return;
  const team = slotNum === 1 ? mt.team1 : mt.team2;
  if (!team) return;
  if (state.knockoutResults[matchNum] === team) {
    delete state.knockoutResults[matchNum];
  } else {
    state.knockoutResults[matchNum] = team;
  }
  computeMatchTeams();
  renderAll();
  saveLocalPredictionSoon();
}

function clearKnockoutAndRender(team) {
  if (!team) return;
  Object.keys(state.knockoutResults).forEach(k => {
    if (state.knockoutResults[k] === team) delete state.knockoutResults[k];
  });
  computeMatchTeams();
  renderAll();
  saveLocalPredictionSoon();
}

// ---- Awards ----

function getAwardConfigBySelectId(id) {
  return AWARDS_CONFIG.find(a => a.selectId === id) || null;
}

function getAwardConfigByKey(key) {
  return AWARDS_CONFIG.find(a => a.key === key) || null;
}

function getPlayerByName(name) {
  return AWARD_PLAYERS.find(p => p.name === name) || null;
}

function getAllTeamsFlat() {
  const list = [];
  GROUP_NAMES.forEach(g => {
    (TEAMS_BY_GROUP[g] || []).forEach(t => list.push({ name: t.name, group: g }));
  });
  return list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
}

function awardOptionInnerHtml(kind, value) {
  if (!value) return '<span class="award-placeholder">---</span><span class="award-player-country">Sin elegir</span>';

  if (kind === 'player') {
    const player = getPlayerByName(value);
    if (!player) {
      return `<span class="award-player-name">${escapeHtml(value)}</span>`;
    }
    return `
      <span class="team-flag ${getFlagClass(player.country)}"></span>
      <span class="award-player-name">${escapeHtml(player.name)}</span>
      <span class="award-player-country">${escapeHtml(player.country)}</span>
    `;
  }

  // team
  return `
    <span class="team-flag ${getTeamFlagClass(value)}"></span>
    <span class="award-player-name">${escapeHtml(value)}</span>
  `;
}

function awardDisplayHtml(kind, value) {
  if (!value) return '<span class="award-placeholder">---</span>';
  return awardOptionInnerHtml(kind, value);
}

function ensureAwardPickerModal() {
  let overlay = document.getElementById('awardPickerModal');
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.id = 'awardPickerModal';
  overlay.className = 'award-picker-overlay';
  overlay.style.display = 'none';
  overlay.innerHTML = `
    <div class="award-picker-modal" role="dialog" aria-modal="true">
      <button type="button" class="prediction-modal-close award-picker-close" aria-label="Cerrar">×</button>
      <h3 id="awardPickerTitle">Elegir</h3>
      <div class="award-picker-search">
        <input type="text" id="awardPickerSearch" class="award-picker-search-input"
               placeholder="Buscar por nombre o país..." autocomplete="off" spellcheck="false">
      </div>
      <div class="award-picker-list" id="awardPickerList"></div>
      <div class="award-picker-empty" id="awardPickerEmpty" style="display:none;">Sin resultados</div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target.closest('.award-picker-close')) {
      closeAwardPickerModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.style.display !== 'none') {
      closeAwardPickerModal();
    }
  });

  const searchInput = overlay.querySelector('#awardPickerSearch');
  searchInput.addEventListener('input', () => filterAwardPickerOptions(searchInput.value));

  return overlay;
}

function closeAwardPickerModal() {
  const overlay = document.getElementById('awardPickerModal');
  if (!overlay) return;
  overlay.style.display = 'none';
  overlay.dataset.selectId = '';
  const search = overlay.querySelector('#awardPickerSearch');
  if (search) search.value = '';
}

function normalizeAwardSearchText(s) {
  return (s || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function filterAwardPickerOptions(query) {
  const overlay = document.getElementById('awardPickerModal');
  if (!overlay) return;
  const list = overlay.querySelector('#awardPickerList');
  const emptyMsg = overlay.querySelector('#awardPickerEmpty');
  const q = normalizeAwardSearchText(query);
  let visible = 0;
  list.querySelectorAll('.award-picker-option').forEach(opt => {
    // The "Sin elegir" option (data-value="") is always shown.
    if (!opt.dataset.value) {
      opt.style.display = '';
      visible++;
      return;
    }
    const haystack = opt.dataset.search || '';
    const match = !q || haystack.indexOf(q) !== -1;
    opt.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  if (emptyMsg) emptyMsg.style.display = visible <= 1 && q ? 'block' : 'none';
}

function openAwardPickerModal(select) {
  const overlay = ensureAwardPickerModal();
  const list = overlay.querySelector('#awardPickerList');
  const title = overlay.querySelector('#awardPickerTitle');
  const cfg = getAwardConfigBySelectId(select.id);
  if (!cfg) return;
  const label = select.closest('.award-row')?.querySelector('label')?.textContent?.trim() || cfg.label;
  const currentValue = select.value || '';

  overlay.dataset.selectId = select.id;
  title.textContent = label.replace(':', '');
  list.innerHTML = '';

  const empty = document.createElement('button');
  empty.type = 'button';
  empty.className = 'award-picker-option' + (!currentValue ? ' selected' : '');
  empty.dataset.value = '';
  empty.innerHTML = '<span class="award-placeholder">---</span><span class="award-player-country">Sin elegir</span>';
  list.appendChild(empty);

  if (cfg.kind === 'player') {
    getAwardPlayersFor(cfg).forEach(player => {
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'award-picker-option' + (currentValue === player.name ? ' selected' : '');
      option.dataset.value = player.name;
      option.dataset.search = normalizeAwardSearchText(player.name + ' ' + player.country);
      option.innerHTML = `
        <span class="team-flag ${getFlagClass(player.country)}"></span>
        <span class="award-player-name">${escapeHtml(player.name)}</span>
        <span class="award-player-country">${escapeHtml(player.country)}</span>
      `;
      list.appendChild(option);
    });
  } else {
    getAllTeamsFlat().forEach(team => {
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'award-picker-option' + (currentValue === team.name ? ' selected' : '');
      option.dataset.value = team.name;
      option.dataset.search = normalizeAwardSearchText(team.name + ' ' + (team.group || ''));
      option.innerHTML = `
        <span class="team-flag ${getTeamFlagClass(team.name)}"></span>
        <span class="award-player-name">${escapeHtml(team.name)}</span>
        <span class="award-player-country">Grupo ${team.group}</span>
      `;
      list.appendChild(option);
    });
  }

  list.onclick = e => {
    const option = e.target.closest('.award-picker-option');
    if (!option) return;

    const activeSelect = document.getElementById(overlay.dataset.selectId);
    if (!activeSelect) return;

    activeSelect.value = option.dataset.value || '';
    syncAwardCustomSelects();
    activeSelect.dispatchEvent(new Event('input', { bubbles: true }));
    activeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    closeAwardPickerModal();
    saveLocalPredictionSoon();
  };

  overlay.style.display = 'flex';
  const searchInput = overlay.querySelector('#awardPickerSearch');
  if (searchInput) {
    searchInput.value = '';
    filterAwardPickerOptions('');
    setTimeout(() => searchInput.focus(), 50);
  }
}

function buildAwardCustomSelect(select) {
  const cfg = getAwardConfigBySelectId(select.id);
  if (!cfg) return;

  let wrap = select.nextElementSibling;
  if (!wrap || !wrap.classList || !wrap.classList.contains('award-custom')) {
    wrap = document.createElement('div');
    wrap.className = 'award-custom award-popup-select';
    wrap.dataset.selectId = select.id;
    wrap.innerHTML = `
      <button type="button" class="award-custom-trigger" aria-haspopup="dialog"></button>
    `;
    select.insertAdjacentElement('afterend', wrap);
  }

  select.classList.add('award-native-hidden');

  const trigger = wrap.querySelector('.award-custom-trigger');
  trigger.innerHTML = awardDisplayHtml(cfg.kind, select.value);

  if (!wrap.dataset.bound) {
    wrap.dataset.bound = '1';
    trigger.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      openAwardPickerModal(select);
    });
  }
}

function renderAwardSelects() {
  AWARDS_CONFIG.forEach(cfg => {
    const select = document.getElementById(cfg.selectId);
    if (!select) return;

    const currentValue = select.value;
    select.innerHTML = '<option value="">---</option>';

    if (cfg.kind === 'player') {
      getAwardPlayersFor(cfg).forEach(player => {
        const option = document.createElement('option');
        option.value = player.name;
        option.textContent = `${player.name} — ${player.country}`;
        select.appendChild(option);
      });
    } else {
      getAllTeamsFlat().forEach(team => {
        const option = document.createElement('option');
        option.value = team.name;
        option.textContent = `${team.name} (Grupo ${team.group})`;
        select.appendChild(option);
      });
    }

    select.value = currentValue || '';
    buildAwardCustomSelect(select);
  });
}

function syncAwardCustomSelects() {
  AWARDS_CONFIG.forEach(cfg => {
    const select = document.getElementById(cfg.selectId);
    if (!select) return;
    const wrap = select.nextElementSibling;
    if (!wrap || !wrap.classList.contains('award-custom')) return;

    const trigger = wrap.querySelector('.award-custom-trigger');
    if (trigger) trigger.innerHTML = awardDisplayHtml(cfg.kind, select.value);
  });
}

function readAwards() {
  const out = {};
  AWARDS_CONFIG.forEach(cfg => {
    out[cfg.key] = document.getElementById(cfg.selectId)?.value || '';
  });
  return out;
}

function fillAwards(a) {
  renderAwardSelects();
  if (!a) return;

  AWARDS_CONFIG.forEach(cfg => {
    const el = document.getElementById(cfg.selectId);
    if (!el) return;
    el.value = (a && typeof a === 'object' && typeof a[cfg.key] === 'string') ? a[cfg.key] : '';
  });

  syncAwardCustomSelects();
}

// ---- Build Payload ----
function buildPayload() {
  computeMatchTeams();
  const awards = readAwards();

  function winners(nums) { return nums.map(n => state.knockoutResults[n]).filter(Boolean); }
  function allTeams(nums) {
    return nums.flatMap(n => { const m = state.matchTeams[n] || {}; return [m.team1, m.team2]; }).filter(Boolean);
  }
  function matchDetails(nums) {
    return nums.map(n => {
      const m = state.matchTeams[n] || {};
      return {
        match: n,
        team1: m.team1 || null,
        team2: m.team2 || null,
        winner: state.knockoutResults[n] || null
      };
    });
  }

  const r32nums = KO_TREE.round32.map(m => m.num);
  const r16nums = (KO_TREE.round16||[]).map(m => m.num);
  const qfnums  = (KO_TREE.quarterfinals||[]).map(m => m.num);
  const sfnums  = (KO_TREE.semifinals||[]).map(m => m.num);
  const finalNum = (KO_TREE.final && KO_TREE.final[0]) ? KO_TREE.final[0].num : null;
  const thirdNum = (KO_TREE.thirdPlace && KO_TREE.thirdPlace[0]) ? KO_TREE.thirdPlace[0].num : null;
  const finalMatch = finalNum ? (state.matchTeams[finalNum] || {}) : {};
  const thirdMatch = thirdNum ? (state.matchTeams[thirdNum] || {}) : {};
  const champion = finalNum ? (state.knockoutResults[finalNum] || null) : null;
  const runnerUp = champion
    ? ([finalMatch.team1, finalMatch.team2].find(team => team && team !== champion) || null)
    : null;
  const thirdPlaceWinner = thirdNum ? (state.knockoutResults[thirdNum] || null) : null;

  return {
    groups: JSON.parse(JSON.stringify(state.groups)),
    groupsConfirmed: { ...(state.groupsConfirmed || {}) },
    thirdPlace: state.thirdPlace.filter(Boolean),
    thirdPlaceConfirmed: Boolean(state.thirdPlaceConfirmed),
    knockout: {
      round32: winners(r32nums),
      round16: winners(r16nums),
      quarterfinals: winners(qfnums),
      semifinals: winners(sfnums),
      final: champion,
      champion,
      runnerUp,
      finalists: [finalMatch.team1, finalMatch.team2].filter(Boolean),
      thirdPlace: thirdPlaceWinner,
      thirdPlaceWinner,
      matches: {
        round32: matchDetails(r32nums),
        round16: matchDetails(r16nums),
        quarterfinals: matchDetails(qfnums),
        semifinals: matchDetails(sfnums),
        final: finalNum ? matchDetails([finalNum]) : [],
        thirdPlace: thirdNum ? matchDetails([thirdNum]) : []
      }
    },
    semifinalists: allTeams(sfnums),
    finalists: [finalMatch.team1, finalMatch.team2].filter(Boolean),
    champion,
    runnerUp,
    thirdPlaceWinner,
    awards
  };
}

// ---- Results ----
function predictionResultStatus(predValue, realValue) {
  if (!realValue || realValue.length === 0) return 'pending';
  if (!predValue) return 'wrong';
  return predValue === realValue ? 'correct' : 'wrong';
}

function getResultOutcome(home, away) {
  if (home > away) return 'home';
  if (away > home) return 'away';
  return 'draw';
}

function sameTeamSet(a, b) {
  const aa = (a || []).filter(Boolean);
  const bb = (b || []).filter(Boolean);
  if (!aa.length || aa.length !== bb.length) return false;
  const bSet = new Set(bb);
  return aa.every(team => bSet.has(team));
}

function getChampionFromPayload(payload) {
  return payload?.champion || payload?.knockout?.champion || payload?.knockout?.final || null;
}

function getRunnerUpFromPayload(payload) {
  if (payload?.runnerUp || payload?.knockout?.runnerUp) return payload.runnerUp || payload.knockout.runnerUp;

  const champion = getChampionFromPayload(payload);
  const finalists = payload?.finalists || payload?.knockout?.finalists || [];
  if (!champion || finalists.length < 2) return null;
  return finalists.find(team => team && team !== champion) || null;
}


const KNOCKOUT_SCORING = puntuaciones.eliminatorias;

function uniqueTeamList(list) {
  return [...new Set((list || []).filter(Boolean))];
}

function getTeamsFromReviewMatches(reviewState, treeArr) {
  const teams = [];
  (treeArr || []).forEach(match => {
    const mt = reviewState.matchTeams?.[match.num] || {};
    if (mt.team1) teams.push(mt.team1);
    if (mt.team2) teams.push(mt.team2);
  });
  return uniqueTeamList(teams);
}

function getKnockoutStageTeamSets(payload) {
  if (!payload) {
    return {
      round32: new Set(),
      round16: new Set(),
      quarterfinals: new Set(),
      semifinals: new Set(),
      finalist: new Set(),
      champion: new Set(),
      thirdPlace: new Set()
    };
  }

  const reviewState = buildKnockoutReviewState(payload);
  const finalNum = KO_TREE.final?.[0]?.num;
  const thirdNum = KO_TREE.thirdPlace?.[0]?.num;
  const finalMatch = finalNum ? (reviewState.matchTeams?.[finalNum] || {}) : {};
  const thirdWinner = thirdNum ? reviewState.knockoutResults?.[thirdNum] : getThirdPlaceWinnerFromPayload(payload);
  const champion = finalNum ? reviewState.knockoutResults?.[finalNum] : getChampionFromPayload(payload);

  return {
    round32: new Set(getTeamsFromReviewMatches(reviewState, KO_TREE.round32)),
    round16: new Set(getTeamsFromReviewMatches(reviewState, KO_TREE.round16)),
    quarterfinals: new Set(getTeamsFromReviewMatches(reviewState, KO_TREE.quarterfinals)),
    semifinals: new Set(getTeamsFromReviewMatches(reviewState, KO_TREE.semifinals)),
    finalist: new Set(uniqueTeamList([finalMatch.team1, finalMatch.team2, ...getFinalistsFromPayload(payload)])),
    champion: new Set(champion ? [champion] : []),
    thirdPlace: new Set(thirdWinner ? [thirdWinner] : [])
  };
}

function getKnockoutProgressPointsForTeam(team, roundName, realStageTeams, predictedState) {
  if (!team || !roundName || !realStageTeams) return 0;

  const stageByRound = {
    round32: 'round32',
    round16: 'round16',
    quarterfinals: 'quarterfinals',
    semifinals: 'semifinals',
    final: 'finalist',
    thirdPlace: 'thirdPlace'
  };

  const stage = stageByRound[roundName];
  if (!stage) return 0;

  let points = realStageTeams[stage]?.has(team) ? (KNOCKOUT_SCORING[stage] || 0) : 0;

  if (roundName === 'final') {
    const finalNum = KO_TREE.final?.[0]?.num;
    const predictedChampion = finalNum ? predictedState?.knockoutResults?.[finalNum] : null;
    if (predictedChampion === team && realStageTeams.champion?.has(team)) {
      points += KNOCKOUT_SCORING.champion;
    }
  }

  return points;
}

function getKnockoutScoreBreakdown(prediction, results = RESULTS) {
  const predStages = getKnockoutStageTeamSets(prediction);
  const realStages = getKnockoutStageTeamSets(results);

  let score = 0;

  ['round32', 'round16', 'quarterfinals', 'semifinals', 'finalist'].forEach(stage => {
    const points = KNOCKOUT_SCORING[stage] || 0;
    predStages[stage].forEach(team => {
      if (realStages[stage].has(team)) score += points;
    });
  });

  predStages.champion.forEach(team => {
    if (realStages.champion.has(team)) score += KNOCKOUT_SCORING.champion;
  });

  predStages.thirdPlace.forEach(team => {
    if (realStages.thirdPlace.has(team)) score += KNOCKOUT_SCORING.thirdPlace;
  });

  return score;
}

function getFinalistsFromPayload(payload) {
  const explicit = payload?.finalists || payload?.knockout?.finalists;
  if (explicit && explicit.length) return explicit.filter(Boolean);

  const champion = getChampionFromPayload(payload);
  const runnerUp = getRunnerUpFromPayload(payload);
  return [champion, runnerUp].filter(Boolean);
}

function getThirdPlaceWinnerFromPayload(payload) {
  return payload?.thirdPlaceWinner || payload?.knockout?.thirdPlaceWinner || payload?.knockout?.thirdPlace || null;
}

function getSemifinalistsFromPayload(payload) {
  return payload?.semifinalists || payload?.knockout?.semifinalists || payload?.knockout?.semifinals || [];
}

function scorePrediction(prediction, results = RESULTS) {
  let score = 0;

  GROUP_NAMES.forEach(group => {
    const predGroup = prediction.groups?.[group] || [];
    const realGroup = results.groups?.[group] || [];

    if (predictionResultStatus(predGroup[0], realGroup[0]) === 'correct') score += puntuaciones.grupos.posicion.primero;
    if (predictionResultStatus(predGroup[1], realGroup[1]) === 'correct') score += puntuaciones.grupos.posicion.segundo;
    if (predictionResultStatus(predGroup[2], realGroup[2]) === 'correct') score += puntuaciones.grupos.posicion.tercero;
  });

  // Mejores terceros: 1 punto por cada equipo que el usuario haya clasificado
  // (top 8 de su orden) y que también esté en el top 8 real.
  const predThirdsTop8 = (prediction.thirdPlace || []).filter(Boolean).slice(0, 8);
  const realThirdsTop8 = new Set((results.thirdPlace || []).filter(Boolean).slice(0, 8));
  predThirdsTop8.forEach(team => {
    if (realThirdsTop8.has(team)) score += puntuaciones.grupos.mejorTercero;
  });

  score += getKnockoutScoreBreakdown(prediction, results);

  const predAwards = prediction.awards || {};
  const realAwards = results.awards || {};
  AWARDS_CONFIG.forEach(cfg => {
    const real = realAwards[cfg.key];
    const pred = predAwards[cfg.key];
    if (real && pred && real === pred) score += cfg.points;
  });

  return score;
}

// ---- Leaderboard ----

async function loadLeaderboard() {
  const res = await fetch(LEADERBOARD_CSV_URL);
  const csv = await res.text();

  const rows = parseCSV(csv);
  const submissions = [];

  rows.slice(1).forEach(row => {
    const rawJson = row[1];
    if (!rawJson) return;

    try {
      const prediction = JSON.parse(rawJson);
      submissions.push({
        name: prediction.name || 'Anonymous',
        score: scorePrediction(prediction),
        prediction
      });
    } catch (e) {
      console.warn('Invalid prediction JSON:', rawJson);
    }
  });

  submissions.sort((a, b) => b.score - a.score);
  renderLeaderboardList(submissions);
}

function parseCSV(csv) {
  const rows = [];
  let row = [];
  let value = '';
  let insideQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"' && insideQuotes && next === '"') {
      value += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      row.push(value);
      value = '';
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (value || row.length) {
        row.push(value);
        rows.push(row);
      }
      row = [];
      value = '';
      if (char === '\r' && next === '\n') i++;
    } else {
      value += char;
    }
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  return rows;
}

function renderLeaderboardList(submissions) {
  const container = document.getElementById('leaderboardContent');

  container.innerHTML = `
    <div class="leaderboard-list"></div>
  `;

  const list = container.querySelector('.leaderboard-list');

  submissions.forEach((entry, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'leaderboard-entry';

    btn.innerHTML = `
      <span class="leaderboard-rank">#${index + 1}</span>
      <span class="leaderboard-name">${entry.name}</span>
      <span class="leaderboard-score">${entry.score} pts</span>
    `;

    btn.addEventListener('click', () => {
      openPredictionModal(entry);
    });

    list.appendChild(btn);
  });
}

function openPredictionModal(entry) {
  const modal = document.getElementById('predictionModal');
  const viewer = document.getElementById('predictionViewer');

  modal.style.display = 'flex';
  viewer.innerHTML = '';

  renderPredictionReview(entry);
}

function closePredictionModal() {
  const modal = document.getElementById('predictionModal');
  const viewer = document.getElementById('predictionViewer');

  modal.style.display = 'none';
  viewer.innerHTML = '';
}


function openScoringHelpModal() {
  const modal = document.getElementById('predictionModal');
  const viewer = document.getElementById('predictionViewer');

  modal.style.display = 'flex';
  viewer.innerHTML = `
    <div class="scoring-help">
      <h3>❓ Cómo se puntúa</h3>

      <div class="scoring-help-grid">
        <div class="scoring-help-card">
          <h4>🌍 Fase de grupos</h4>
          <ul>
            <li>Acertar 1º exacto de grupo: <strong>${puntuaciones.grupos.posicion.primero} pts</strong></li>
            <li>Acertar 2º exacto de grupo: <strong>${puntuaciones.grupos.posicion.segundo} pts</strong></li>
            <li>Acertar 3º exacto de grupo: <strong>${puntuaciones.grupos.posicion.tercero} pts</strong></li>
            <li>Cada mejor tercero (top 8) acertado: <strong>${puntuaciones.grupos.mejorTercero} pt</strong></li>
          </ul>
          <p class="scoring-help-small">Solo se acierta arrastrando los equipos en el orden correcto. No hay marcadores exactos.</p>
        </div>

        <div class="scoring-help-card">
          <h4>🥊 Eliminatorias</h4>
          <ul>
            <li>Equipo en dieciseisavos: <strong>${puntuaciones.eliminatorias.round32} pts</strong></li>
            <li>Equipo en octavos: <strong>${puntuaciones.eliminatorias.round16} pts</strong></li>
            <li>Equipo en cuartos: <strong>${puntuaciones.eliminatorias.quarterfinals} pts</strong></li>
            <li>Equipo en semifinales: <strong>${puntuaciones.eliminatorias.semifinals} pts</strong></li>
            <li>Finalista: <strong>${puntuaciones.eliminatorias.finalist} pts</strong></li>
            <li>Campeón: <strong>+${puntuaciones.eliminatorias.champion} pts</strong></li>
            <li>Tercer puesto: <strong>${puntuaciones.eliminatorias.thirdPlace} pts</strong></li>
          </ul>
        </div>

        <div class="scoring-help-card">
          <h4>⭐ Logros del Mundial</h4>
          <ul>
            ${AWARDS_CONFIG.map(cfg => `<li>${cfg.emoji} ${escapeHtml(cfg.label)}: <strong>${cfg.points} pts</strong></li>`).join('')}
          </ul>
        </div>
      </div>

      <p class="scoring-help-note">
        La puntuación total de eliminatorias sí suma todas las decisiones acertadas. En el bracket del ranking, cada cajita muestra solo los puntos de esa ronda concreta; en la final puede sumar finalista + campeón si has clavado ambas cosas.
      </p>


      <div class="scoring-help-example">
        <div class="scoring-example-badge got-points">+3</div>
        <div class="scoring-example-text">
          Cada cuadradito verde del leaderboard representa los puntos que te ha dado esa decisión concreta:
          acertar el orden de un grupo, que una selección llegue a 16avos, semis, final, etc.
        </div>
      </div>

      <div class="scoring-help-footer">
        Los resultados y las puntuaciones NO son reales, se resetearán a 0 cuando comience el mundial. Es solo un ejemplo aleatorio.
      </div>
    </div>
  `;
}

function renderPredictionReview(entry) {
  const viewer = document.getElementById('predictionViewer');

  viewer.innerHTML = `
    <div class="prediction-review">
      <h3>La predicción de ${entry.name} — ${entry.score} pts</h3>

      <h4>Fase de grupos</h4>
      <div class="review-groups" id="reviewGroups"></div>

      <h4>Knockout</h4>
      <div class="review-section" id="reviewKnockout"></div>

      <h4>Logros individuales</h4>
      <div class="review-section" id="reviewAwards"></div>
    </div>
  `;

  renderReviewGroups(entry.prediction, entry);
  renderReviewKnockout(entry.prediction);
  renderReviewAwards(entry.prediction);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getPredictionGroupOrder(prediction, group) {
  const order = prediction.groups?.[group] || [];
  const teams = (TEAMS_BY_GROUP[group] || []).map(t => t.name);
  const valid = order.filter(t => teams.includes(t));
  const missing = teams.filter(t => !valid.includes(t));
  return [...valid, ...missing];
}

function getPredictionStandingReviewClass(team, predIdx, realOrder) {
  if (!Array.isArray(realOrder) || realOrder.length === 0) return ' review-pending';
  const realIdx = realOrder.indexOf(team);
  if (realIdx === -1) return ' review-wrong';
  return predIdx === realIdx ? ' review-correct' : ' review-partial';
}

function getPredictedGroupPositionPoints(team, idx, realOrder) {
  if (!Array.isArray(realOrder) || realOrder.length === 0) return 0;
  if (realOrder[idx] !== team) return 0;
  if (idx === 0) return puntuaciones.grupos.posicion.primero;
  if (idx === 1) return puntuaciones.grupos.posicion.segundo;
  if (idx === 2) return puntuaciones.grupos.posicion.tercero;
  return 0;
}

function calculateGroupReviewTotalPoints(group, prediction) {
  const realOrder = RESULTS.groups?.[group] || [];
  if (!realOrder.length) return 0;
  const predOrder = getPredictionGroupOrder(prediction, group);
  return predOrder.reduce((total, team, idx) => total + getPredictedGroupPositionPoints(team, idx, realOrder), 0);
}

function calculateThirdPlaceReviewPoints(prediction) {
  const predTop8 = (prediction.thirdPlace || []).filter(Boolean).slice(0, 8);
  const realTop8 = new Set((RESULTS.thirdPlace || []).filter(Boolean).slice(0, 8));
  if (realTop8.size === 0) return 0;
  return predTop8.reduce((total, team) => total + (realTop8.has(team) ? puntuaciones.grupos.mejorTercero : 0), 0);
}

function renderReviewPointsBadge(points, title = '') {
  const cls = points > 0 ? ' review-points-badge got-points' : ' review-points-badge no-points';
  return `<span class="${cls}"${title ? ` title="${escapeHtml(title)}"` : ''}>+${points}pt</span>`;
}

function renderStandingRow({ team, idx, statusClass, extraClass = '' }) {
  return `
    <div class="group-team pos-${idx + 1}${extraClass}${statusClass || ''}">
      <span class="position-badge">${idx + 1}</span>
      <span class="team-flag ${getTeamFlagClass(team)}"></span>
      <span class="team-name">${escapeHtml(team)}</span>
    </div>
  `;
}

function isPredictionGroupComplete(group, prediction) {
  // En el nuevo modelo basta con que el usuario haya enviado un orden con los
  // 4 equipos del grupo (algo que siempre ocurre cuando se manda la quiniela).
  const teams = (TEAMS_BY_GROUP[group] || []).map(t => t.name);
  const order = prediction.groups?.[group] || [];
  if (order.length < teams.length) return false;
  const set = new Set(order);
  return teams.every(t => set.has(t));
}

function renderReviewGroups(prediction, entry) {
  const container = document.getElementById('reviewGroups');
  container.className = 'groups-grid';
  container.innerHTML = '';

  const qualifiedThirdsPred = new Set((prediction.thirdPlace || []).slice(0, 8));

  GROUP_NAMES.forEach(g => {
    const complete = isPredictionGroupComplete(g, prediction);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'group-card group-card-clickable review-group-card' + (complete ? ' group-complete' : ' group-empty');
    card.title = 'Ver detalle del grupo ' + g;

    const header = document.createElement('div');
    header.className = 'review-group-card-header';

    const h3 = document.createElement('h3');
    h3.textContent = 'Group ' + g;
    header.appendChild(h3);

    const groupTotalPoints = calculateGroupReviewTotalPoints(g, prediction);
    const totalBadge = document.createElement('span');
    totalBadge.className = 'review-group-total-points' + (groupTotalPoints > 0 ? ' got-points' : ' no-points');
    totalBadge.title = 'Total de puntos conseguidos en el grupo ' + g;
    totalBadge.textContent = `+${groupTotalPoints}pt`;
    header.appendChild(totalBadge);

    card.appendChild(header);

    const predOrder = getPredictionGroupOrder(prediction, g);
    const realOrder = RESULTS.groups?.[g] || [];

    predOrder.forEach((team, idx) => {
      const isThird = idx === 2;
      const isFourth = idx === 3;
      const qualifiedAsThird = isThird && qualifiedThirdsPred.has(team);
      const eliminated = isFourth || (isThird && !qualifiedAsThird);
      const statusClass = realOrder.length
        ? getPredictionStandingReviewClass(team, idx, realOrder)
        : ' review-pending';

      const row = document.createElement('div');
      row.className =
        'group-team pos-' + (idx + 1) +
        (eliminated ? ' eliminated' : '') +
        (qualifiedAsThird ? ' qualified-third' : '') +
        statusClass;

      row.innerHTML = `
        <span class="position-badge">${idx + 1}</span>
        <span class="team-flag ${getTeamFlagClass(team)}"></span>
        <span class="team-name">${escapeHtml(team)}</span>
      `;

      card.appendChild(row);
    });

    const hint = document.createElement('div');
    hint.className = 'group-card-hint';
    hint.textContent = 'Ver detalle';
    card.appendChild(hint);

    card.addEventListener('click', () => openReadOnlyGroupResultsModal(entry, g));
    container.appendChild(card);
  });
}

function openReadOnlyGroupResultsModal(entry, group) {
  const viewer = document.getElementById('predictionViewer');
  const prediction = entry.prediction;
  const predOrder = getPredictionGroupOrder(prediction, group);
  const realOrder = RESULTS.groups?.[group] || [];
  const qualifiedThirdsPred = new Set((prediction.thirdPlace || []).slice(0, 8));
  const qualifiedThirdsReal = new Set((RESULTS.thirdPlace || []).slice(0, 8));

  viewer.innerHTML = `
    <div class="group-results-editor group-results-readonly">
      <button type="button" class="toolbar-btn review-back-btn" id="backToPredictionReview">← Volver a ${escapeHtml(entry.name)}</button>
      <h3>GRUPO ${group}</h3>
      <p class="group-modal-subtitle">Solo lectura: orden apostado vs orden real.</p>
      <div class="group-live-standings-wrap">
        <div class="review-standings-compare review-standings-compare-with-points">
          <div class="review-standings-col">
            <div class="review-standings-label">Apostada</div>
            <div class="group-modal-standings" id="predictedGroupStandings"></div>
          </div>
          <div class="review-standings-points-col">
            <div class="review-standings-label">Puntos</div>
            <div class="review-standings-points-list" id="predictedGroupPositionPoints"></div>
          </div>
          <div class="review-standings-col">
            <div class="review-standings-label">Real</div>
            <div class="group-modal-standings" id="realGroupStandings"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const predictedStandingsDiv = viewer.querySelector('#predictedGroupStandings');
  const positionPointsDiv = viewer.querySelector('#predictedGroupPositionPoints');
  const realStandingsDiv = viewer.querySelector('#realGroupStandings');

  predictedStandingsDiv.innerHTML = predOrder.map((team, idx) => {
    const isThird = idx === 2;
    const isFourth = idx === 3;
    const qualifiedAsThird = isThird && qualifiedThirdsPred.has(team);
    const eliminated = isFourth || (isThird && !qualifiedAsThird);
    const statusClass = realOrder.length
      ? getPredictionStandingReviewClass(team, idx, realOrder)
      : ' review-pending';

    return renderStandingRow({
      team,
      idx,
      statusClass,
      extraClass: (eliminated ? ' eliminated' : '') + (qualifiedAsThird ? ' qualified-third' : '')
    });
  }).join('');

  positionPointsDiv.innerHTML = predOrder.map((team, idx) => {
    const points = getPredictedGroupPositionPoints(team, idx, realOrder);
    return `<div class="review-standing-points-row">${renderReviewPointsBadge(points, 'Puntos por esta posición')}</div>`;
  }).join('');

  if (realOrder.length) {
    realStandingsDiv.innerHTML = realOrder.map((team, idx) => {
      const isThird = idx === 2;
      const isFourth = idx === 3;
      const qualifiedAsThird = isThird && qualifiedThirdsReal.has(team);
      const eliminated = isFourth || (isThird && !qualifiedAsThird);

      return renderStandingRow({
        team,
        idx,
        statusClass: '',
        extraClass: (eliminated ? ' eliminated' : '') + (qualifiedAsThird ? ' qualified-third' : '')
      });
    }).join('');
  } else {
    realStandingsDiv.innerHTML = '<p class="note-text">Aún sin resultados oficiales.</p>';
  }

  document.getElementById('backToPredictionReview').addEventListener('click', () => renderPredictionReview(entry));
}

function buildKnockoutReviewState(source) {
  const oldState = JSON.parse(JSON.stringify(state));
  const oldTpAllocation = JSON.parse(JSON.stringify(tpAllocation || {}));

  state.groups = JSON.parse(JSON.stringify(source.groups || {}));
  state.thirdPlace = [...(source.thirdPlace || [])];
  state.knockoutResults = {};
  state.matchTeams = {};

  buildTPAllocation();
  computeMatchTeams();

  const knockout = source.knockout || {};

  function setExplicitMatch(item) {
    if (!item || item.match === undefined || item.match === null) return;
    const matchNum = Number(item.match);
    if (!Number.isFinite(matchNum)) return;

    if (item.team1 || item.team2) {
      state.matchTeams[matchNum] = {
        team1: item.team1 || null,
        team2: item.team2 || null
      };
    }

    if (item.winner) {
      state.knockoutResults[matchNum] = item.winner;
    }
  }

  function setWinnerIfPossible(match, team) {
    if (!match || !team) return;
    const mt = state.matchTeams[match.num] || {};
    if (mt.team1 === team || mt.team2 === team) {
      state.knockoutResults[match.num] = team;
      computeMatchTeams();
    }
  }

  function applyRound(roundName, treeRound) {
    const explicitMatches = knockout.matches?.[roundName];

    // New payload format: use the official match number as source of truth.
    // This is important for the leaderboard review because the real bracket may
    // not be reproducible from the predicted group path. If results.js says
    // match 101 is Portugal vs Norway, the popup/bracket for match 101 must show
    // exactly that, regardless of what the computed bracket path would produce.
    if (Array.isArray(explicitMatches)) {
      explicitMatches.forEach(setExplicitMatch);
      return;
    }

    // Legacy payload format: only winner arrays, so we infer the match by team.
    const winners = knockout[roundName] || [];
    winners.forEach(team => {
      const match = treeRound.find(m => {
        const mt = state.matchTeams[m.num] || {};
        return mt.team1 === team || mt.team2 === team;
      });
      setWinnerIfPossible(match, team);
    });
  }

  applyRound('round32', KO_TREE.round32 || []);
  applyRound('round16', KO_TREE.round16 || []);
  applyRound('quarterfinals', KO_TREE.quarterfinals || []);
  applyRound('semifinals', KO_TREE.semifinals || []);
  applyRound('thirdPlace', KO_TREE.thirdPlace || []);
  applyRound('final', KO_TREE.final || []);

  // Legacy fallbacks for old results/predictions without knockout.matches.final
  // or knockout.matches.thirdPlace.
  if (KO_TREE.final?.[0] && !state.knockoutResults[KO_TREE.final[0].num]) {
    setWinnerIfPossible(KO_TREE.final[0], knockout.final || knockout.champion || source.champion);
  }

  if (KO_TREE.thirdPlace?.[0] && !state.knockoutResults[KO_TREE.thirdPlace[0].num]) {
    setWinnerIfPossible(KO_TREE.thirdPlace[0], knockout.thirdPlace || knockout.thirdPlaceWinner || source.thirdPlaceWinner);
  }

  const reviewState = JSON.parse(JSON.stringify(state));

  state.groups = oldState.groups;
  state.thirdPlace = oldState.thirdPlace;
  state.knockoutResults = oldState.knockoutResults;
  state.matchTeams = oldState.matchTeams;
  tpAllocation = oldTpAllocation;

  return reviewState;
}

function renderKnockoutBracket(reviewState, titleText, options = {}) {
  const order = getBracketDisplayOrder();

  const SLOT_H = 46;
  const GAP = 10;
  const MATCH_GAP = 2;
  const LABEL_H = 32;
  const TITLE_H = 34;
  const COL_W = 170;
  const CONN_W = 58;
  const MATCH_H = SLOT_H * 2 + MATCH_GAP;
  const STEP = MATCH_H + GAP;

  const cols = [
    10,
    COL_W + CONN_W,
    COL_W * 2 + CONN_W * 2,
    COL_W * 3 + CONN_W * 3,
    COL_W * 4 + CONN_W * 4
  ];

  function matchData(treeArr, ord) {
    return (ord || treeArr.map((_, i) => i)).map(i => {
      const m = treeArr[i];
      const mt = reviewState.matchTeams[m.num] || {};
      return {
        team1: mt.team1,
        team2: mt.team2,
        winner: reviewState.knockoutResults[m.num] || null,
        num: m.num
      };
    });
  }

  const r32 = matchData(KO_TREE.round32, order.r32Order);
  const r16 = matchData(KO_TREE.round16, order.r16Order);
  const qf = matchData(KO_TREE.quarterfinals, order.qfOrder);
  const sf = matchData(KO_TREE.semifinals);

  const r32Tree = order.r32Order.map(i => KO_TREE.round32[i]);
  const r16Tree = order.r16Order.map(i => KO_TREE.round16[i]);
  const qfTree = order.qfOrder.map(i => KO_TREE.quarterfinals[i]);
  const sfTree = KO_TREE.semifinals;

  const finMatch = KO_TREE.final?.[0];
  const finNum = finMatch ? finMatch.num : 104;
  const finMt = reviewState.matchTeams[finNum] || {};
  const finalMatch = {
    team1: finMt.team1,
    team2: finMt.team2,
    winner: reviewState.knockoutResults[finNum] || null,
    num: finNum
  };

  const thirdMatchDef = KO_TREE.thirdPlace?.[0];
  const thirdNum = thirdMatchDef ? thirdMatchDef.num : 103;
  const thirdMt = reviewState.matchTeams[thirdNum] || {};
  const thirdMatch = {
    team1: thirdMt.team1,
    team2: thirdMt.team2,
    winner: reviewState.knockoutResults[thirdNum] || null,
    num: thirdNum
  };

  const r32Tops = r32.map((_, i) => TITLE_H + LABEL_H + i * STEP);

  function centerOf(top) {
    return top + SLOT_H;
  }

  function buildTops(dstTree, srcTree, srcTops) {
    return dstTree.map(dst => {
      const s1i = srcTree.findIndex(s => s.num === dst.slot1.matchNum);
      const s2i = srcTree.findIndex(s => s.num === dst.slot2.matchNum);
      if (s1i === -1 || s2i === -1) return TITLE_H + LABEL_H;
      return ((centerOf(srcTops[s1i]) + centerOf(srcTops[s2i])) / 2) - SLOT_H;
    });
  }

  const r16Tops = buildTops(r16Tree, r32Tree, r32Tops);
  const qfTops = buildTops(qfTree, r16Tree, r16Tops);
  const sfTops = buildTops(sfTree, qfTree, qfTops);

  let finalTop = TITLE_H + LABEL_H;
  if (sfTops.length === 2) {
    finalTop = ((centerOf(sfTops[0]) + centerOf(sfTops[1])) / 2) - SLOT_H;
  }

  const thirdTop = finalTop;

  const maxH = TITLE_H + LABEL_H + r32.length * STEP + 40;

  const wrapper = document.createElement('div');
  wrapper.className = 'bracket review-knockout-bracket' + (options.extraClass ? ' ' + options.extraClass : '');
  wrapper.style.cssText =
    'position:relative;height:' + maxH + 'px;min-width:' + (COL_W * 5 + CONN_W * 4 + 40) + 'px';

  const title = document.createElement('div');
  title.className = 'review-knockout-title';
  title.style.cssText = 'position:absolute;top:0;left:10px;width:' + (COL_W * 5 + CONN_W * 4) + 'px;';
  title.textContent = titleText || '';
  if (titleText) wrapper.appendChild(title);

  ['Dieciseisavos', 'Octavos', 'Cuartos', 'Semis', 'Final'].forEach((lbl, i) => {
    const l = document.createElement('div');
    l.className = 'bracket-round-label';
    l.style.cssText =
      'position:absolute;top:' + TITLE_H + 'px;left:' + cols[i] + 'px;width:' + COL_W + 'px;text-align:center;';
    l.textContent = lbl;
    wrapper.appendChild(l);
  });

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', maxH);
  svg.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;z-index:1;';

  function mkPath(d) {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    p.setAttribute('stroke', '#81C784');
    p.setAttribute('stroke-width', '2');
    p.setAttribute('fill', 'none');
    return p;
  }

  function connect(srcTree, srcTops, dstTree, dstTops, srcLeft, dstLeft) {
    const sx = srcLeft + COL_W - 6;
    const dx = dstLeft + 3;
    const mx = sx + (dx - sx) / 2;

    dstTree.forEach((dst, di) => {
      const s1i = srcTree.findIndex(s => s.num === dst.slot1.matchNum);
      const s2i = srcTree.findIndex(s => s.num === dst.slot2.matchNum);
      if (s1i === -1 || s2i === -1) return;

      const y1 = centerOf(srcTops[s1i]);
      const y2 = centerOf(srcTops[s2i]);
      const yd = centerOf(dstTops[di]);

      svg.appendChild(mkPath(`M${sx},${y1} L${mx},${y1} L${mx},${yd} L${dx},${yd}`));
      svg.appendChild(mkPath(`M${sx},${y2} L${mx},${y2} L${mx},${yd} L${dx},${yd}`));
    });
  }

  function connectSemisToFinal() {
    if (sfTree.length !== 2) return;

    const sx = cols[3] + COL_W - 6;
    const dx = cols[4] + 3;
    const mx = sx + (dx - sx) / 2;
    const yd = centerOf(finalTop);

    sfTops.forEach(top => {
      const y = centerOf(top);
      svg.appendChild(mkPath(`M${sx},${y} L${mx},${y} L${mx},${yd} L${dx},${yd}`));
    });
  }

  function connectSemisToThirdPlace() {
    if (sfTops.length !== 2 || !thirdMatchDef) return;

    const x = cols[3] + (COL_W / 2) - 3;
    const upperBottom = sfTops[0] + MATCH_H;
    const lowerTop = sfTops[1];
    const thirdTopEdge = thirdTop - 6;
    const thirdBottomEdge = thirdTop + MATCH_H + 6;

    if (upperBottom < thirdTopEdge) {
      const p1 = mkPath(`M${x},${upperBottom} L${x},${thirdTopEdge}`);
      p1.setAttribute('stroke-width', '2');
      svg.appendChild(p1);
    }

    if (thirdBottomEdge < lowerTop) {
      const p2 = mkPath(`M${x},${thirdBottomEdge} L${x},${lowerTop}`);
      p2.setAttribute('stroke-width', '2');
      svg.appendChild(p2);
    }
  }

  connect(r32Tree, r32Tops, r16Tree, r16Tops, cols[0], cols[1]);
  connect(r16Tree, r16Tops, qfTree, qfTops, cols[1], cols[2]);
  connect(qfTree, qfTops, sfTree, sfTops, cols[2], cols[3]);
  connectSemisToFinal();
  connectSemisToThirdPlace();
  wrapper.appendChild(svg);

  function slotDiv(team, winner, top, left, matchNum, roundName) {
    const hasTeam = Boolean(team);
    const isWinner = hasTeam && winner && team === winner;
    const matchInfo = options.matchInfoByNum?.[matchNum];
    const isClickable = Boolean(options.onMatchClick && matchInfo?.realHasMatch);
    const slotPoints = hasTeam && typeof options.getSlotPoints === 'function'
      ? Number(options.getSlotPoints(team, roundName, matchNum) || 0)
      : null;

    const d = document.createElement('div');
    d.className =
      'bracket-slot' +
      (hasTeam ? ' has-team' : ' empty-slot') +
      (isWinner ? ' winner' : '') +
      (isClickable ? ' review-match-clickable' : '');

    d.style.cssText =
      'position:absolute;top:' + top + 'px;left:' + left + 'px;width:' + (COL_W - 6) + 'px;z-index:2;' +
      (isClickable ? 'cursor:pointer;' : 'cursor:default;');

    d.innerHTML =
      (slotPoints !== null ? '<span class="review-knockout-slot-points ' + (slotPoints > 0 ? 'got-points' : '') + '">' + escapeHtml(`+${slotPoints}pt`) + '</span>' : '') +
      '<span class="slot-flag ' + getFlagClass(team) + '"></span>' +
      '<span class="slot-name">' + escapeHtml(team || '---') + '</span>' +
      (isClickable ? '<span class="review-match-info-dot" title="Ver partido real">i</span>' : '');

    if (isClickable) {
      d.setAttribute('data-match-num', String(matchNum));
      d.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        options.onMatchClick(matchNum, ev, d);
      });
    }

    return d;
  }

  function drawRound(matches, tops, colIdx) {
    const left = cols[colIdx];
    matches.forEach((m, i) => {
      const roundName = ['round32', 'round16', 'quarterfinals', 'semifinals'][colIdx] || '';
      wrapper.appendChild(slotDiv(m.team1, m.winner, tops[i], left, m.num, roundName));
      wrapper.appendChild(slotDiv(m.team2, m.winner, tops[i] + SLOT_H, left, m.num, roundName));
    });
  }

  drawRound(r32, r32Tops, 0);
  drawRound(r16, r16Tops, 1);
  drawRound(qf, qfTops, 2);
  drawRound(sf, sfTops, 3);

  if (thirdMatchDef) {
    const thirdLabel = document.createElement('div');
    thirdLabel.className = 'bracket-round-label';
    thirdLabel.style.cssText =
      'position:absolute;top:' + Math.max(TITLE_H + LABEL_H, thirdTop - 26) + 'px;left:' + cols[3] + 'px;width:' + COL_W + 'px;text-align:center;color:#2E7D32;z-index:3;';
    thirdLabel.textContent = '3er puesto';
    wrapper.appendChild(thirdLabel);

    wrapper.appendChild(slotDiv(thirdMatch.team1, thirdMatch.winner, thirdTop, cols[3], thirdMatch.num, 'thirdPlace'));
    wrapper.appendChild(slotDiv(thirdMatch.team2, thirdMatch.winner, thirdTop + SLOT_H, cols[3], thirdMatch.num, 'thirdPlace'));
  }

  wrapper.appendChild(slotDiv(finalMatch.team1, finalMatch.winner, finalTop, cols[4], finalMatch.num, 'final'));
  wrapper.appendChild(slotDiv(finalMatch.team2, finalMatch.winner, finalTop + SLOT_H, cols[4], finalMatch.num, 'final'));

  return wrapper;
}

function renderReviewKnockout(prediction) {
  const container = document.getElementById('reviewKnockout');
  container.className = 'review-knockout-click-section';
  container.innerHTML = `
    <div class="review-knockout-header">
      <div>
        <h4 class="group-modal-section-title"><span>🏆</span> ELIMINATORIAS: APOSTADO VS REAL</h4>
        <p class="note-text review-knockout-note">Haz click en un partido para comparar el cruce esperado con el cruce real, cuando ese partido real ya exista.</p>
      </div>
      <div class="review-knockout-legend" aria-label="Leyenda del bracket">
        <span><i class="legend-box legend-pred"></i> Tu predicción</span>
        <span><i class="legend-dot-info">i</i> Click = comparar partido</span>
      </div>
    </div>
  `;

  const predictedState = buildKnockoutReviewState(prediction);
  const realState = buildKnockoutReviewState(RESULTS);

  const matchInfoByNum = {};
  Object.keys(predictedState.matchTeams || {}).forEach(matchNum => {
    const realMatch = realState.matchTeams?.[matchNum] || {};
    matchInfoByNum[matchNum] = {
      realHasMatch: Boolean(realMatch.team1 && realMatch.team2)
    };
  });

  function closeKnockoutPopover() {
    document.querySelectorAll('.knockout-match-popover').forEach(el => el.remove());
  }

  function teamMini(team, winner) {
    const isWinner = team && winner && team === winner;
    return `
      <div class="knockout-popover-team ${isWinner ? 'winner' : ''}">
        <span class="slot-flag ${getFlagClass(team)}"></span>
        <span>${escapeHtml(team || '---')}</span>
      </div>
    `;
  }

  function showKnockoutMatchPopover(matchNum, ev) {
    const expected = predictedState.matchTeams?.[matchNum] || {};
    const real = realState.matchTeams?.[matchNum] || {};
    const hasRealMatch = Boolean(real.team1 && real.team2);
    if (!hasRealMatch) return;

    closeKnockoutPopover();

    const expectedWinner = predictedState.knockoutResults?.[matchNum] || null;
    const realWinner = realState.knockoutResults?.[matchNum] || null;

    const pop = document.createElement('div');
    pop.className = 'knockout-match-popover';
    pop.innerHTML = `
      <button type="button" class="knockout-popover-close" aria-label="Cerrar">×</button>
      <div class="knockout-popover-title">Partido #${escapeHtml(matchNum)}</div>
      <div class="knockout-popover-grid">
        <div class="knockout-popover-card expected">
          <div class="knockout-popover-label">Partido esperado</div>
          ${teamMini(expected.team1, expectedWinner)}
          ${teamMini(expected.team2, expectedWinner)}
        </div>
        <div class="knockout-popover-card real">
          <div class="knockout-popover-label">Partido real</div>
          ${teamMini(real.team1, realWinner)}
          ${teamMini(real.team2, realWinner)}
        </div>
      </div>
    `;

    document.body.appendChild(pop);
    pop.addEventListener('click', e => e.stopPropagation());

    const closeBtn = pop.querySelector('.knockout-popover-close');
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeKnockoutPopover();
    });

    const margin = 12;
    const rect = pop.getBoundingClientRect();
    let left = ev.clientX + 14;
    let top = ev.clientY + 14;

    if (left + rect.width + margin > window.innerWidth) {
      left = Math.max(margin, ev.clientX - rect.width - 14);
    }
    if (top + rect.height + margin > window.innerHeight) {
      top = Math.max(margin, ev.clientY - rect.height - 14);
    }

    pop.style.left = `${left}px`;
    pop.style.top = `${top}px`;

    setTimeout(() => {
      document.addEventListener('click', closeKnockoutPopover, { once: true });
    }, 0);
  }

  const realStageTeams = getKnockoutStageTeamSets(RESULTS);

  function getBracketSlotPoints(team, roundName) {
    return getKnockoutProgressPointsForTeam(team, roundName, realStageTeams, predictedState);
  }

  const pane = document.createElement('div');
  pane.className = 'bracket-wrapper review-knockout-pane review-knockout-click-pane';

  const predictedBracket = renderKnockoutBracket(predictedState, '', {
    extraClass: 'review-knockout-predicted review-knockout-clickable-bracket',
    matchInfoByNum,
    getSlotPoints: getBracketSlotPoints,
    onMatchClick: showKnockoutMatchPopover
  });

  pane.appendChild(predictedBracket);
  container.appendChild(pane);
}

function renderReviewAwards(prediction) {
  const container = document.getElementById('reviewAwards');
  container.className = 'awards-section';
  container.innerHTML = '';

  const predAwards = prediction.awards || {};
  const realAwards = RESULTS.awards || {};

  AWARDS_CONFIG.forEach(cfg => {
    const predicted = typeof predAwards[cfg.key] === 'string' ? predAwards[cfg.key] : '';
    const real = typeof realAwards[cfg.key] === 'string' ? realAwards[cfg.key] : '';
    const resolved = Boolean(real);
    const correct = resolved && predicted && predicted === real;
    const wrong = resolved && predicted !== real;

    const row = document.createElement('div');
    row.className =
      'award-row review-award-row' +
      (correct ? ' review-correct' : '') +
      (wrong ? ' review-wrong' : '') +
      (!resolved ? ' review-pending' : '');

    row.innerHTML = `
      <label>${cfg.emoji} ${escapeHtml(cfg.label)} (${cfg.points}pt):</label>
      <div class="award-select review-award-display">
        ${awardDisplayHtml(cfg.kind, predicted)}
        ${resolved ? `<small class="review-award-real">Real: ${awardDisplayHtml(cfg.kind, real)}</small>` : ''}
      </div>
    `;

    container.appendChild(row);
  });
}

// ---- Scoring ----
function calculateScore(prediction, results) {
  return scorePrediction(prediction, results);
}

// ---- Leaderboard ----
function renderLeaderboard(entries) {
  const div = document.getElementById('leaderboardContent');
  if (!entries || entries.length === 0) {
    div.innerHTML = '<p class="note-text" style="margin-top:20px;">No predictions found.</p>';
    return;
  }
  entries.sort((a,b) => b.score - a.score);

  const table = document.createElement('table');
  table.className = 'leaderboard-table';
  table.innerHTML = `<thead><tr><th>#</th><th>Name</th><th>Score</th><th>Champion</th></tr></thead><tbody></tbody>`;
  const tbody = table.querySelector('tbody');

  entries.forEach((e, idx) => {
    const tr = document.createElement('tr');
    if (idx === 0) tr.className = 'rank-1';
    tr.innerHTML = `<td>${idx===0?'<span class="rank-crown">👑</span> ':''}${idx+1}</td><td>${e.name}</td><td>${e.score}</td><td>${e.champion||'--'}</td>`;
    tbody.appendChild(tr);
  });

  div.innerHTML = '';
  div.appendChild(table);
}

function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') { if (text[i+1]==='"') { field+='"'; i++; } else inQuotes = false; }
      else field += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ',') { row.push(field); field = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text[i+1]==='\n') i++;
        row.push(field); field = '';
        if (row.length) rows.push(row);
        row = [];
      } else field += ch;
    }
  }
  row.push(field);
  if (row.length || field) rows.push(row);
  return rows;
}

// ---- Submit ----
const FORM_ACTION = 'https://docs.google.com/forms/d/e/'+FORM_ID+'/formResponse';

function submitPrediction() {
  openNameModal();
}

function openNameModal() {
  const modal = document.getElementById('nameModal');
  const input = document.getElementById('playerNameInput');

  modal.style.display = 'flex';
  input.value = '';
  setTimeout(() => input.focus(), 50);
}

function closeNameModal() {
  document.getElementById('nameModal').style.display = 'none';
}

async function confirmSubmitPrediction() {
  const input = document.getElementById('playerNameInput');
  const playerName = input.value.trim();

  if (!playerName) {
    showToast('Eh, eh, eh… sin nombre no hay quiniela, compi.', true);
    input.focus();
    return;
  }

  const payload = buildPayload();
  payload.name = playerName;
  payload._submittedAt = new Date().toISOString();

  const params = new URLSearchParams();
  params.append(ENTRY_ID, JSON.stringify(payload));

  closeNameModal();
  showLoading('Publicando...');

  try {
    await fetch(FORM_ACTION, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    hideLoading();
    fireConfetti();
    showToast('¡Apuesta registrada! Tarda unos segundos en asomar por el ranking. Mucha suerte, crack de LKS Next.');
  } catch(e) {
    hideLoading();
    showToast('Algo ha petado al enviar. Inténtalo otra vez o avisa al de sistemas (a ver si te hace caso).', true);
  }
}

// ---- Master Render ----
function renderAll() {
  buildTPAllocation();
  computeMatchTeams();
  renderGroups();
  renderBestThirds();
  renderThirdPlace();
  renderBracket();
  renderAwardSelects();
  loadLeaderboard();
}

function resetState() {
  GROUP_NAMES.forEach(g => {
    state.groups[g] = TEAMS_BY_GROUP[g].map(t => t.name);
  });

  state.groupsConfirmed = {};
  state.thirdPlace = [];
  state.thirdPlaceConfirmed = false;
  ensureGroupsInitialized();

  state.knockoutResults = {};
  state.matchTeams = {};
  state.knockout = {};

  state.awards = emptyAwardsState();

  fillAwards(state.awards);
  clearLocalPrediction();
  buildTPAllocation();
  computeMatchTeams();
  renderAll();

  showToast('A tomar por culo.');
}

// ---- Init ----
async function init() {
  showLoading('Cargando el Mundial...');
  const ok = await loadData();
  hideLoading();
  if (!ok) { showToast('No hay datos del Mundial. Revisa la conexión y recarga (sí, otra vez).', true); return; }

  // Clear stale localStorage from old incompatible data
  const v = localStorage.getItem(LOCAL_STORAGE_VERSION_KEY);
  if (v !== LOCAL_STORAGE_VERSION) {
    localStorage.removeItem(LOCAL_STORAGE_PICKS_KEY);
    localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, LOCAL_STORAGE_VERSION);
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-'+btn.dataset.tab).classList.add('active');
    });
  });

  document.getElementById('btnReset').addEventListener('click', () => {
    resetState();
    computeMatchTeams();
    renderAll();
  });
  const btnScoringHelp = document.getElementById('btnScoringHelp');
  if (btnScoringHelp) {
    btnScoringHelp.addEventListener('click', openScoringHelpModal);
  }
  document.getElementById('btnSubmit').addEventListener('click', submitPrediction);
  document.getElementById('confirmNameSubmit').addEventListener('click', confirmSubmitPrediction);
  document.getElementById('cancelNameSubmit').addEventListener('click', closeNameModal);
  document.getElementById('playerNameInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') confirmSubmitPrediction();
    if (e.key === 'Escape') closeNameModal();
  });

  document.getElementById('closePredictionModal').addEventListener('click', closePredictionModal);

  document.getElementById('predictionModal').addEventListener('click', e => {
    if (e.target.id === 'predictionModal') closePredictionModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closePredictionModal();
      closeAwardPickerModal();
    }
  });


  restoreLocalPrediction();
  fillAwards(state.awards);
  computeMatchTeams();
  renderAll();

  document.querySelectorAll(AWARD_SELECT_IDS.map(id => '#' + id).join(',')).forEach(el => {
    el.addEventListener('input', saveLocalPredictionSoon);
    el.addEventListener('change', saveLocalPredictionSoon);
  });

  if (window.location.hash === '#leaderboard') {
    document.querySelector('[data-tab="leaderboard"]').click();
  }
}

document.addEventListener('DOMContentLoaded', init);
