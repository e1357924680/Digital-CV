const randomWordUrl = 'https://random-word-api.vercel.app/api?words=1';

const hangMan = [
    "./images/strike1.png",
    "./images/strike2.png",
    "./images/strike3.png",
    "./images/strike4.png",
    "./images/strike5.png",
    "./images/strike6.png",
    "./images/strike7.png",
    "./images/strike8.png",
    "./images/strike9.png",
    "./images/strike10.png",
    "./images/strike11.png",
];

const keyboard = document.getElementById('keyboard');
const wordDisplay = document.getElementById('word-display');
const guessesLeftDisplay = document.getElementById('guesses-left');
const lettersGuessed = document.getElementById('letters-guessed');
const imageContainer = document.getElementById('image-container');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restart-game');
const restartGameButton = document.getElementById('restart-btn');
let remainingGuesses = 10;
let guessedLetters = [];
let targetWord = [];
let userCompletion = [];

function initializeGame() {
    fetch(randomWordUrl)
        .then(response => response.json())
        .then(data => {
            const randomWord = data[0].toUpperCase();
            targetWord = randomWord.split('');
            for (let i = 0; i < targetWord.length; i++) {
                userCompletion[i] = ('_');
            };
            updateDisplay();
            createKeyboard();
        })
        .catch(error => console.error('Error fetching random word:', error));
}

function updateDisplay() {
    wordDisplay.textContent = userCompletion.join(' ');
    imageContainer.innerHTML = `<img src="${hangMan[10 - remainingGuesses]}" alt="Hangman" id="hangman-image">`;
}

function createKeyboard() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const keys = letters.map(letter => `<button id="${letter}" class="key-button">${letter}</button>`).join('');
    keyboard.innerHTML = keys;

    document.querySelectorAll('.key-button').forEach(button => {
        button.addEventListener('click', handleLetterClick);
    });
}

function handleLetterClick(button) {
    const guessedLetter = button.target.innerText;
    button.target.disabled = true;
    button.target.style.backgroundColor = "black";

    if (guessedLetters.includes(guessedLetter)) return;
    guessedLetters.push(guessedLetter);

    if (targetWord.includes(guessedLetter)) {
        correctGuess(guessedLetter);
    } else {
        incorrectGuess();
    }
    updateDisplay();
    checkGameEnd();
}

function correctGuess(letter) {
    targetWord.forEach((character, index) => {
        if (character === letter) {
            userCompletion[index] = letter;
        }
    });
}

function incorrectGuess() {
    remainingGuesses--;
}

function checkGameEnd() {
    if (!userCompletion.includes('_')) {
        messageDisplay.textContent = "Congratulations! You've won!";
        disableAllKeys();
        showRestartButton();
    } else if (remainingGuesses <= 0) {
        messageDisplay.textContent = `Game Over! The word was: ${targetWord.join('')}`;
        disableAllKeys();
        showRestartButton();
    }
}

function disableAllKeys() {
    document.querySelectorAll('.key-button').forEach(button => {
        button.disabled = true;
    });
}

function showRestartButton() {
    restartGameButton.classList.remove('hidden');
}

restartGameButton.addEventListener('click', () => {
    location.reload();
});

initializeGame();