var btnForm = document.querySelector(".btn-form");
btnForm.addEventListener("click", updatePageHandler)

loadScores();

function loadScores() {
    var savedScores = JSON.parse(localStorage.getItem("highScores"));
    if (!savedScores) {
        return false;
    }

    var orderedList = document.querySelector(".score-list");
    for (var i = 0; i < savedScores.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent += savedScores[i].identity + " " + savedScores[i].score;
        orderedList.appendChild(listItem);
    }
}

function updatePageHandler(event) {
    event.preventDefault();
    if (event.target.matches(".return-btn")) {
        window.location.href = "./index.html";
    } else if (event.target.matches(".clear-btn")) {
        localStorage.removeItem("highScores");
        var listItems = document.querySelectorAll("li")
        for (var i = 0; i < listItems.length; i++) {
            listItems[i].remove();
        }
    }
}