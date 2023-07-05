/*----- constants -----*/
const colors = ["red", "blue", "yellow", "green"];

/*----- state variables -----*/
let noMistakes = true;
let currentScore = 0;
let highScore = 0;
let prevHighScore = 0;
let turnCount = 0;
let computerSequence = [];
let playerSequence = [];

/*----- cached elements  -----*/
const curScoreEl = document.getElementById("cur-score");
const highScoreEl = document.getElementById("high-score");
const startBtn = document.getElementById("start");
const colorEls = [...document.querySelectorAll("#color-buttons > div")];
const messageEl = document.querySelector("h2");

/*----- event listeners -----*/
startBtn.addEventListener("click", init);
colorEls.forEach(function(colorEl) {
    colorEl.addEventListener("click", playerTurn);
});

/*----- functions -----*/
function init() {
    noMistakes = true;
    currentScore = 0;
    curScoreEl.innerText = currentScore;
    turnCount = 0;
    computerSequence = [];
    playerSequence = [];
    startBtn.style.visibility = "hidden";
    messageEl.textContent = "a memory game";
    render();
    computerTurn();
};

function render() {
    renderMessage();
    renderButton();
};

function renderMessage() {
    if (noMistakes === false) {
        messageEl.innerHTML = `Game over! You got ${currentScore} in a row!`;
    } else {
        return;
    };
};

function renderButton() {
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
        if (colorEl.style.backgroundColor !== originalColor) {
            colorEl.style.backgroundColor = originalColor;
        }
    }, 600);
};

function makeSound(color) {
    const colorEl = document.querySelector(`[id='${color}']`);
    const colorSounds = document.querySelector(`[sound='${color}']`);
    colorEl.classList.add("activated");
    colorSounds.play();
    setTimeout(function() {
        colorEl.classList.remove("activated");
    }, 600);
};

function computerTurn() {
    const nextColor = getRandomColor();
    computerSequence.push(nextColor);
    computerSequence.forEach(function(color, index) {
        setTimeout(function() {
            flashColor(color);
            makeSound(color);
        }, (index + 1) * 600);
    }); 
    clearTimeout(flashColor);
    turnCount += 1;
    console.log(`Computer sequence: ${computerSequence}`);
}

function playerTurn(evt) {
    const colorIdx = colorEls.indexOf(evt.target);
    const clickedColor = colors[colorIdx];
    playerSequence.push(clickedColor) - 1;
    makeSound(clickedColor);
    console.log(`Player sequence: ${playerSequence}`);
    if (!compareSequences(computerSequence, playerSequence)) {
        noMistakes = false;
        return;
    }
    playerSequence = [];
    setTimeout(function() {
        computerTurn();
    }, 600);
    return;
};

function compareSequences(compSeq, playerSeq) {
    if (playerSeq.length !== compSeq.length) {
        return;
    }
    // if (compSeq.length === playerSeq.length) {
    let sequenceLength = compSeq.length;
    for (let i = 0; i < sequenceLength; i++) {
        if (compSeq[i] !== playerSeq[i]) {
            noMistakes = false;
            render();
            if (prevHighScore < currentScore) {
                highScore = currentScore;
                prevHighScore = highScore;
                highScoreEl.innerText = highScore;
            } else {
                highScoreEl.innerText = prevHighScore;
            }
            return false;
        }
    }
    currentScore += 1;
    curScoreEl.innerText = currentScore;
    return true;
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