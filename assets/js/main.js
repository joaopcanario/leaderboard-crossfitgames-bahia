function loadRandomImage() {
  var dir = 'assets/img/rotator_';
  var images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];
  var randomCount = Math.round(Math.random() * (images.length - 1));

  document.getElementById("topBG").style.backgroundImage = "url(" + dir + images[randomCount] + ")";
}

function tableToJson(table) {
  var data = [];

  // go through cells
  for (var i = 1; i < table.rows.length; i++) {
    var tableRow = table.rows[i];

    // create an array rather than an object
    var rowData = [];
    for (var j = 0; j < tableRow.cells.length; j++) {
        rowData.push(tableRow.cells[j].innerHTML)
    }
    data.push(rowData);
  }

  return data;
}

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

    var leaderboard = document.getElementById('leaderboard-content');
    leaderboard.innerHTML = "";

    athletes.forEach(athlete => {
      if (prev != athlete.overallScore) {
        pos = next;
      }

      prev = athlete.overallScore;
      next++;

      var splited_name = athlete.name.split(" ");

      if (splited_name.length > 3) {
        athlete.name = splited_name[0] + " " + splited_name[1] + " " + splited_name[splited_name.length - 1];
      }

      var elem = `
        <tr>
          <td>${pos}</td>
          <td class="mdl-data-table__cell--non-numeric">${athlete.name}</td>
          <td>${athlete.affiliate}</td>
          <td>${athlete.overallScore}</td>
          <td>${athlete.wod1Display} (${athlete.wod1Rank})</td>
          <td>${athlete.wod2Display} (${athlete.wod2Rank})</td>
          <td>${athlete.wod3Display} (${athlete.wod3Rank})</td>
          <td>${athlete.wod4Display} (${athlete.wod4Rank})</td>
          <td>--(--)</td>
        </tr>
      `;

      leaderboard.innerHTML += elem;
    });
  });
}

function leaderboard2PDF(file, type) {
  var table = document.getElementsByTagName("table")[0];
  var tbody = table.getElementsByTagName("tbody")[0];

  var columns = ["#", "Nome", "Box", "Score", "17.1", "17.2", "17.3", "17.4", "17.5"];
  var data = tableToJson(tbody);

  var doc = new jsPDF();

  doc.autoTable(columns, data, {
    startY: 101,
    styles: {overflow: 'linebreak', columnWidth: 'wrap'},
    margin: {top: 101},
    addPageContent: function(data) {
      doc.setFontSize(15);
      doc.setTextColor(80);
      doc.setFontStyle('bold');
      doc.addImage(topPDFb64, 'JPEG', 57, 0, 95, 95);
      doc.text(type, data.settings.margin.left, 98);
    }
  });

  doc.output('dataurlnewwindow');
}

var topPDFb64 = null;

convertImgToBase64('assets/img/top-pdf.jpg', function(base64Img) {
    topPDFb64 = base64Img;
}, 'image/png')

loadRandomImage();
generateLeaderboard("assets/data/women_leaderboard.json");

var men = document.getElementById('menLeaderboard');
men.addEventListener('click', () => {
  generateLeaderboard("assets/data/men_leaderboard.json");
});

var women = document.getElementById('womenLeaderboard');
women.addEventListener('click', () => {
  generateLeaderboard("assets/data/women_leaderboard.json");
});

var viewAsPDF = document.getElementById('viewAsPDF');
viewAsPDF.addEventListener('click', () => {
  if (men.className.includes("is-active")){
    leaderboard2PDF("assets/data/men_leaderboard.json", "Masculino");
  } else {
    leaderboard2PDF("assets/data/women_leaderboard.json", "Feminino");
  }
});
