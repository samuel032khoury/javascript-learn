'use strict';

const p0Name = prompt('Enter the name of Player 1', 'Player 1');
const p1Name = prompt('Enter the name of Player 2', 'Player 2');

const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

const diceImg = document.querySelector('.dice');

const p0Box = document.querySelector('.player--0');
const p1Box = document.querySelector('.player--1');

let activePlayerId, activePlayerBox;

init();

function init() {
  p0Box.querySelector('.name').textContent = p0Name;
  p1Box.querySelector('.name').textContent = p1Name;
  if (activePlayerBox) activePlayerBox.classList.remove('player--winner');

  switchPlayer(true);
  diceImg.classList.add('hidden')
  rollDiceBtn.disabled = false;
  holdBtn.disabled = false;
  document.querySelectorAll('.number').forEach(element => element.textContent = '0');
}

function rollADice() {
  const ret = Math.floor(Math.random() * 6 + 1);
  const activeScore = activePlayerBox.querySelector('.current-score');
  if (ret === 1) {
    activeScore.textContent = '0';
    switchPlayer();
  } else {
    activeScore.textContent = `${Number(activeScore.textContent) + ret}`;
  }
  return ret;
}

function calScore() {
  const currScoreDiv = activePlayerBox.querySelector('.current-score');
  const currTotalDiv = activePlayerBox.querySelector('.score');
  currTotalDiv.textContent = `${Number(currScoreDiv.textContent) + Number(currTotalDiv.textContent)}`;
  currScoreDiv.textContent = '0';
}

function switchPlayer(resetting = false) {
  activePlayerId = resetting ? 0 : 1 - activePlayerId;
  activePlayerBox = activePlayerId === 0 ? p0Box : p1Box;
  const nextPlayerBox = activePlayerId === 0 ? p1Box : p0Box;
  activePlayerBox.classList.add('player--active');
  nextPlayerBox.classList.remove('player--active');
}

function gameOver() {
  const winnerNameDiv = activePlayerBox.querySelector('.name');
  const winnerNameStr = winnerNameDiv.textContent;
  winnerNameDiv.textContent = `🏆 ${winnerNameStr} 🏆`;
  activePlayerBox.classList.remove('player--active');
  activePlayerBox.classList.add('player--winner');
  rollDiceBtn.disabled = true;
  holdBtn.disabled = true;
}

newGameBtn.addEventListener('click', init);
rollDiceBtn.addEventListener('click', () => {
  diceImg.classList.remove('hidden')
  diceImg.src = `dice-${rollADice()}.png`;
})
holdBtn.addEventListener('click', () => {
  calScore();
  Number(activePlayerBox.querySelector('.score').textContent) >= 50 ? gameOver() : switchPlayer();
})