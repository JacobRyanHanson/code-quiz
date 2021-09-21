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
var countdown = document.querySelector(".countdown");

startQuizBtn.addEventListener("click", startQuizHandler);

function startQuizHandler() {
    var introPage = document.querySelectorAll(".intro");
    for (var i = 0; i < introPage.length; i++) {
        introPage[i].remove();
    }
    createElements();
    assignElements();

    var timeLimit = 60;
    timer(timeLimit);

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
    feedbackContainer.className = "feedbackContainer";
    main.appendChild(feedbackContainer);
}

function assignElements() {
    var question = document.querySelector(".title");
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

function timer(timeLeft) {
    timeLeft--;
    countdown.textContent = timeLeft;
    setTimeout(timer, 1000, timeLeft);
}

function nextQuestionHandler(event) {
    console.log(questionInfo.number - 1)
    if (questionInfo.number - 1 < questionInfo.ask.length - 1 && questionInfo.number - 1 != questionInfo.ask.length - 1) {
        questionInfo.number++;
        assignElements();
    } else {
        endPage();
    }

    var feedback = document.querySelector(".feedback");
    if (event.target.matches("[data-answer-id='true'")) {
        feedback.textContent = "Correct"
    } else if (event.target.matches("[data-answer-id='false'")) {
        feedback.textContent = "Incorrect"
    }
}

function endPage() {
    document.querySelector(".title").textContent = "Complete!";

    var btns = document.querySelectorAll(".answer")
    for (var i = 0; i < btns.length; i++) {
        btns[i].remove();
    }

    var scoreMsg = document.querySelector(".btnContainer");
    scoreMsg.className = "scoreMsg";
    scoreMsg.textContent = "Final Score: ";

    var initialsContainer = document.createElement("div");
    initialsContainer.className = "initialsContainer";
    initialsContainer.innerHTML = "<label for='initials'>Enter Initials: <label>" + "<input type='text'>" +
        "<button type='submit'>Submit</button>";
    main.insertBefore(initialsContainer, document.querySelector(".feedbackContainer"));
}