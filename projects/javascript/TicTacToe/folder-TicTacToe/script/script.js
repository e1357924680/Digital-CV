let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let message = document.getElementById('message');
const turn = document.getElementById('turn');

function makeMove(cell, index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        cell.innerText = currentPlayer;

        if (checkWin()) {
            message.innerText = 'Player ' + currentPlayer + ' wins!';
            turn.innerHTML = '';
            gameActive = false;
        } else if (isDraw()) {
            message.innerText = "It's a draw!";
            turn.innerHTML = '';
            gameActive = false;
        } else if (currentPlayer === 'X') {
            currentPlayer = 'O';
            turn.innerHTML = "It's O's turn";
        } else {
            currentPlayer = 'X';
            turn.innerHTML = "It's X's turn";
        }
    }
}

function checkWin() {
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        let [a, b, c] = winningCombinations[i];
        if (board[a] === currentPlayer && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function isDraw() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            return false;
        }
    }
    return true;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    turn.innerHTML = "It's X's turn";
    gameActive = true;

    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }

    message.innerText = '';
}
