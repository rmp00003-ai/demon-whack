const WORD_LISTS = {
  easy: [
    'CAT','DOG','RUN','FLY','BIG','RED','SUN','HOT','CUP','BAT',
    'MAP','HAT','PEN','BOX','BUS','ANT','OWL','EGG','JAM','WEB',
    'JUMP','FROG','BIRD','WIND','RAIN','FISH','CAKE','MILK','BELL','DOOR',
    'FIRE','COLD','FAST','DARK','SOFT','HAND','TREE','LEAF','MOON','STAR'
  ],
  medium: [
    'APPLE','CLOUD','FLAME','GREEN','STONE','RIVER','SWORD','TIGER','SNAKE','EAGLE',
    'BRAVE','MAGIC','OCEAN','PLANT','LUCKY','FROST','STORM','LIGHT','HEART','BLOOD',
    'DANCE','DREAM','NIGHT','POWER','SMILE','SPACE','TRACK','WATER','YOUNG','ZEBRA',
    'ANGEL','BLACK','CRANE','EARTH','FAIRY','GHOST','HONEY','IVORY','JEWEL','KNIFE'
  ],
  hard: [
    'CRYSTAL','THUNDER','JOURNEY','CAPTAIN','DIAMOND','FANTASY','GRAVITY','HORIZON',
    'KINGDOM','LANTERN','MYSTERY','PHANTOM','RAINBOW','SILENCE','VILLAGE','WARRIOR',
    'ANCIENT','COMBINE','DESTINY','ENCHANT','FORTUNE','HARVEST','IMAGINE','JUSTICE',
    'WEATHER','VICTORY','BALANCE','COURAGE','EMPEROR','FREEDOM'
  ]
};

// Fisher-Yates shuffle
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class WordManager {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.pool = shuffleArray(WORD_LISTS[difficulty]);
    this.index = 0;
  }

  next() {
    if (this.index >= this.pool.length) {
      this.pool = shuffleArray(WORD_LISTS[this.difficulty]);
      this.index = 0;
    }
    return this.pool[this.index++];
  }

  // Build letter array: correct letters + distractors
  buildLetters(word) {
    const difficulty = this.difficulty;
    const distract = { easy: 2, medium: 3, hard: 5 }[difficulty];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const wordLetters = word.split('').map((ch, i) => ({ ch, index: i, isCorrect: true }));

    const distractors = [];
    while (distractors.length < distract) {
      const ch = alphabet[Math.floor(Math.random() * 26)];
      if (!word.includes(ch)) {
        distractors.push({ ch, index: null, isCorrect: false });
      }
    }

    return shuffleArray([...wordLetters, ...distractors]);
  }
}
