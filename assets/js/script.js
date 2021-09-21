var main = document.querySelector("main");
var startQuizBtn = document.querySelector("#start-quiz");

startQuizBtn.addEventListener("click", startQuizHandler);
main.addEventListener("click", nextQuestion);

function startQuizHandler(event) {
    var introPage = document.querySelectorAll(".intro");
    for (var i = 1; i < introPage.length; i++) {
        introPage[i].remove();
    }
    questions(introPage[0]);
}

function questions(title) {
    var questionNumber = 1;
    var question = title;
    question.className = "question";
    questionArray = [
        "Which of the following is not a commonly used data type?",
        "What condidiotn is used to close if / else statements?",
        "Arrays is JavaScript can be used to store which of the following?",
        "String values require which of the following to prevent syntax errors when initalized?",
        "In JavaScript what tool is used to print information (typically for debugging)?",
        "Complete!"
    ]
    question.textContent = questionArray[questionNumber];
    answers(questionNumber);
    questionNumber++;
}

function answers(questionNumber) {
    var questionChoices = [
        ["Strings", "Booleans", "Alerts", "Numbers"],
        ["Quotes", "Braces", "Parenthesis", "Brackets"],
        ["Numbers", "Arrays", "Strings", "All of the above"],
        ["Commas", "Braces", "Quotes", "Parenthesis"],
        ["JavaScript", "Terminal", "For Loops", "console.log"]
    ]

    var correctAnswers = ["Alerts", "Braces", "All of the above", "Quotes", "console.log"]

    var btnContainer = document.createElement("div");
    btnContainer.className = "btnContainer";

    var btn;
    var arrayAnswerIndex = questionChoices[questionNumber - 1];
    for (var i = 0; i < arrayAnswerIndex.length; i++) {
        btn = document.createElement("button")
        btn.textContent = arrayAnswerIndex[i];

        var isCorrect = isBtnCorrect(arrayAnswerIndex[i], correctAnswers);
        if (isCorrect) {
            btn.setAttribute("data-answer-id", true);
        } else if (!isCorrect) {
            btn.setAttribute("data-answer-id", false);
        }
        btnContainer.appendChild(btn);
    }
    main.appendChild(btnContainer);
}

function isBtnCorrect(answerBtn, correctAnswers) {
    var isTrue = false;
    for (var i = 0; i < correctAnswers.length; i++) {
        if (answerBtn === correctAnswers[i]) {
            isTrue = true;
        }
    }
    return isTrue;
}

function nextQuestion(event) {
    //if ()
}