const playBoard = document.getElementById("play-board");
const notifyGameOver = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener('click', startAgain);
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalID;
let score = 0;
let rows, columns;
let intervalTime = 125;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

// ~~~~~~~~~~ Media Queries ~~~~~~~~~~~~~ //

var max1000 = window.matchMedia("(min-width: 1001px)");
if (max1000.matches) {
    rows = 30;
    columns = 50;
}

var max1000 = window.matchMedia("(min-width: 800px) and (max-width: 1000px)");
if (max1000.matches) {
    rows = 30;
    columns = 40;
}

var max1000 = window.matchMedia("(min-width: 481px) and (max-width: 799px)");
if (max1000.matches) {
    rows = 30;
    columns = 30;
}

var max480 = window.matchMedia("(max-width: 480px)");
if (max480.matches) {
    rows = 30;
    columns = 20;
}

playBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
playBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
console.log(rows, columns);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

let snakeX, snakeY;
snakeX = Math.floor(Math.random() * (columns - 1)) + 1;
snakeY = Math.floor(Math.random() * (rows - 1)) + 1;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * columns) + 1;
    foodY = Math.floor(Math.random() * rows) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalID);
    notifyGameOver.style.display = "block";
    restartBtn.style.display = "block";
}

function startAgain() {
    location.reload();
}

const changeDirection = (e) => {
    if (e.key === 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// ~~~~~~~~~~~ MOBILE ~~~~~~~~~~~~~ //

let arrowUp = false;
let arrowDown = false;
let arrowLeft = false;
let arrowRight = false;

function ArrowUp() {
    arrowUp = true;
    changeDirectionMobile()
    arrowUp = false;
}
function ArrowDown() {
    arrowDown = true;
    changeDirectionMobile()
    arrowDown = false;
}
function ArrowLeft() {
    arrowLeft = true;
    changeDirectionMobile()
    arrowLeft = false;
}
function ArrowRight() {
    arrowRight = true;
    changeDirectionMobile()
    arrowRight = false;
}

function changeDirectionMobile() {
    if (arrowUp == true && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (arrowDown == true && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (arrowLeft == true && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (arrowRight == true && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

const initGame = () => {
    if (gameOver == true) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`
        highScoreElement.innerText = `High Score: ${highScore}`
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > columns || snakeY <= 0 || snakeY > rows) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();


setIntervalID = setInterval(initGame, intervalTime);

document.addEventListener("keydown", changeDirection);

