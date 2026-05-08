'use strict';

// ─── Config ───────────────────────────────────────────────────────────────────
const DIFFICULTY_CONFIG = {
  easy:   { attackInterval: 5000, speed: 60,  hp: 5,  hpPerWord: 1 },
  medium: { attackInterval: 3500, speed: 100, hp: 8,  hpPerWord: 1 },
  hard:   { attackInterval: 2000, speed: 150, hp: 12, hpPerWord: 1 }
};
const RAGE_MAX = 10;

// ─── State ────────────────────────────────────────────────────────────────────
let state = {
  difficulty: null, mode: null,
  hp: 0, maxHp: 0, rage: 0,
  currentWord: '', progress: 0,
  characters: [],
  attackTimer: null, animFrameId: null,
  level: 1, wordsDefeated: 0,
  running: false, wm: null
};

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const screens = { start: $('screen-start'), game: $('screen-game'), result: $('screen-result') };

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ─── Start screen ─────────────────────────────────────────────────────────────
let selectedDiff = null, selectedMode = null;

document.querySelectorAll('[data-diff]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-diff]').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedDiff = btn.dataset.diff;
    checkStartReady();
  });
});
document.querySelectorAll('[data-mode]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMode = btn.dataset.mode;
    checkStartReady();
  });
});

function checkStartReady() {
  $('btn-start').disabled = !(selectedDiff && selectedMode);
}

$('btn-start').addEventListener('click', () => {
  if (!selectedDiff || !selectedMode) return;
  startGame(selectedDiff, selectedMode);
});

$('btn-play-again').addEventListener('click', () => showScreen('start'));

// ─── Game init ────────────────────────────────────────────────────────────────
function startGame(difficulty, mode) {
  const cfg = DIFFICULTY_CONFIG[difficulty];
  state.difficulty = difficulty;
  state.mode = mode;
  state.hp = cfg.hp;
  state.maxHp = cfg.hp;
  state.rage = 0;
  state.level = 1;
  state.wordsDefeated = 0;
  state.running = true;
  state.wm = new WordManager(difficulty);

  updateBars();
  updateLevelInfo();
  spawnStars();
  showScreen('game');
  loadNextWord();
  scheduleAttack();
  requestAnimationFrame(gameLoop);
}

// ─── Word / Characters ────────────────────────────────────────────────────────
function loadNextWord() {
  state.currentWord = state.wm.next();
  state.progress = 0;
  renderTargetWord();
  renderProgress();
  spawnCharacters();
}

function renderTargetWord() {
  $('target-word').textContent = state.currentWord.split('').join(' ');
}

function renderProgress() {
  const wrap = $('progress-wrap');
  wrap.innerHTML = '';
  for (let i = 0; i < state.currentWord.length; i++) {
    const d = document.createElement('div');
    d.className = 'prog-letter' + (i < state.progress ? ' filled' : '');
    d.textContent = i < state.progress ? state.currentWord[i] : '';
    wrap.appendChild(d);
  }
}

// ─── Characters ───────────────────────────────────────────────────────────────
function spawnCharacters() {
  const container = $('characters-container');
  container.innerHTML = '';
  state.characters = [];

  const letters = state.wm.buildLetters(state.currentWord);
  const containerW = container.offsetWidth;
  const charW = Math.min(80, containerW * 0.12);
  const usableW = containerW - charW;

  letters.forEach((item, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'char-wrap';
    wrap.style.width = charW + 'px';
    wrap.innerHTML = createCharacterSVG(item.ch, i, !item.isCorrect);

    // Initial position spread
    const x = (i / letters.length) * usableW;
    wrap.style.left = x + 'px';

    // Random direction & speed variation
    const speed = (DIFFICULTY_CONFIG[state.difficulty].speed) * (0.7 + Math.random() * 0.6);
    const dir = Math.random() < 0.5 ? 1 : -1;
    const charObj = { el: wrap, x, dir, speed, item };

    wrap.addEventListener('pointerdown', e => { e.preventDefault(); handleClick(charObj); });
    container.appendChild(wrap);
    state.characters.push(charObj);
  });
}

function handleClick(charObj) {
  if (!state.running) return;
  const { item, el } = charObj;

  if (item.isCorrect && item.index === state.progress) {
    // Correct!
    el.classList.add('correct-flash');
    state.progress++;
    renderProgress();
    setTimeout(() => el.classList.remove('correct-flash'), 300);

    if (state.progress === state.currentWord.length) {
      // Word complete
      state.wordsDefeated++;
      demonHurt();
    }
  } else if (!item.isCorrect || item.index !== state.progress) {
    // Wrong
    el.classList.add('wrong-flash');
    setTimeout(() => el.classList.remove('wrong-flash'), 300);
    addRage(1);
  }
}

// ─── Game loop (character movement) ──────────────────────────────────────────
let lastTime = 0;
function gameLoop(timestamp) {
  if (!state.running) return;
  const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
  lastTime = timestamp;

  const container = $('characters-container');
  const containerW = container.offsetWidth;

  state.characters.forEach(ch => {
    ch.x += ch.dir * ch.speed * dt;
    const maxX = containerW - ch.el.offsetWidth;
    if (ch.x <= 0) { ch.x = 0; ch.dir = 1; }
    if (ch.x >= maxX) { ch.x = maxX; ch.dir = -1; }
    ch.el.style.left = ch.x + 'px';
  });

  state.animFrameId = requestAnimationFrame(gameLoop);
}

// ─── Demon ────────────────────────────────────────────────────────────────────
function demonHurt() {
  state.hp--;
  updateBars();
  const dw = $('demon-wrap');
  dw.classList.remove('attacking');
  dw.classList.add('hurt');
  setTimeout(() => {
    dw.classList.remove('hurt');
    if (state.hp <= 0) {
      if (state.mode === 'level') {
        nextLevel();
      } else {
        endGame(true);
      }
    } else {
      loadNextWord();
    }
  }, 400);
}

function demonAttack() {
  if (!state.running) return;
  const dw = $('demon-wrap');
  dw.classList.remove('hurt');
  dw.classList.add('attacking');
  setTimeout(() => dw.classList.remove('attacking'), 300);
  addRage(1);
}

function scheduleAttack() {
  clearTimeout(state.attackTimer);
  const interval = DIFFICULTY_CONFIG[state.difficulty].attackInterval;
  state.attackTimer = setTimeout(() => {
    if (!state.running) return;
    demonAttack();
    scheduleAttack();
  }, interval);
}

// ─── Rage ─────────────────────────────────────────────────────────────────────
function addRage(amount) {
  state.rage = Math.min(state.rage + amount, RAGE_MAX);
  updateBars();
  if (state.rage >= RAGE_MAX) endGame(false);
}

// ─── Level (level mode) ───────────────────────────────────────────────────────
function nextLevel() {
  state.level++;
  const cfg = DIFFICULTY_CONFIG[state.difficulty];
  // Increase max HP per level
  state.maxHp = cfg.hp + state.level - 1;
  state.hp = state.maxHp;
  state.rage = Math.max(0, state.rage - 3); // partial rage reset
  updateBars();
  updateLevelInfo();
  clearTimeout(state.attackTimer);
  // Speed up attack by 10% per level
  const newInterval = Math.max(800, cfg.attackInterval * Math.pow(0.9, state.level - 1));
  DIFFICULTY_CONFIG[state.difficulty]._currentInterval = newInterval;
  scheduleAttack();
  loadNextWord();
}

// ─── End game ─────────────────────────────────────────────────────────────────
function endGame(win) {
  state.running = false;
  clearTimeout(state.attackTimer);
  cancelAnimationFrame(state.animFrameId);

  const title = $('result-title');
  title.textContent = win ? '勝利！' : '失敗';
  title.className = win ? 'win' : 'lose';

  $('result-stats').innerHTML = `
    <div>打倒單字：<span>${state.wordsDefeated}</span> 個</div>
    ${state.mode === 'level' ? `<div>到達關卡：<span>第 ${state.level} 關</span></div>` : ''}
    <div>難度：<span>${{easy:'簡單',medium:'普通',hard:'困難'}[state.difficulty]}</span></div>
  `;

  setTimeout(() => showScreen('result'), win ? 600 : 300);
}

// ─── UI helpers ───────────────────────────────────────────────────────────────
function updateBars() {
  $('hp-fill').style.width = (state.hp / state.maxHp * 100) + '%';
  $('rage-fill').style.width = (state.rage / RAGE_MAX * 100) + '%';
}

function updateLevelInfo() {
  $('level-info').textContent = state.mode === 'level' ? `第 ${state.level} 關` : '';
}

function spawnStars() {
  const container = document.querySelector('.stars');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 60 + '%';
    s.style.animationDelay = Math.random() * 2 + 's';
    s.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    container.appendChild(s);
  }
}

// ─── Resize handler ───────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  if (state.running) spawnCharacters();
});
