// Canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Game state constants
let leftScore = 0;
let rightScore = 0;
let gameFrame = 0;
let canMove = 1;
var down = false;
ctx.font = '30px Georgia';

// Ball and Goal constants
let ballRadius = 30;
let goalWidth = 10;
let goalHeight = 100;
let x = canvas.width / 2;
let y = canvas.height / 2;

// Goal positioning constants
let leftGoalxPosition = 100 - goalWidth;
let leftGoalyPosition = (canvas.height / 2) - (goalHeight / 2);
let rightGoalxPosition = canvas.width - 100;
let rightGoalyPosition = (canvas.height / 2) - (goalHeight / 2);

drawPlayer(x, y);
drawGoals();

// Event handlers
document.addEventListener("keydown", function (event) {
  if (canMove == 1 && !down) {
if (event.which === 90) {
  // move left if z key is pressed
drawPlayer(x - 10, y);
x -= 10;
drawGoals();
checkIfWin();
down = true;
}
if (event.which === 88) {
  // move right if x key is pressed
drawPlayer(x + 10, y);
x += 10;
drawGoals();
checkIfWin();
down = true;
}
  }
})

document.addEventListener("keyup", function () {
  down = false;

})

document.addEventListener("mousedown", function () {
  if (canMove == 0) {
    reset();
  }
})

// Player
function drawPlayer(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
  }

// Goals
function drawLeftGoal() {
  ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.rect(leftGoalxPosition, leftGoalyPosition, goalWidth, goalHeight);
    ctx.fill();
}

function drawRightGoal() {
  ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.rect(rightGoalxPosition, rightGoalyPosition, goalWidth, goalHeight);
    ctx.fill();
}

function drawGoals() {
  drawLeftGoal();
  drawRightGoal();
}

// Winning condition checks
function checkIfWin() {
  if (ballHitLeftGoal()) {
    lwin();
  } else if (ballHitRightGoal()) {
    rwin();
  } 
}

function ballHitLeftGoal() {
  return getBallLeftPosition() <= leftGoalxPosition + goalWidth;
}

function ballHitRightGoal() {
  return getBallRightPosition() >= rightGoalxPosition - goalWidth;
}

function getBallLeftPosition() {
  return x - ballRadius;
}

function getBallRightPosition() {
  return x + ballRadius;
}

// Winning sequence
function rwin() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.fillText("Red won!", canvas.width / 2, canvas.height / 2);
  canMove = 0;
}

function lwin() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.fillText("Blue won!", canvas.width / 2, canvas.height / 2);
  canMove = 0;
}

function reset() {
x = canvas.width / 2;
y = canvas.height / 2;

drawPlayer(x, y);
drawGoals();
canMove = 1;
}
