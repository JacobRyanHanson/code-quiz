var timeLimit = 120;

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
    timer();
}

function createElements() {
    var btnContainer = document.createElement("div");
    btnContainer.className = "btnContainer";

    var btn;
    for (var i = 0; i < questionInfo.answer[questionInfo.number - 1].length; i++) {
        btn = document.createElement("button");
        btn.className = "answer";
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
    var btnContainer = document.querySelector(".btnContainer");
    btnContainer.addEventListener("click", nextQuestionHandler);

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

function timer() {
    if (timeLimit > 0 && document.querySelector(".title").textContent != "Complete!") {
        timeLimit--;
        countdown.textContent = timeLimit;
        setTimeout(timer, 1000, timeLimit);
    } else if (timeLimit === 0) {
        alert("Out of time.")
        endPage();
    }
}

function nextQuestionHandler(event) {
    var btnContainer = document.querySelector(".btnContainer");
    btnContainer.removeEventListener("click", nextQuestionHandler);
    var feedback = document.querySelector(".feedback");
    if (event.target.matches("[data-answer-id='true']")) {
        feedback.textContent = "Correct"
    } else if (event.target.matches("[data-answer-id='false']")) {
        feedback.textContent = "Incorrect"
        timeLimit -= 10;
    }
    setTimeout(function () {feedback.textContent = ""}, 2000);

    if (questionInfo.number - 1 < questionInfo.ask.length - 1 && questionInfo.number - 1 != questionInfo.ask.length - 1) {
        questionInfo.number++;
        setTimeout(function() {assignElements()}, 2000);
    } else {
        setTimeout(function() {endPage()}, 2000);
    }
}

function endPage() {
    var score = document.querySelector(".countdown").textContent;
    var title = document.querySelector(".title");
    title.textContent = "Complete!";
    title.className = "title";

    var btns = document.querySelectorAll(".answer")
    for (var i = 0; i < btns.length; i++) {
        btns[i].remove();
    }

    var scoreMsg = document.querySelector(".btnContainer");
    scoreMsg.className = "scoreMsg";
    scoreMsg.textContent = "Final Score: " + score;

    var initialsForm = document.createElement("form");
    initialsForm.className = "form";
    initialsForm.innerHTML = "<label class='initials'>Enter Initials: </label>" + "<input type='text'>" +
        "<button type='submit'>Submit</button>";
    main.insertBefore(initialsForm, document.querySelector(".feedbackContainer"));

    initialsForm.addEventListener("submit", function (event) {saveScores(event, score)});
}

function saveScores(event, score) {
    event.preventDefault();

    var highScore = {
        identity: document.querySelector("form input").value.toUpperCase(),
        score: score
    }

    if (highScore.identity && highScore.identity.length === 2) {
        var highScores = JSON.parse(localStorage.getItem("highScores"));
        if (highScores === null) {
            highScores = [];
        }

        if (!isDuplicate(highScore, highScores)) {
            highScores.push(highScore);
            localStorage.setItem("highScores", JSON.stringify(highScores));
        }

        window.location.href = "./high-scores.html";
    } else {
        alert("Invalid input. Please enter a pair of initials.");
    }
}

function isDuplicate(highScore, highScores) {
    var isDuplicate = false;
    for (var i = 0; i < highScores.length; i++) {
        if (highScore.identity === highScores[i].identity && highScore.score === highScores[i].score) {
            isDuplicate = true;
        }
    }
    return isDuplicate;
}