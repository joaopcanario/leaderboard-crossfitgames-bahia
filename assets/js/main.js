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

function generateLeaderboard(file) {
    loadJSON(file, function(json) {
        var athletes = JSON.parse(json);
        var pos = 1, next = 1, prev = 0;

        var leaderboard = document.getElementById('leaderboard');
        leaderboard.innerHTML = "";

        athletes.forEach(athlete => {
            if (prev != athlete.overallScore) {
               pos = next;
            }

            prev = athlete.overallScore;
            next++;

            var elem = `
              <tr>
                <td>${pos}</td>
                <td class="mdl-data-table__cell--non-numeric">${athlete.name}</td>
                <td>${athlete.affiliate}</td>
                <td>${athlete.overallScore}</td>
                <td>${athlete.wod1Display} (${athlete.wod1Rank})</td>
                <td>${athlete.wod2Display} (${athlete.wod2Rank})</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            `;

            leaderboard.innerHTML += elem;
        });
    });
}

generateLeaderboard("assets/data/women_leaderboard.json");