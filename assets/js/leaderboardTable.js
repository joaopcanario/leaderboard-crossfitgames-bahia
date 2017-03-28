//function for screen resize
function getLeaderboardHead() {
  var h = parseInt(window.innerHeight);
  var w = parseInt(window.innerWidth);

  if(w <= 768) {
    return `
      <tr>
        <th class="table-headers" colspan="2"><h3>Atletas</h3></th>
      </tr>
    `
  } else if(w > 768 && w <=1320) {
    return `
      <tr>
        <th class="table-headers">Atleta</th>
        <th class="table-headers">17.1</th>
        <th class="table-headers">17.2</th>
        <th class="table-headers">17.3</th>
        <th class="table-headers">17.4</th>
        <th class="table-headers">17.5</th>
      </tr>
    `
  } else {
    return `
      <tr>
        <th class="mdl-data-table__cell--non-numeric table-headers">#</th>
        <th class="mdl-data-table__cell--non-numeric table-headers">Nome</th>
        <th class="mdl-data-table__cell--non-numeric table-headers">Box</th>
        <th class="table-headers">Score</th>
        <th class="table-headers">17.1</th>
        <th class="table-headers">17.2</th>
        <th class="table-headers">17.3</th>
        <th class="table-headers">17.4</th>
        <th class="table-headers">17.5</th>
      </tr>
    `
  }
}

//function for screen resize
function getLeaderboardTableContent(pos, atlt) {
  var h = parseInt(window.innerHeight);
  var w = parseInt(window.innerWidth);

  if(w <= 768) {
    return `
      <tr>
        <td>
          <div class="accordion">
            <table>
              <tr>
                <td>
                  <h5>
                    <strong>${pos} (${atlt.overallScore}) ${atlt.name}</strong><br>&nbsp;&nbsp;<small>${atlt.affiliate}</small>
                  </h5>
                </td>
                <td>
                  <i id="opened" class="material-icons">keyboard_arrow_down</i>
                  <i id="closed" class="material-icons">keyboard_arrow_right</i>
                </td>
              </tr>
            </table>
          </div>

          <div class="details">
            <ul class="mdl-list">
              <li class="mdl-list__item-sub-title odd">
                <strong>17.1:</strong> ${atlt.wod1Display} (${atlt.wod1Rank})
              </li>
              <li class="mdl-list__item-sub-title even">
                <strong>17.2:</strong> ${atlt.wod2Display} (${atlt.wod2Rank})
              </li>
              <li class="mdl-list__item-sub-title odd">
                <strong>17.3:</strong> ${atlt.wod3Display} (${atlt.wod3Rank})
              </li>
              <li class="mdl-list__item-sub-title even">
                <strong>17.4:</strong> ${atlt.wod4Display} (${atlt.wod4Rank})
              </li>
              <li class="mdl-list__item-sub-title odd">
                <strong>17.5:</strong> ${atlt.wod5Display} (${atlt.wod5Rank})
              </li>
            </ul>
          </div>

        </td>
      </tr>
    `
  } else if(w > 768 && w <=1320) {
    return `
      <tr>
        <td class="athlete">
          <h5>
            <strong>${pos} (${atlt.overallScore}) ${atlt.name}</strong><br>&nbsp;&nbsp;<small>${atlt.affiliate}</small>
          </h5>
        </td>
        <td>${atlt.wod1Display} (${atlt.wod1Rank})</td>
        <td>${atlt.wod2Display} (${atlt.wod2Rank})</td>
        <td>${atlt.wod3Display} (${atlt.wod3Rank})</td>
        <td>${atlt.wod4Display} (${atlt.wod4Rank})</td>
        <td>${atlt.wod5Display} (${atlt.wod5Rank})</td>
      </tr>
    `
  } else {
    return `
      <tr>
        <td>${pos}</td>
        <td class="mdl-data-table__cell--non-numeric">${atlt.name}</td>
        <td>${atlt.affiliate}</td>
        <td>${atlt.overallScore}</td>
        <td>${atlt.wod1Display} (${atlt.wod1Rank})</td>
        <td>${atlt.wod2Display} (${atlt.wod2Rank})</td>
        <td>${atlt.wod3Display} (${atlt.wod3Rank})</td>
        <td>${atlt.wod4Display} (${atlt.wod4Rank})</td>
        <td>${atlt.wod5Display} (${atlt.wod5Rank})</td>
      </tr>
    `
  }
}



function initAccordion() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function(){
      /* Toggle between hiding and showing the active panel */
      var panel = this.nextElementSibling;

      if (panel.style.display === "block") {
        this.querySelector("#closed").style.display = "inline";
        this.querySelector("#opened").style.display = "none";

        panel.style.display = "none";
      } else {
        this.querySelector("#closed").style.display = "none";
        this.querySelector("#opened").style.display = "inline";

        panel.style.display = "block";
      }
    });
  }
}