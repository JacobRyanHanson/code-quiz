loadScores();

function loadScores() {
    var savedScores = JSON.parse(localStorage.getItem("highScores"));
    if (!savedScores) {
        return false;
    }

    var scoreList = document.querySelector(".score-list");
    var orderedList = document.createElement("ol");
    for (var i = 0; i < savedScores.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent += savedScores[i].identity + " " + savedScores[i].score;
        orderedList.appendChild(listItem);
    }
    scoreList.appendChild(orderedList);
}