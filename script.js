import { clickCorrect, clickWrong, endGame } from "./gamescreen.js";

const questions = [
    {
        question: `Which of the following assigns the value “happy” into a variable called “feel”?`,
        choices: [
            {text: `let feel = "happy";`, correct: true},
            {text: `let feel = happy;`, correct: false},
            {text: `let feel -> "happy";`, correct: false}
        ]
    },
    {
        question: `Given the following code: let x = 5 + 6;
What is the value stored in x?`,
        choices: [
            {text: `11 (Number)`, correct: true},
            {text: `56 (Number)`, correct: false},
            {text: `"5+6" (String)`, correct: false}
        ]
    },
]

const questionElement = document.getElementById("escape-question");
const choiceElements = document.getElementById("escape-choices");

let questionNo = 1;
let score = 0;

function shuffleArray(arr) {
    let i, j, item;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        item = arr[i];
        arr[i] = arr[j];
        arr[j] = item;
    }
    return arr;
}

function startGame() {
    questionNo = 1;
    score = 0;
    showQuestion();
}

function removePrevQustion() {
    while (choiceElements.firstChild) {
        choiceElements.removeChild(choiceElements.firstChild);
    }
}

function selectAnswer(elem) {
    const selectedBtn = elem.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("escape-correct");
        clickCorrect(questions.length - questionNo);
        score++;
    } else {
        selectedBtn.classList.add("escape-incorrect");
        clickWrong();
    }

    Array.from(choiceElements.children).forEach(btn => {
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });

    setTimeout(handleNextQuestion, 3000);
}

function showQuestion() {
    removePrevQustion();
    let currentQ = questions[questionNo - 1];
    questionElement.innerHTML = "[" + questionNo + "/" + questions.length + "]" + "<br>" + currentQ.question;

    let shuffledChoices = shuffleArray(currentQ.choices);
    shuffledChoices.forEach(item => {
        const button = document.createElement("button");
        button.innerHTML = item.text;
        button.classList.add("escape-btn");
        choiceElements.appendChild(button);
        if (item.correct) {
            button.dataset.correct = item.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function showWin() {
    removePrevQustion();
    questionElement.innerHTML = "You win!";
}

export function showLose() {
    removePrevQustion();
    questionElement.innerHTML = "You lose!";
}

function handleNextQuestion() {
    questionNo++;
    if (questionNo <= questions.length) {
        showQuestion();
    } else {
        endGame();
        setTimeout(showWin, 3000);
    }
}

export function disableButtons() {
    Array.from(choiceElements.children).forEach(btn => {
        btn.disabled = true;
    })
}

startGame();