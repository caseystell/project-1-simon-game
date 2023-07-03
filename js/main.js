/*----- constants -----*/
const colors = ["red", "blue", "yellow", "green"];

/*----- state variables -----*/
let noMistakes = true;
let currentScore = 0;
let highScore = 0;
let turnCount = 0;
let computerSequence = [];
let playerSequence = [];

/*----- cached elements  -----*/
const curScoreEl = document.getElementById("cur-score");
const highScoreEl = document.getElementById("high-score");
const startBtn = document.getElementById("start");
const colorEls = [...document.querySelectorAll("#color-buttons > div")];

/*----- event listeners -----*/
startBtn.addEventListener("click", init);
colorEls.forEach(function(colorEl) {
    colorEl.addEventListener("click", playerTurn);
});

/*----- functions -----*/
function init() {
    noMistakes = true;
    currentScore = 0;
    turnCount = 0;
    computerSequence = [];
    playerSequence = [];
    startBtn.style.visibility = "hidden";
    render();
    computerTurn();
    playGame();
};

function render() {
    renderMessage();
    renderButtons();
};

function renderMessage() {
    const messageEl = document.querySelector("h2");
    if (noMistakes === false) {
        messageEl.innerText = `Game over! You got ${currentScore} in a row!`
    } return;
};

function renderButtons() {
    const playAgainBtn = document.getElementById("replay");
    playAgainBtn.style.visibility = noMistakes ? "hidden" : "visible";
    startBtn.style.visibility = noMistakes ? "hidden" : "visible";
};

function getRandomColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
};

function flashColor(color) {
    const colorEl = document.querySelector(`[id='${color}']`);
    const originalColor = colorEl.style.backgroundColor;
    colorEl.style.backgroundColor = color;
    setTimeout(function() {
        colorEl.style.backgroundColor = originalColor;
    }, 600);
};

function makeSound(color) {
    const colorEl = document.querySelector(`[id='${color}']`);
    const colorSounds = document.querySelector(`[sound='${color}']`);
    colorEl.classList.add("activated");
    colorSounds.play();
    setTimeout(function() {
        colorEl.classList.remove("activated");
    }, 500);
};

function computerTurn() {
    const nextColor = getRandomColor();
    computerSequence.push(nextColor);
    flashColor(nextColor);
    makeSound(nextColor);
    turnCount += 1;
    console.log(computerSequence);
}

function playerTurn(evt) {
    const colorIdx = colorEls.indexOf(evt.target);
    const clickedColor = colors[colorIdx];
    playerSequence.push(clickedColor);
    console.log(playerSequence);
    makeSound(clickedColor);
    compareSequences(computerSequence, playerSequence);
};

function compareSequences(computerSequence, playerSequence) {
    for (let i = 0; i < playerSequence.length; i++) {
        console.log(`The player sequence is ${playerSequence[i]}`);
    } 
    for (let i = 0; i < computerSequence.length; i++) {
        console.log(`The computer sequence is ${computerSequence[i]}`);
    }
    if (playerSequence === computerSequence) {
        currentScore += 1;
        curScoreEl.innerText = currentScore
        computerTurn();
    } else {
        noMistakes = false;
        currentScore = highScore;
        highScoreEl.innerText = highScore
    }
};

function playGame() {
    while (noMistakes) {
        computerTurn();
        compareSequences(computerSequence, playerSequence);
    } return;
};

/* Pseudocode:

X const array for the 4 color variables, which link to the HTML divs of the corresponding colors (cached element)
X declare state variables: noMistakes = true; currentScore = 0, highScore = 0;
click event listener to verify if each click matches what color the computer randomly generated
create a while loop: while noMistakes, execute gamePlay function
    computer randomly selects a color and displays the color, while making the corresponding sound for that color
    user is given time to copy that color
        if user takes longer than 1 minute to select a color, game times out and resets (while loop ends)
    if user is correct (noMistakes = true), game continues, computer add 1 to its random sequence, ensuring sequence is the same + 1
    if a mistake is made, noMistakes = false, ends while loop, resets board to initial state & currentScore to 0
        if currentScore > highScore, currentScore becomes the new highScore
        highScore is never reset
X create a play again game button functionality when the player loses




To figure out:
how to get computer to generate the same random sequence while no mistakes are made (asynchronous timing?)
*/
