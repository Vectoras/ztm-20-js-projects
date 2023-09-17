import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");

const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");
const playerLizard = document.getElementById("playerLizard");
const playerSpock = document.getElementById("playerSpock");

const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");
const computerLizard = document.getElementById("computerLizard");
const computerSpock = document.getElementById("computerSpock");

const allGameIcons = document.querySelectorAll(".far");
const resultText = document.getElementById("resultText");

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = "";

// Reset all 'selected' icons
function resetSelected() {
  allGameIcons.forEach((currentIcon) => currentIcon.classList.remove("selected"));
}

// Reset Score & playerChoice/computerChoice
function resetAll() {
  resetSelected();
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  resultText.textContent = "";
}

window.resetAll = resetAll;

// Random computer choice, and display
function computerRandomChoice() {
  const computerChoiceNumber = Math.floor(Math.random() * 5);

  switch (computerChoiceNumber) {
    case 0:
      computerChoice = "rock";
      computerRock.classList.add("selected");
      computerChoiceEl.textContent = " --- Rock";
      break;
    case 1:
      computerChoice = "paper";
      computerPaper.classList.add("selected");
      computerChoiceEl.textContent = " --- Paper";
      break;
    case 2:
      computerChoice = "scissors";
      computerScissors.classList.add("selected");
      computerChoiceEl.textContent = " --- Scissors";
      break;
    case 3:
      computerChoice = "lizard";
      computerLizard.classList.add("selected");
      computerChoiceEl.textContent = " --- Lizard";
      break;
    case 4:
      computerChoice = "spock";
      computerSpock.classList.add("selected");
      computerChoiceEl.textContent = " --- Spock";
      break;
  }
}

// Check results, increase scores, update resultText
function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
    stopConfetti();
    removeConfetti();
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) != -1) {
      resultText.textContent = "You win!";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
      startConfetti();
    } else {
      resultText.textContent = "Computer wins!";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
      stopConfetti();
      removeConfetti();
    }
  }
}

// Call functions to process turn
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  updateScore(playerChoice);
}

// Passing player selection value and styling icons
function select(playerChoice) {
  checkResult(playerChoice);

  switch (playerChoice) {
    case "rock":
      playerRock.classList.add("selected");
      playerChoiceEl.textContent = " --- Rock";
      break;
    case "paper":
      playerPaper.classList.add("selected");
      playerChoiceEl.textContent = " --- Paper";
      break;
    case "scissors":
      playerScissors.classList.add("selected");
      playerChoiceEl.textContent = " --- Scissors";
      break;
    case "lizard":
      playerLizard.classList.add("selected");
      playerChoiceEl.textContent = " --- Lizard";
      break;
    case "spock":
      playerSpock.classList.add("selected");
      playerChoiceEl.textContent = " --- Spock";
      break;
    default:
      break;
  }
}

window.select = select;
