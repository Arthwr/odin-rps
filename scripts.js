let playerScore = 0;
let computerScore = 0;
let playerChoice = "";
let computerChoice = "";

function game() {
  const playButtons = document.querySelector(".button-wrapper");
  playButtons.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      switch (event.target.className) {
        case "rock-button":
          playerChoice = "rock";
          computerChoice = getComputerChoice();
          playRound(playerChoice, computerChoice);
          break;
        case "paper-button":
          playerChoice = "paper";
          computerChoice = getComputerChoice();
          playRound(playerChoice, computerChoice);
          break;
        case "scissors-button":
          playerChoice = "scissors";
          computerChoice = getComputerChoice();
          playRound(playerChoice, computerChoice);
          break;
      }
    }
  });
}

function playRound(playerSelection, computerSelection) {
  const winner = determineWinner(playerSelection, computerSelection);

  playerSelection = capitalizeFirstLetter(playerSelection);
  computerSelection = capitalizeFirstLetter(computerSelection);

  if (winner == "Tie") {
    displayResult(
      `Thats a tie! You chose ${playerSelection} and Computer chose ${computerSelection}`
    );
  } else {
    let resultMessage =
      winner == "Player"
        ? `You won! Nice! ${playerSelection} beats ${computerSelection}`
        : `You lost! Bad! ${computerSelection} beats ${playerSelection}`;
    updateScore(winner);
    displayResult(resultMessage);
  }
  const currentScoreMessage = `Current score is: Player - ${playerScore}. Computer - ${computerScore}`;
  displayCurrentScore(currentScoreMessage);

  if (playerScore == 5 || computerScore == 5) {
    const playButtons = document.querySelector(".button-wrapper");
    playButtons.style.display = "none";
    clearResultMessage();
    concludeSeriesResult();
    composeResetButton();
  }
}

//   Helper functions
function determineWinner(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
    return "Tie";
  } else if (
    (playerSelection == "rock" && computerSelection == "scissors") ||
    (playerSelection == "paper" && computerSelection == "rock") ||
    (playerSelection == "scissors" && computerSelection == "paper")
  ) {
    return "Player";
  } else {
    return "Computer";
  }
}
function getComputerChoice() {
  let randomNum = Math.floor(Math.random() * 3) + 1;
  if (randomNum == 1) {
    return "paper";
  } else if (randomNum == 2) {
    return "rock";
  } else {
    return "scissors";
  }
}

function updateScore(winner) {
  winner == "Player" ? (playerScore += 1) : (computerScore += 1);
}

function displayResult(message) {
  const feedbackElement = document.getElementById("feedback");
  const newParagraph = document.createElement("p");
  newParagraph.textContent = message;
  feedbackElement.appendChild(newParagraph);
}

function displayCurrentScore(scoreMessage) {
  const scoreElement = document.getElementById("score-results");
  scoreElement.textContent = scoreMessage;
}

function clearResultMessage() {
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.innerHTML = "";
}

function concludeSeriesResult() {
  const resultMessage =
    playerScore > computerScore
      ? "You win in a best of 5 series! Congratulations!"
      : playerScore < computerScore
      ? "Whoops! You lost best of 5 series!"
      : "The best of 5 series ends in a tie!";
  displayResult(resultMessage);
}

function capitalizeFirstLetter(string) {
  string = string.slice(0, 1).toUpperCase() + string.slice(1);
  return string;
}

function composeResetButton() {
  const wrapper = document.querySelector(".button-wrapper");
  const resetButton = document.createElement("button");
  resetButton.id = "reset-button";
  resetButton.textContent = "Reset";
  wrapper.insertAdjacentElement("afterend", resetButton);
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  const resetButton = document.getElementById("reset-button");
  const playButtons = document.querySelector(".button-wrapper");

  playerScore = 0;
  computerScore = 0;

  playButtons.style.display = "flex";
  clearResultMessage();
  displayCurrentScore("");

  if (resetButton) {
    resetButton.remove();
  }
}

// Initiate
game();
