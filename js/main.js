/*----- constants -----*/
const colors = ["red", "blue", "yellow", "green"];


/*----- state variables -----*/
let noMistakes = true;
let currentScore = 0;
let highScore = 0;


/*----- cached elements  -----*/
const colorEls = document.querySelectorAll("#color-buttons > div");


/*----- event listeners -----*/


/*----- functions -----*/


/* Pseudocode:

const array for the 4 color variables, which link to the HTML divs of the corresponding colors (cached element)
delcare state variables: noMistakes = true; currentScore = 0, highScore = 0;
click event listener to verify if each click matches what color the computer randomly generated
create a while loop: while noMistakes, execute gamePlay function
    computer randomly selects a color and displays the color, while making the corresponding sound for that color
    user is given time to copy that color
        if user takes longer than 1 minute to select a color, game times out and resets (while loop ends)
    if user is correct (noMistakes = true), game continues, computer add 1 to its random sequence
    if a mistake is made, noMistakes = false, ends while loop, resets board to initial state & currentScore to 0
        if currentScore > highScore, currentScore becomes the new highScore
        highScore is never reset
create a play again game functionality when the player loses




To figure out:
import or lookup how to choose items "randomly" from an array
how to get sounds in js associated to divs/variables
how to get computer to generate the same random sequence while no mistakes are made (asynchronous timing?)

*/
