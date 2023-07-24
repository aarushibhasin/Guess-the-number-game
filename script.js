"use strict";
let currentScore = 20;
let highscore = 0;
let target;
let messageElement = document.querySelector("#message");
let checkElement = document.querySelector(".check");
let guessElement = document.querySelector(".guess");
let bodyElement = document.querySelector("body");
let secretNumberElement = document.querySelector(".number");
let scoreElement = document.querySelector(".score");
const audio = new Audio("click.mp3");
const audiowin = new Audio("sound-click.mp3");

const resetGame = () => {
  currentScore = 20;
  generateNumber();
  guessElement.value = "";
  messageElement.textContent = "Start Guessing...";
  secretNumberElement.style.display = "none";
  scoreElement.textContent = currentScore;
  bodyElement.classList.remove("win");
};

checkElement.addEventListener("click", function () {
  audio.play();
  const guess = Number(guessElement.value);
  let messageText = "No Number";

  if (guess < 0 || guess > 20) {
    messageText = "Invalid Number!";
  } else if (guess === target) {
    onWinning();
    return;
  } else {
    messageText = guess < target ? "Too Low" : "Too High";
    scoreElement.textContent = --currentScore;
  }

  messageElement.textContent = messageText;
  messageElement.classList.add("animate");
  setTimeout(() => {
    messageElement.classList.remove("animate");
  }, 500);
});

const onWinning = () => {
  audiowin.play();
  messageElement.textContent = "Correct Number!";
  secretNumberElement.style.display = "block";
  bodyElement.classList.add("win");
  setHighScore(currentScore);
};

function setHighScore(currentScore) {
  if (currentScore > highscore) {
    highscore = currentScore;
    document.querySelector(".highscore").textContent = highscore;
  }
}

function generateNumber() {
  target = Math.trunc(Math.random() * 20) + 1;

  console.log("target number is :", target);
  document.querySelector(".number").textContent = target;
}

document.querySelector(".again").addEventListener("click", function () {
  resetGame();
});

resetGame();
