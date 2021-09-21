var questionInfo = {
    number: 1,
    ask: [
        "Which of the following is not a commonly used data type?",
        "What condidition is used to close if / else statements?",
        "Arrays is JavaScript can be used to store which of the following?",
        "String values require which of the following to prevent syntax errors when initalized?",
        "In JavaScript what tool is used to print information (typically for debugging)?"
    ],
    answer: [
        ["Strings", "Booleans", "Alerts", "Numbers"],
        ["Quotes", "Braces", "Parenthesis", "Brackets"],
        ["Numbers", "Arrays", "Strings", "All of the above"],
        ["Commas", "Braces", "Quotes", "Parenthesis"],
        ["JavaScript", "Terminal", "For Loops", "console.log"]
    ]
}

var main = document.querySelector("main");
var startQuizBtn = document.querySelector("#start-quiz");

startQuizBtn.addEventListener("click", startQuizHandler);

function startQuizHandler() {
    var introPage = document.querySelectorAll(".intro");
    for (var i = 1; i < introPage.length; i++) {
        introPage[i].remove();
    }
    createElements();
    assignElements();

    quiz();
}

function quiz() {
    var btnContainer = document.querySelector(".btnContainer");
    btnContainer.addEventListener("click", nextQuestionHandler);
}

function createElements() {
    var btnContainer = document.createElement("div");
    btnContainer.className = "btnContainer";

    var btn;
    for (var i = 0; i < questionInfo.answer[questionInfo.number - 1].length; i++) {
        btn = document.createElement("button");
        btn.className = "answer";


        console.log(btn)


        btnContainer.appendChild(btn);
    }
    main.appendChild(btnContainer);

    var feedbackContainer = document.createElement("div");
    var feedback = document.createElement("h2");
    feedback.className = "feedback";
    feedbackContainer.appendChild(feedback);
    main.appendChild(feedbackContainer);
}

function assignElements() {
    var question = document.querySelector("main h1");
    question.className = "question";
    question.textContent = questionInfo.ask[questionInfo.number - 1];

    var btns = document.querySelectorAll(".answer");
    for (var i = 0; i < btns.length; i++) {
        btns[i].textContent = questionInfo.answer[questionInfo.number - 1][i];

        var isCorrect = isBtnCorrect(btns[i].textContent);

        if (isCorrect) {
            btns[i].setAttribute("data-answer-id", true);
        } else if (!isCorrect) {
            btns[i].setAttribute("data-answer-id", false);
        }
    }
}

function isBtnCorrect(btnText) {
    var correctAnswers = ["Alerts", "Braces", "All of the above", "Quotes", "console.log"]

    var isTrue = false;
    for (var i = 0; i < correctAnswers.length; i++) {
        if (btnText === correctAnswers[i] && i === questionInfo.number - 1) {
            isTrue = true;
        }
    }
    return isTrue;
}

function nextQuestionHandler(event) {
    if (questionInfo.number - 1 < questionInfo.ask.length - 1) {
        questionInfo.number++;
    }
    assignElements();

    var feedback = document.querySelector(".feedback");
    if (event.target.matches("[data-answer-id='true'")) {
        feedback.textContent = "Correct"
    } else if (event.target.matches("[data-answer-id='false'")) {
        feedback.textContent = "Incorrect"
    }
}