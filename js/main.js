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


/*----- event listeners -----*/
startBtn.addEventListener("click", init);


/*----- functions -----*/

function init() {
    noMistakes = true;
    currentScore = 0;
    turnCount = 0;
    computerSequence = [];
    playerSequence = [];
    startBtn.style.visibility = "hidden";
    render();
};

function render() {
    renderBoard();
    renderMessage();
    renderControls();
};

function renderBoard() {
    playTurn();
};

function renderMessage() {
    const messageEl = document.querySelector("h2");
    if (noMistakes === false) {
        messageEl.innerText = `Game over! You got ${currentScore} in a row!`
    } return;
};

function renderControls() {
    const playAgainBtn = document.getElementById("replay");
    playAgainBtn.style.visibility = noMistakes ? "hidden" : "visible";
};

function playTurn() {
   playNextTurn();
};

function getRandomColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
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

function showColor(color) {
    const colorEl = document.querySelector(`[id='${color}']`);
    
};

function playNextTurn() {
    getRandomColor();
    const nextTurnSequence = [...computerSequence];
    nextTurnSequence.push(getRandomColor());
    makeSound(nextTurnSequence);
    turnCount += 1;
}

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
X import or lookup how to choose items "randomly" from an array
X how to get sounds in js associated to divs/variables
how to get computer to generate the same random sequence while no mistakes are made (asynchronous timing?)

*/
