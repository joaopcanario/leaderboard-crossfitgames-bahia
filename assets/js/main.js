function loadRandomImage() {
  var dir = 'assets/img/rotator_';
  var images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];
  var randomCount = Math.round(Math.random() * (images.length - 1));

  document.getElementById("topBG").style.backgroundImage = "url(" + dir + images[randomCount] + ")";
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

<<<<<<< HEAD
function leaderboard2PDF(file, type) {
=======
function leaderboard2PDF(type) {
>>>>>>> upstream/master
  var table = document.getElementsByTagName("table")[0];
  var tbody = table.getElementsByTagName("tbody")[0];

  var columns = ["Atleta / Box", "17.1", "17.2", "17.3", "17.4", "17.5"];
  var data = [];
  var tableRow;

  // go through cells
  for (var i = 1; i < table.rows.length; i++) {
    tableRow = table.rows[i];

    data.push([`${tableRow.cells[0].innerHTML} (${tableRow.cells[3].innerHTML}) \t${tableRow.cells[1].innerHTML} \n\n${tableRow.cells[2].innerHTML}`,
      tableRow.cells[4].innerHTML,
      tableRow.cells[5].innerHTML,
      tableRow.cells[6].innerHTML,
      tableRow.cells[7].innerHTML,
      tableRow.cells[8].innerHTML,
    ]);
  }

  var doc = new jsPDF();

  doc.autoTable(columns, data, {
    startY: 96,
    styles: {overflow: 'linebreak', columnWidth: 'wrap'},
    columnStyles: {text: {columnWidth: 'auto'}},
    margin: {left: 22, top: 96},
    addPageContent: function(data) {
      var y_position = doc.internal.pageSize.height - 6;

      // Header
      doc.setFontSize(15);
      doc.setTextColor(80);
      doc.setFontStyle('bold');
      doc.addImage(topPDFb64, 'JPEG', 57, 0, 95, 95);
      doc.text(type, data.settings.margin.left, 94);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(20);
      doc.setFontStyle('normal');
      doc.text("Desenvolvedores: Cristiano Santos (CrosFit Imbuí) e João Paulo Canário (CrossFit Barra Action)", 42, y_position - 6);
      doc.text("Todas as informações foram processadas a partir do site da Reebok CrossFit Games.\n\t\t\tCrossFit is a registered trademark \u00AE of CrossFit, Inc.", 50, y_position);
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
    leaderboard2PDF("Masculino");
  } else {
    leaderboard2PDF("Feminino");
  }
});
