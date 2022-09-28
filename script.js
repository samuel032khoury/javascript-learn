'use strict';
const checkBtn = document.querySelector('.check');
const scoreElement = document.querySelector('.score');
const displayMessage = (msg) => { document.querySelector('.message').textContent = msg};
let correct, score, gameState, lastGuess
let highScore = 0

function init() {
    correct = Math.floor(Math.random() * 20 + 1);
    score = Number(scoreElement.textContent);
    gameState  = false;
    lastGuess = NaN;
}

function reset() {
    checkBtn.disabled = false;
    scoreElement.textContent = '20';
    displayMessage('Start guessing...');
    document.querySelector('body').style.backgroundColor = '#222'
    document.querySelector('.number').textContent = '?'
    document.querySelector('.guess').value = '';
    init()
}

init()

document.querySelector('.again').addEventListener('click', reset)

checkBtn.addEventListener('click',  () => {
    const guessString = document.querySelector('.guess').value;
    if(!guessString) {
        // when there is no input
        displayMessage("⛔️ Enter a Number!");
        return;
    }
    const guess = Number(guessString)
    if (guess === correct) {
        // when guess correct
        gameState = true;
        document.querySelector('body').style.backgroundColor = "#53A551";
    } else{
        // whe guess is too low OR guess is too high
        displayMessage(guess > correct ? "📈 Too High!":"📉 Too Low!");
        score = (lastGuess===guess)?score:score-1;
    }
    scoreElement.textContent = String(score)
    if(!(score > 0 && !gameState)) {
        checkBtn.disabled = true;
        // checkBtn.style.backgroundColor = '#ccc'
        document.querySelector('.number').textContent = String(correct);
        displayMessage(guess===correct? "🎉 Correct, You Win!":"💥 You Lost the Game!");
        highScore = Math.max(score, highScore)
        document.querySelector('.highscore').textContent = highScore
    }
    lastGuess = guess;


})