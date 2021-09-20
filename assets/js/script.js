var startQuizBtn = document.querySelector("#start-quiz");

startQuizBtn.addEventListener("click", startQuizHandler);

function startQuizHandler(event) {
    var introPage = document.querySelectorAll(".intro");
    for (var i = 0; i < introPage.length; i++) {
        introPage[i].remove();
    }
}