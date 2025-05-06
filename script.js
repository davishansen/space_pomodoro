const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();
const stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2
  });
}
function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#fff';
  stars.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;
    if (s.x < 0 || s.x > w) s.vx *= -1;
    if (s.y < 0 || s.y > h) s.vy *= -1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fill();
  });
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const a = stars[i], b = stars[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const skipBtn = document.getElementById('skip-btn');
const quoteElem = document.getElementById('quote');
let focusDuration = 25 * 60;
let breakDuration = 5 * 60;
let currentTime = focusDuration;
let timer = null;
let isFocus = true;

const quotes = [
  "Discipline is the bridge between goals and accomplishment.",
  "Do one thing with full presence—it’s enough.",
  "Pain is temporary, mastery is forever.",
  "The body obeys. The mind commands.",
  "Keep showing up. That’s the real secret.",
  "What you do repeatedly, you become.",
  "Silence and focus forge clarity."
];

function updateDisplay() {
  const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
  const seconds = String(currentTime % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function showRandomQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteElem.textContent = random;
}

function startTimer() {
  if (timer) return;
  showRandomQuote();
  timer = setInterval(() => {
    currentTime--;
    updateDisplay();
    if (currentTime <= 0) {
      clearInterval(timer);
      timer = null;
      isFocus = !isFocus;
      currentTime = isFocus ? focusDuration : breakDuration;
      showRandomQuote();
      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function skipTimer() {
  stopTimer();
  isFocus = !isFocus;
  currentTime = isFocus ? focusDuration : breakDuration;
  updateDisplay();
  showRandomQuote();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
skipBtn.addEventListener('click', skipTimer);
updateDisplay();

const musicBtn = document.getElementById('music-btn');
const audio = document.getElementById('bg-music');
let isPlaying = false;
musicBtn.addEventListener('click', () => {
  isPlaying ? audio.pause() : audio.play();
  isPlaying = !isPlaying;
  musicBtn.textContent = isPlaying ? '🔇' : '🔊';
});
const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', () => {
  document.getElementById('info-card').classList.add('hidden');
});
