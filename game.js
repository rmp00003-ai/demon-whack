'use strict';

const DIFFICULTY_CONFIG = {
  easy:   { attackInterval: 5000, speed: 55,  hp: 5,  spawnInterval: 3000, knockRadius: 90 },
  medium: { attackInterval: 3500, speed: 90,  hp: 8,  spawnInterval: 2200, knockRadius: 100 },
  hard:   { attackInterval: 2000, speed: 130, hp: 12, spawnInterval: 1500, knockRadius: 110 }
};
const RAGE_MAX = 10;
const MAX_PLATFORM_CHARS = 14;

let state = {
  difficulty: null, mode: null,
  hp: 0, maxHp: 0, rage: 0,
  currentWord: '', currentWordData: null, progress: 0,
  challengeType: 'zh',
  characters: [],
  attackTimer: null, animFrameId: null, skyTimer: null,
  level: 1, wordsDefeated: 0,
  running: false, wm: null
};

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
  Object.assign(state, {
    difficulty, mode,
    hp: cfg.hp, maxHp: cfg.hp, rage: 0,
    level: 1, wordsDefeated: 0, running: true,
    characters: [], progress: 0,
    wm: new WordManager(difficulty)
  });

  updateBars();
  updateLevelInfo();
  spawnStars();
  showScreen('game');
  hideWordInfo();
  loadNextWord();
  scheduleAttack();
  startSkySpawn();
  lastTime = 0;
  requestAnimationFrame(gameLoop);
}

// ─── Word loading ─────────────────────────────────────────────────────────────
function loadNextWord() {
  state.currentWordData = state.wm.next();
  state.currentWord = state.currentWordData.en;
  state.progress = 0;
  state.challengeType = pickChallengeType();
  renderChallenge();
  renderProgress();
  spawnCharacters();
}

function pickChallengeType() {
  const r = Math.random();
  if (state.difficulty === 'easy')   return r < 0.85 ? 'zh' : 'blank';
  if (state.difficulty === 'medium') return r < 0.5  ? 'zh' : 'blank';
  return r < 0.2 ? 'zh' : 'blank';
}

function renderChallenge() {
  const el = $('target-word');
  if (state.challengeType === 'zh') {
    el.textContent = state.currentWordData.zh;
    el.style.fontSize = 'clamp(1.4rem, 6vw, 2.4rem)';
  } else {
    el.textContent = Array(state.currentWord.length).fill('＿').join(' ');
    el.style.fontSize = 'clamp(1rem, 4vw, 1.6rem)';
  }
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
    const charObj = createCharElement(item, i, charW);
    charObj.x = (i / letters.length) * usableW;
    charObj.el.style.left = charObj.x + 'px';
    charObj.el.classList.add('char-landing');
    setTimeout(() => charObj.el.classList.remove('char-landing'), 500);
    container.appendChild(charObj.el);
    state.characters.push(charObj);
  });
}

function createCharElement(item, colorIndex, charW) {
  const wrap = document.createElement('div');
  wrap.className = 'char-wrap';
  wrap.style.width = (charW || 70) + 'px';
  wrap.innerHTML = createCharacterSVG(item.ch, colorIndex);

  const speed = DIFFICULTY_CONFIG[state.difficulty].speed * (0.7 + Math.random() * 0.6);
  const dir = Math.random() < 0.5 ? 1 : -1;
  const charObj = { el: wrap, x: 0, dir, speed, item, alive: true };

  wrap.addEventListener('pointerdown', e => { e.preventDefault(); handleClick(charObj); });
  return charObj;
}

function spawnOneFromSky() {
  if (!state.running) return;
  const container = $('characters-container');
  const platformChars = state.characters.filter(c => c.alive).length;
  if (platformChars >= MAX_PLATFORM_CHARS) return;

  const containerW = container.offsetWidth;
  const charW = Math.min(80, containerW * 0.12);

  // Find needed letters not already on platform
  const neededLetters = [];
  for (let i = state.progress; i < state.currentWord.length; i++) {
    const alreadyPresent = state.characters.some(c => c.alive && c.item.isCorrect && c.item.index === i);
    if (!alreadyPresent) neededLetters.push({ ch: state.currentWord[i], index: i, isCorrect: true });
  }

  let item;
  if (neededLetters.length > 0 && Math.random() < 0.78) {
    item = neededLetters[Math.floor(Math.random() * neededLetters.length)];
  } else {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let ch;
    do { ch = alphabet[Math.floor(Math.random() * 26)]; } while (state.currentWord.includes(ch));
    item = { ch, index: null, isCorrect: false };
  }

  const colorIndex = Math.floor(Math.random() * 6);
  const charObj = createCharElement(item, colorIndex, charW);
  charObj.x = Math.random() * (containerW - charW);
  charObj.el.style.left = charObj.x + 'px';
  charObj.el.classList.add('char-landing');
  setTimeout(() => charObj.el.classList.remove('char-landing'), 500);

  container.appendChild(charObj.el);
  state.characters.push(charObj);
}

function startSkySpawn() {
  clearInterval(state.skyTimer);
  const interval = DIFFICULTY_CONFIG[state.difficulty].spawnInterval;
  state.skyTimer = setInterval(spawnOneFromSky, interval);
}

// ─── Game loop ────────────────────────────────────────────────────────────────
let lastTime = 0;
function gameLoop(timestamp) {
  if (!state.running) return;
  const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
  lastTime = timestamp;

  const container = $('characters-container');
  const containerW = container.offsetWidth;

  state.characters = state.characters.filter(ch => {
    if (!ch.alive) return false;
    return true;
  });

  state.characters.forEach(ch => {
    ch.x += ch.dir * ch.speed * dt;
    const maxX = containerW - ch.el.offsetWidth;
    if (ch.x <= 0)   { ch.x = 0;    ch.dir = 1; }
    if (ch.x >= maxX) { ch.x = maxX; ch.dir = -1; }
    ch.el.style.left = ch.x + 'px';
  });

  state.animFrameId = requestAnimationFrame(gameLoop);
}

// ─── Click handling ───────────────────────────────────────────────────────────
function handleClick(charObj) {
  if (!state.running || !charObj.alive) return;
  const { item, el } = charObj;

  if (item.isCorrect && item.index === state.progress) {
    el.classList.add('correct-flash');
    state.progress++;
    renderProgress();
    setTimeout(() => el.classList.remove('correct-flash'), 300);

    if (state.progress === state.currentWord.length) {
      state.wordsDefeated++;
      demonHurt();
    }
  } else {
    el.classList.add('wrong-flash');
    setTimeout(() => el.classList.remove('wrong-flash'), 300);
    addRage(1);
  }
}

// ─── Demon ────────────────────────────────────────────────────────────────────
function demonHurt() {
  state.hp--;
  updateBars();
  showWordInfo(state.currentWordData);

  const dw = $('demon-wrap');
  dw.classList.remove('attacking-left', 'attacking-right');
  dw.classList.add('hurt');
  setTimeout(() => {
    dw.classList.remove('hurt');
    if (state.hp <= 0) {
      if (state.mode === 'level') nextLevel();
      else endGame(true);
    } else {
      loadNextWord();
    }
  }, 500);
}

function demonArmAttack() {
  if (!state.running) return;
  const side = Math.random() < 0.5 ? 'left' : 'right';
  const dw = $('demon-wrap');
  dw.classList.remove('attacking-left', 'attacking-right', 'hurt');
  dw.classList.add('attacking-' + side);
  setTimeout(() => dw.classList.remove('attacking-' + side), 500);

  // Knock off characters on that side
  const container = $('characters-container');
  const containerW = container.offsetWidth;
  const hitX = side === 'left'
    ? containerW * (0.1 + Math.random() * 0.3)
    : containerW * (0.6 + Math.random() * 0.3);
  knockOffNearX(hitX);

  addRage(1);
}

function knockOffNearX(hitX) {
  const radius = DIFFICULTY_CONFIG[state.difficulty].knockRadius;
  state.characters.forEach(ch => {
    if (!ch.alive) return;
    const charCenter = ch.x + ch.el.offsetWidth / 2;
    if (Math.abs(charCenter - hitX) < radius) {
      ch.alive = false;
      ch.el.classList.add('knocked-off');
      setTimeout(() => ch.el.remove(), 400);
    }
  });
  state.characters = state.characters.filter(c => c.alive);

  // Show impact flash on platform
  showImpact(hitX);
}

function showImpact(x) {
  const board = $('platform-board');
  const imp = document.createElement('div');
  imp.className = 'impact-flash';
  imp.style.left = x + 'px';
  board.appendChild(imp);
  setTimeout(() => imp.remove(), 400);
}

function scheduleAttack() {
  clearTimeout(state.attackTimer);
  const cfg = DIFFICULTY_CONFIG[state.difficulty];
  const interval = cfg._currentInterval || cfg.attackInterval;
  state.attackTimer = setTimeout(() => {
    if (!state.running) return;
    demonArmAttack();
    scheduleAttack();
  }, interval);
}

// ─── Rage ─────────────────────────────────────────────────────────────────────
function addRage(amount) {
  state.rage = Math.min(state.rage + amount, RAGE_MAX);
  updateBars();
  if (state.rage >= RAGE_MAX) endGame(false);
}

// ─── Level mode ───────────────────────────────────────────────────────────────
function nextLevel() {
  state.level++;
  const cfg = DIFFICULTY_CONFIG[state.difficulty];
  state.maxHp = cfg.hp + state.level - 1;
  state.hp = state.maxHp;
  state.rage = Math.max(0, state.rage - 3);
  cfg._currentInterval = Math.max(800, cfg.attackInterval * Math.pow(0.9, state.level - 1));
  updateBars();
  updateLevelInfo();
  clearTimeout(state.attackTimer);
  scheduleAttack();
  loadNextWord();
}

// ─── Word info panel ──────────────────────────────────────────────────────────
let wordInfoTimer = null;
function showWordInfo(data) {
  clearTimeout(wordInfoTimer);
  const panel = $('word-info');
  $('wi-zh').textContent = data.zh;
  $('wi-en').textContent = data.en;
  $('wi-ipa').textContent = data.ipa;
  panel.classList.remove('hidden');
  wordInfoTimer = setTimeout(hideWordInfo, 4000);
}

function hideWordInfo() {
  $('word-info').classList.add('hidden');
}

// ─── End game ─────────────────────────────────────────────────────────────────
function endGame(win) {
  state.running = false;
  clearTimeout(state.attackTimer);
  clearInterval(state.skyTimer);
  cancelAnimationFrame(state.animFrameId);
  hideWordInfo();

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

window.addEventListener('resize', () => {
  if (state.running) spawnCharacters();
});
