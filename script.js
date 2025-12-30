// -------- Modal Controls --------
function openPong() {
  document.getElementById("pongModal").style.display = "flex";
  drawScene();
}
function closePong() {
  document.getElementById("pongModal").style.display = "none";
  pausePong();
}

// -------- PONG GAME ENGINE --------

// Canvas
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let running = false;
let playerScore = 0;
let cpuScore = 0;

const paddle = {
  width: 10,
  height: 70,
};

let player = { x: 20, y: canvas.height/2 - 35 };
let cpu = { x: canvas.width - 30, y: canvas.height/2 - 35 };

let ball = {
  x: canvas.width/2,
  y: canvas.height/2,
  size: 8,
  vx: 4,
  vy: 2,
};

function drawScene() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // net
  ctx.fillStyle = "white";
  for (let y = 0; y < canvas.height; y += 20) {
    ctx.fillRect(canvas.width/2 - 2, y, 4, 10);
  }

  // paddles
  ctx.fillRect(player.x, player.y, paddle.width, paddle.height);
  ctx.fillRect(cpu.x, cpu.y, paddle.width, paddle.height);

  // ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fill();
}

function update() {
  if (!running) return;

  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y < 0 || ball.y > canvas.height) ball.vy *= -1;

  if (
    ball.x < player.x + paddle.width &&
    ball.y > player.y &&
    ball.y < player.y + paddle.height
  ) {
    ball.vx *= -1;
  }

  if (
    ball.x > cpu.x &&
    ball.y > cpu.y &&
    ball.y < cpu.y + paddle.height
  ) {
    ball.vx *= -1;
  }

  if (ball.x < 0) {
    cpuScore++;
    document.getElementById("cpuScore").textContent = cpuScore;
    resetBall();
  }

  if (ball.x > canvas.width) {
    playerScore++;
    document.getElementById("playerScore").textContent = playerScore;
    resetBall();
  }

  cpu.y += (ball.y - (cpu.y + paddle.height/2)) * 0.05;

  drawScene();
  requestAnimationFrame(update);
}

function resetBall() {
  ball.x = canvas.width/2;
  ball.y = canvas.height/2;
  ball.vx *= -1;
  ball.vy = (Math.random() - 0.5) * 6;
}

function startPong() {
  if (!running) {
    running = true;
    update();
  }
}

function pausePong() {
  running = false;
}

function resetPong() {
  running = false;
  playerScore = 0;
  cpuScore = 0;
  document.getElementById("playerScore").textContent = 0;
  document.getElementById("cpuScore").textContent = 0;
  resetBall();
  drawScene();
}


// Open & close password modal
function openPrivate() {
  document.getElementById("privateModal").style.display = "flex";
}

function closePrivate() {
  document.getElementById("privateModal").style.display = "none";
  document.getElementById("privError").textContent = "";
  document.getElementById("privPass").value = "";
}

// Password system
const PRIVATE_PASSWORD = "shidu123"; // <-- change this

function checkPrivate() {
  let entered = document.getElementById("privPass").value;

  if (entered === PRIVATE_PASSWORD) {

      // hide modal
      document.getElementById("privateModal").style.display = "none";

      // show hidden section
      document.getElementById("privateContent").style.display = "block";

  } else {
      // show error + shake
      let error = document.getElementById("privError");
      error.textContent = "Incorrect password!";
      error.style.animation = "shake 0.3s";

      setTimeout(() => (error.style.animation = ""), 300);
  }
}
function openWindow(id) {
  document.getElementById(id).style.display = "block";
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}

