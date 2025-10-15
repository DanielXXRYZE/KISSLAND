// 🌙 Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// 🌌 Animated heart background
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Heart particle constructor
function Heart(x, y, size, dx, dy, color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.opacity = Math.random() * 0.5 + 0.5;
  this.delta = Math.random() * 0.02 + 0.01;
}

// Draw heart using parametric equation
Heart.prototype.draw = function () {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.beginPath();
  for (let t = 0; t <= Math.PI * 2; t += 0.1) {
    const x = this.size * 16 * Math.pow(Math.sin(t), 3);
    const y = -this.size * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    if (t === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = `rgba(${parseInt(this.color.slice(1,3),16)},${parseInt(this.color.slice(3,5),16)},${parseInt(this.color.slice(5,7),16)},${this.opacity})`;
  ctx.shadowColor = this.color;
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.restore();
};

// Update heart position and glow
Heart.prototype.update = function () {
  this.x += this.dx;
  this.y += this.dy;

  // Bounce off edges
  if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
  if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

  // Glow pulse
  this.opacity += this.delta;
  if (this.opacity > 1 || this.opacity < 0.3) this.delta *= -1;

  this.draw();
};

// Create hearts with variable speeds
let hearts = [];
const colors = ["#00ff66", "#ff66cc"];
function spawnHeart() {
  const speedMultiplier = Math.random() * 1.5 + 0.5;
  return new Heart(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    Math.random() * 0.8 + 0.3,
    (Math.random() - 0.5) * speedMultiplier,
    (Math.random() - 0.5) * speedMultiplier,
    colors[Math.floor(Math.random() * colors.length)]
  );
}

// Initial hearts
for (let i = 0; i < 60; i++) hearts.push(spawnHeart());

// Animate hearts
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart) => heart.update());
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
// ❤️ Digital Heart Clock (Macedonia Time)
function updateClock() {
  const clock = document.getElementById("time");
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/Skopje"
  };
  const now = new Date().toLocaleTimeString("en-GB", options);
  clock.textContent = now;
}
setInterval(updateClock, 1000);
updateClock();
// 💚 Title Flicker Animation (Every 2 Seconds)
const kissText = document.querySelector(".kiss");

function flickerEffect() {
  kissText.classList.add("flicker");
  setTimeout(() => kissText.classList.remove("flicker"), 300);
}

// Trigger every 2 seconds
setInterval(flickerEffect, 2000);
const playerDiv = document.querySelector('.player');

playerDiv.addEventListener('mouseenter', () => {
  playerDiv.classList.add('glow');
});

playerDiv.addEventListener('mouseleave', () => {
  playerDiv.classList.remove('glow');
});

// Optional: make it glow continuously for a few seconds when clicked
playerDiv.addEventListener('click', () => {
  playerDiv.classList.add('glow');
  setTimeout(() => playerDiv.classList.remove('glow'), 5000); // 5 seconds
});
// ⚡ Lightning Effect (bolt only, 2-second duration)
function triggerLightning() {
  const lightningColor = document.body.classList.contains('light') ? '#ff66cc' : '#00ff66';

  // Random bolt points
  const segments = 6 + Math.floor(Math.random() * 4);
  let x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
  let y = 0;
  const points = [{x, y}];
  for (let i = 0; i < segments; i++) {
    x += (Math.random() - 0.5) * 60;
    y += canvas.height / segments;
    points.push({x, y});
  }

  let alpha = 1; // start fully visible
  const fadeStep = 1 / (2 * 60); // 2 seconds at ~60fps

  function drawLightning() {
    // Draw only the bolt
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = lightningColor;
    ctx.globalAlpha = alpha; // fade effect
    ctx.lineWidth = 2 + Math.random() * 4;
    ctx.shadowBlur = 20 + Math.random() * 15;
    ctx.shadowColor = lightningColor;
    ctx.stroke();
    ctx.globalAlpha = 1; // reset alpha

    alpha -= fadeStep;
    if (alpha > 0) {
      requestAnimationFrame(drawLightning);
    }
  }

  drawLightning();
}

// Trigger lightning every 5 seconds
setInterval(triggerLightning, 5000);







