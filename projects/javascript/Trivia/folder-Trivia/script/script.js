// ~~~ Game's Screens ~~~ //
const openingScreen = document.querySelector("#opening-screen");
const questionsScreen = document.querySelector("#questions-screen");
const gameOverScreen = document.querySelector("#game-over");

// ~~~ Question's & Answers' Boxes ~~~ //
const questionBox = document.getElementById("questionBox");
const answerA = document.getElementById("answerA");
const answerB = document.getElementById("answerB");
const answerC = document.getElementById("answerC");
const answerD = document.getElementById("answerD");

// ~~~ Game's Messages ~~~ //
const tryAgain = document.querySelector("#start-over");
const endMessage = document.querySelector("#message");
const headMessage = document.querySelector("#headMessage");

// ~~~ Game's Score ~~~ //
const scoreBox = document.getElementById("score");
let score = 0;

// ~~~ Arrays for the Game ~~~ //
let triviaQuestions = [];

// ~~~ API ~~~ //
const triviaSubjects = [
    "https://opentdb.com/api.php?amount=20&category=14&type=multiple",
    "https://opentdb.com/api.php?amount=20&category=17&type=multiple",
    "https://opentdb.com/api.php?amount=20&category=21&type=multiple",
    "https://opentdb.com/api.php?amount=20&category=22&type=multiple",
    "https://opentdb.com/api.php?amount=20&category=23&type=multiple",
    "https://opentdb.com/api.php?amount=20&category=19&type=multiple"
];

// ~~~ Constructor for Creating Questions ~~~ //
class TriviaQuestion {
    constructor(question, correctAnswer, incorrectAnswers) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.answers = this.shuffleAnswers([correctAnswer, ...incorrectAnswers]);
    }

    shuffleAnswers(answers) {
        return answers.sort();
    }
}

// ~~~ Fetch Questions from API ~~~ //
function fetchQuestions(idSubject) {
    fetch(triviaSubjects[idSubject])
        .then((response) => response.json())
        .then((data) => {
            triviaQuestions = data.results.map(
                (item) => new TriviaQuestion(item.question, item.correct_answer, item.incorrect_answers)
            );
            startGame();
        })
        .catch((error) => {
            console.error("Error fetching trivia questions:", error);
            location.reload();
        });
    openingScreen.style.display = "none";
    questionsScreen.style.display = "flex";
}

// ~~~ Start the Game ~~~ //
function startGame() {
    let score = 0;
    let currentIndex = 0;
    let timerInterval;
    const timerElement = document.getElementById("timer");

    function displayNextQuestion() {
        if (currentIndex < triviaQuestions.length) {
            resetTimer();

            [answerA, answerB, answerC, answerD].forEach((btn) => {
                btn.style.backgroundColor = "#ccc";
                btn.disabled = false;
            });

            const currentQuestion = triviaQuestions[currentIndex];
            questionBox.innerHTML = currentQuestion.question;
            const allAnswers = currentQuestion.answers;

            [answerA, answerB, answerC, answerD].forEach((btn, index) => {
                btn.innerHTML = allAnswers[index];
                btn.onclick = () => handleAnswerClick(btn, currentQuestion.correctAnswer);
            });

            scoreBox.innerHTML = `Score: ${score}`;
            startTimer(() => handleTimeout());
        } else {
            gameWon();
        }
    }

    function handleAnswerClick(button, correctAnswer) {
        clearInterval(timerInterval);

        [answerA, answerB, answerC, answerD].forEach((btn) => (btn.disabled = true));

        if (button.innerText === correctAnswer) {
            button.style.backgroundColor = "green";
            score++;
            setTimeout(() => {
                currentIndex++;
                displayNextQuestion();
            }, 1000);
        } else {
            button.style.backgroundColor = "red";
            const correctButton = [answerA, answerB, answerC, answerD].find(
                (btn) => btn.innerText.trim() === correctAnswer.trim()
            );
            correctButton.style.backgroundColor = "green";
            setTimeout(gameOver, 1000);
        }
    }

    function startTimer(onTimeout) {
        let timeLeft = 10;
        timerElement.innerText = `Time Left: ${timeLeft}s`;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.innerText = `Time Left: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                onTimeout();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerElement.innerText = `Time Left: 10s`;
    }

    function handleTimeout() {
        [answerA, answerB, answerC, answerD].forEach((btn) => (btn.disabled = true));

        gameOver(true);
    }

    function gameOver(timeout = false) {
        clearInterval(timerInterval);
        questionsScreen.style.display = "none";
        gameOverScreen.style.display = "flex";
        if (timeout) {
            headMessage.innerText = `Time's Up!`;
            endMessage.innerText = `You ran out of time after answering ${score} question(s) correctly.`;
        } else {
            headMessage.innerText = `Game Over!`;
            endMessage.innerText = `You answered ${score}/${triviaQuestions.length} questions correctly.`;
        }
        tryAgain.addEventListener("click", () => location.reload());
    }

    function gameWon() {
        clearInterval(timerInterval);
        questionsScreen.style.display = "none";
        gameOverScreen.style.display = "flex";
        headMessage.innerText = `Good Job!`;
        endMessage.innerText = `You answered all questions correctly!`;
        tryAgain.addEventListener("click", () => location.reload());
    }

    displayNextQuestion();
}