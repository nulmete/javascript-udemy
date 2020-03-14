/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

CHALLENGES:

- 1) A player loses his ENTIRE score when he rolls 6 twice in a row. After that, it's the next player's turn.
- 2) Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
- 3) Add another dice to the game, so that there are two dices now. The player loses his current score when ONE of them is a 1.

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll, winningScoreInput, winningScore;

winningScoreInput = document.querySelector('.winning-score-input');

init();

// Roll
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Challenge 2
        // As soon as the first player rolls the dice, the winning score can't be changed
        winningScoreInput.disabled = true;

        // 1. Generate random number between 1 and 6
        // We declare the dice variable here because we want only this function to access it
        // Challenge 3 - add another dice
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        /*
        * This was challenge 1 solution

        // 3. Update the roundScore if the rolled number was not a 1
        if (dice === 6 && previousRoll === 6) { // Challenge 1
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();

            // Challenge 1
            // Added a return so that the last line 'previousRoll = dice' doesn't execute and previousRoll is set to 0
            previousRoll = 0;
            return;
        } else if (dice !== 1) {
            // Add to active player's current score & update UI
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();

            // Challenge 1
            // Added a return so that the last line 'previousRoll = dice' doesn't execute and previousRoll is set to 0
            previousRoll = 0;
            return;
        }

        // Challenge 1
        previousRoll = dice;

        * End of challenge 1 solution
        */

        /* Challenge 3 */
        if (dice1 !== 1 && dice2 !== 1) {
            // Add to active player's current score & update UI
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

// Hold
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add to active player's global score & update UI
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';

            // Hide the dices
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';

            // Add 'winner' class and remove 'active' class to current player
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            nextPlayer();

            // Challenge 1
            // previousRoll = 0;
        }
    }
});

function nextPlayer() {
    // Set current's player score to 0
    document.querySelector('#current-' + activePlayer).textContent = 0;

    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // Remove 'active' class from current player; add 'active' class to next player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Hide the dices again
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

// New game
document.querySelector('.btn-new').addEventListener('click', init);

// Change winning score
winningScoreInput.addEventListener('change', function() {
    // Update score
    winningScore = winningScoreInput.value;

    // Disable the input so that the score can't be changed during the game
    winningScoreInput.disabled = true;
});

function init() {
    // Scores of player 0 and player 1
    scores = [0, 0];

    // Current score of the active player
    roundScore = 0;

    // Used to select stuff from the DOM and to change the values of the scores array
    // 0 is the first player and 1 is the second player
    activePlayer = 0;

    // Challenge 1
    // previousRoll = 0;

    // Challenge 2
    // Set default winning score to 100 when the game starts, but let the players change it
    winningScoreInput.value = 100;
    // Since the input value is a primitive data type, this is a copy, NOT A LINKAGE, so when the input changes, winningScore must be updated again to the new input value
    winningScore = winningScoreInput.value;
    winningScoreInput.disabled = false;

    gamePlaying = true;

    // Hide the dices
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // Set initial scores to 0
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // Player 0 always starts
    document.querySelector('.player-0-panel').classList.add('active');
}