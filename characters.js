// SVG character colors
const CHAR_COLORS = ['#FF006E','#7209B7','#3A86FF','#06D6A0','#FB5607','#FFBE0B'];

function createDemonSVG() {
  return `<svg id="demon-svg" viewBox="-80 -120 160 180" xmlns="http://www.w3.org/2000/svg">
    <!-- Body -->
    <ellipse cx="0" cy="30" rx="44" ry="50" fill="#1565C0" stroke="#FFD93D" stroke-width="3.5"/>
    <!-- Head -->
    <circle cx="0" cy="-10" r="40" fill="#1565C0" stroke="#FFD93D" stroke-width="3.5"/>
    <!-- Glow ring -->
    <circle cx="0" cy="-10" r="46" fill="none" stroke="#FFD93D" stroke-width="1" opacity="0.25"/>
    <!-- Left horn -->
    <path d="M -24,-44 L -36,-86 L -8,-54 Z" fill="#FF006E" stroke="#FFD93D" stroke-width="2.5"/>
    <!-- Right horn -->
    <path d="M 24,-44 L 36,-86 L 8,-54 Z" fill="#FF006E" stroke="#FFD93D" stroke-width="2.5"/>
    <!-- Eyes white -->
    <ellipse cx="-14" cy="-16" rx="12" ry="13" fill="#FFD93D" stroke="#222" stroke-width="2"/>
    <ellipse cx="14" cy="-16" rx="12" ry="13" fill="#FFD93D" stroke="#222" stroke-width="2"/>
    <!-- Pupils -->
    <circle cx="-12" cy="-14" r="7" fill="#8B0000"/>
    <circle cx="16" cy="-14" r="7" fill="#8B0000"/>
    <!-- Eye shine -->
    <circle cx="-9" cy="-17" r="2.5" fill="#FFD93D"/>
    <circle cx="19" cy="-17" r="2.5" fill="#FFD93D"/>
    <!-- Angry brows -->
    <path d="M -26,-30 L -6,-24" stroke="#FF006E" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M 26,-30 L 6,-24" stroke="#FF006E" stroke-width="4.5" stroke-linecap="round"/>
    <!-- Mouth -->
    <path d="M -18,6 Q 0,22 18,6" stroke="#FFD93D" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Teeth -->
    <rect x="-12" y="6" width="9" height="11" rx="2" fill="white" stroke="#FFD93D" stroke-width="1.5"/>
    <rect x="3" y="6" width="9" height="11" rx="2" fill="white" stroke="#FFD93D" stroke-width="1.5"/>
    <!-- Club -->
    <g id="demon-club">
      <rect x="52" y="-28" width="13" height="70" rx="5" fill="#4A148C" stroke="#FFD93D" stroke-width="2.5"/>
      <circle cx="58.5" cy="-33" r="11" fill="#FF006E" stroke="#FFD93D" stroke-width="2.5"/>
      <circle cx="58.5" cy="-49" r="9" fill="#FF006E" stroke="#FFD93D" stroke-width="2"/>
      <circle cx="58.5" cy="-63" r="7" fill="#FF006E" stroke="#FFD93D" stroke-width="2"/>
    </g>
  </svg>`;
}

function createCharacterSVG(letter, colorIndex, isDistractor) {
  const bodyColor = isDistractor ? '#2a2a2a' : CHAR_COLORS[colorIndex % CHAR_COLORS.length];
  const cardColor = isDistractor ? '#333' : CHAR_COLORS[colorIndex % CHAR_COLORS.length];
  const letterColor = isDistractor ? '#555' : 'white';
  const outlineColor = isDistractor ? '#555' : '#FFD93D';
  const skinColor = '#FFDBB5';

  return `<svg class="char-svg" viewBox="-30 -20 90 90" xmlns="http://www.w3.org/2000/svg">
    <!-- Body -->
    <ellipse cx="10" cy="38" rx="15" ry="18" fill="${bodyColor}" stroke="${outlineColor}" stroke-width="2.5"/>
    <!-- Head -->
    <circle cx="10" cy="12" r="16" fill="${skinColor}" stroke="${outlineColor}" stroke-width="2.5"/>
    <!-- Left leg -->
    <line x1="4" y1="55" x2="-2" y2="74" stroke="${outlineColor}" stroke-width="4" stroke-linecap="round"/>
    <!-- Right leg -->
    <line x1="16" y1="55" x2="22" y2="72" stroke="${outlineColor}" stroke-width="4" stroke-linecap="round"/>
    <!-- Letter card -->
    <rect x="26" y="20" width="30" height="30" rx="5" fill="${cardColor}" stroke="${outlineColor}" stroke-width="2.5"/>
    <text x="41" y="41" text-anchor="middle" fill="${letterColor}" font-size="17" font-weight="900" font-family="'Noto Serif JP', serif">${letter}</text>
    <!-- Eyes -->
    <circle cx="4" cy="10" r="4" fill="white" stroke="${outlineColor}" stroke-width="1.5"/>
    <circle cx="16" cy="10" r="4" fill="white" stroke="${outlineColor}" stroke-width="1.5"/>
    <circle cx="5" cy="11" r="2" fill="#222"/>
    <circle cx="17" cy="11" r="2" fill="#222"/>
  </svg>`;
}
