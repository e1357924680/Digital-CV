const btnAdd = document.getElementById("btnAdd");
const btnSub = document.getElementById("btnSub");
const btnDiv = document.getElementById("btnDiv");
const btnMulti = document.getElementById("btnMulti");
const op = document.getElementById("op");

btnAdd.addEventListener('click', mathAdd)
btnSub.addEventListener('click', mathSub)
btnDiv.addEventListener('click', mathDiv)
btnMulti.addEventListener('click', mathMulti)

// Addition //

function mathAdd() {
    op.innerHTML = "+";
    const btnCheck = document.getElementById("check");
    const btnNext = document.getElementById("next");
    let ranNum1 = (Math.floor(10 * Math.random()) + 1);
    let ranNum2 = (Math.floor(10 * Math.random()) + 1);
    const userAns = document.getElementById("userAns");
    const message = document.getElementById("message");

    const num1 = document.getElementById("num1");
    num1.innerHTML = ranNum1;

    const num2 = document.getElementById("num2");
    num2.innerHTML = ranNum2;

    btnCheck.addEventListener('click', check);

    function check() {
        if (ranNum1 + ranNum2 == userAns.value) {
            message.innerHTML = "Good Job!"
        } else {
            message.innerHTML = "Try Again..."
        }
    }

    btnNext.addEventListener('click', mathAdd)
    userAns.value = '';
    message.innerHTML = '';
}

// Substraction // 

function mathSub() {
    op.innerHTML = "-";
    const btnCheck = document.getElementById("check");
    const btnNext = document.getElementById("next");
    let ranNum1 = (Math.floor(10 * Math.random()) + 1);
    let ranNum2 = (Math.floor(10 * Math.random()) + 1);
    const userAns = document.getElementById("userAns");
    const message = document.getElementById("message");

    const num1 = document.getElementById("num1");
    num1.innerHTML = ranNum1;

    const num2 = document.getElementById("num2");
    num2.innerHTML = ranNum2;

    btnCheck.addEventListener('click', check);

    function check() {
        if (ranNum1 - ranNum2 == userAns.value) {
            message.innerHTML = "Good Job!"
        } else {
            message.innerHTML = "Try Again..."
        }
    }

    btnNext.addEventListener('click', mathSub)
    userAns.value = '';
    message.innerHTML = '';
}

// Division //

function mathDiv() {
    op.innerHTML = ":";
    const btnCheck = document.getElementById("check");
    const btnNext = document.getElementById("next");

    let ranDiv = (Math.floor(10 * Math.random()) + 1);
    let ranNum1 = ((Math.floor(10 * Math.random()) + 1) * ranDiv);
    let ranNum2 = ranDiv;
    const userAns = document.getElementById("userAns");
    const message = document.getElementById("message");

    const num1 = document.getElementById("num1");
    num1.innerHTML = ranNum1;

    const num2 = document.getElementById("num2");
    num2.innerHTML = ranNum2;

    btnCheck.addEventListener('click', check);

    function check() {
        if (ranNum1 / ranNum2 == userAns.value) {
            message.innerHTML = "Good Job!"
        } else {
            message.innerHTML = "Try Again..."
        }
    }

    btnNext.addEventListener('click', mathDiv)
    userAns.value = '';
    message.innerHTML = '';
}

// Multiplication //

function mathMulti() {
    op.innerHTML = "X";
    const btnCheck = document.getElementById("check");
    const btnNext = document.getElementById("next");
    let ranNum1 = (Math.floor(10 * Math.random()) + 1);
    let ranNum2 = (Math.floor(10 * Math.random()) + 1);
    const userAns = document.getElementById("userAns");
    const message = document.getElementById("message");

    const num1 = document.getElementById("num1");
    num1.innerHTML = ranNum1;

    const num2 = document.getElementById("num2");
    num2.innerHTML = ranNum2;

    btnCheck.addEventListener('click', check);

    function check() {
        if (ranNum1 * ranNum2 == userAns.value) {
            message.innerHTML = "Good Job!"
        } else {
            message.innerHTML = "Try Again..."
        }
    }

    btnNext.addEventListener('click', mathMulti)
    userAns.value = '';
    message.innerHTML = '';
}

mathAdd();