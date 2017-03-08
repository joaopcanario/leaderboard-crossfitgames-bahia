function loadJSON(file, callback) {

var xobj = new XMLHttpRequest();
xobj.overrideMimeType("application/json");
xobj.open('GET', file, true);

xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
    }
};

xobj.send(null);
}

function createLeaderboard(response) {
var data = JSON.parse(response);

var score = document.getElementById("score");
var tr;

score.innerHTML = "";

for (var i = 0; i < data.length; i++) {
    tr = document.createElement('tr');

    tr.innerHTML = "<td class=\"mdl-data-table__cell--non-numeric\">" + data[i].name + "</td><td>" + data[i].affiliate + "</td><td>" + data[i].overallScore + "</td><td>" + data[i].wod1Display + "</td><td>" + data[i].wod2Display + "</td><td>-</td><td>-</td><td>-</td>";

    score.appendChild(tr);
}
}

loadJSON("assets/data/women_leaderboard.json", createLeaderboard);