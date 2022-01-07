const grid = document.querySelector(".grid");
const startButton = document.querySelector("#start");
const scoreDisplay = document.querySelector("#score");
let score = 0;
const squares = [];
let currentSnake = [2, 1, 0];
let appleIndex = 0;

let direction = 1;
const width = 10;
let intervalTime = 1000;
let speedRate = 0.9;
let timerId = 0;
const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");
const overlay = document.getElementById("overlay");
const finalScore = document.getElementById("final-score");

function startGame() {
  currentSnake.forEach((index) => {
    squares[index].classList.remove("snake");
  });

  squares[appleIndex].classList.remove("apple");

  score = 0;
  currentSnake = [2, 1, 0];

  currentSnake.forEach((index) => {
    squares[index].classList.add("snake");
  });
  direction = 1;
  scoreDisplay.textContent = score;
  generateApples();

  clearInterval(timerId);
  intervalTime = 1000;
  timerId = setInterval(move, intervalTime);
}

function createGrid() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach((index) => {
  squares[index].classList.add("snake");
});

function move() {
  if (
    // hit wall
    (currentSnake[0] + width >= width * width && direction === width) || 
    (currentSnake[0] % width === width - 1 && direction === 1) || 
    (currentSnake[0] % width === 0 && direction === -1) || 
    (currentSnake[0] - width < 0 && direction === -width) || 
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    gameOver(score);
    return clearInterval(timerId);
  }

  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  squares[currentSnake[0]].classList.add("snake");

  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");

    squares[tail].classList.add("snake");
    currentSnake.push(tail);

    generateApples();

    score++;
    scoreDisplay.textContent = score;

    intervalTime *= speedRate;

    clearInterval(timerId);
    timerId = setInterval(move, intervalTime);
  }
}

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * width * width);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}
generateApples();

function moveControl(event) {
  switch (event.key) {
    case "Down":
    case "ArrowDown":
      if (direction != -10) direction = 10;
      break;
    case "Up":
    case "ArrowUp":
      if (direction != 10) direction = -10;
      break;
    case "Left":
    case "ArrowLeft":
      if (direction != 1) direction = -1;
      break;
    case "Right":
    case "ArrowRight":
      if (direction != -1) direction = 1;
      break;
  }
}
document.addEventListener("keyup", moveControl);

up.addEventListener("click", function () {
  if (direction != 10) direction = -10;
});

down.addEventListener("click", function () {
  if (direction != -10) direction = 10;
});

left.addEventListener("click", function () {
  if (direction != 1) direction = -1;
});

right.addEventListener("click", function () {
  if (direction != -1) direction = 1;
});

function gameOver(score) {
  overlay.style.display = "block";
  finalScore.textContent = `Your score is : ${score}！`;
}

startButton.addEventListener("click", startGame);
document.getElementById("restart").addEventListener("click", function () {
  overlay.style.display = "none";
  finalScore.textContent = "";
  startGame();
});

document.getElementById("quit").addEventListener("click", function () {
  overlay.style.display = "none";
  finalScore.textContent = "";
});
