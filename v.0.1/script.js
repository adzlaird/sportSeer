const epl_draggable_list = document.getElementById('epl-draggable-list');
const tweet = document.getElementById('tweet');

const preimerLeagueTeams = ['Bournemouth', 'Arsenal', 'Aston Villa', 'Brentford', 'Brighton', 'Burnley', 'Chelsea', 'Crystal Palace', 'Everton', 'Fulham', 'Liverpool', 'Luton Town', 'Manchester City', 'Manchester United', 'Newcastle United', 'Nottingham Forest', 'Sheffield United', 'Tottenham Hotspur', 'West Ham United', 'Wolves'];

const preimerLeagueTeamsHashtags = {'Bournemouth': "AFCB",
  'Arsenal': "AFC",
  'Aston Villa': "AVFC",
  'Brentford': "BrentfordFC",
  'Brighton': "BHAFC",
  'Burnley': "BurnleyFC",
  'Chelsea': "CFC",
  'Crystal Palace': "CPFC",
  'Everton': "EFC",
  'Fulham': "FFC",
  'Liverpool': "LFC",
  'Luton Town': "LTFC",
  'Manchester City': "MCFC",
  'Manchester United': "MUFC",
  'Newcastle United': "NUFC",
  'Nottingham Forest': "NFFC",
  'Sheffield United': "SUFC",
  'Tottenham Hotspur': "THFC",
  'West Ham United': "WHUFC",
  'Wolves': "WWFC"};

const indexToEmoji = {1: "🏆",
  2: "🥈",
  3: "🥉"}


//Store listitems
const eplListItems = [];

let dragStartIndex;

createList();

//Insert list items into DOM
function createList() {
  [...preimerLeagueTeams].forEach((team, index) => {
    const listItem = document.createElement('li');

    listItem.className = 'round'
    listItem.setAttribute('data-index', index);

    listItem.innerHTML = `
      <span class="number">${index+1}</span>
      <div class="draggable" draggable="true">
        <p class="team-name">${team}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

    eplListItems.push(listItem);

    epl_draggable_list.appendChild(listItem);
  });

  addEventListeneres();
}


function dragStart() {
  dragStartIndex = this.closest('li').getAttribute('data-index');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function dragEnter() {
  this.classList.add('over')
}

function dragLeave() {
  this.classList.remove('over')
}

function swapItems(fromIndex, toIndex) {
  const fromItem = eplListItems[fromIndex].querySelector('.draggable');
  const toItem = eplListItems[toIndex].querySelector('.draggable');

  //eplListItems[fromIndex].appendChild(toItem);
  eplListItems[toIndex].appendChild(fromItem);

  if (fromIndex > toIndex) {
    for (let i = toIndex; i < fromIndex; i++) {
      eplListItems[i+1].appendChild(eplListItems[i].querySelector('.draggable'));
    }
  } else {
    for (let i = toIndex; i > fromIndex; i--) {
      eplListItems[i-1].appendChild(eplListItems[i].querySelector('.draggable'));
    }
  }
}

function addEventListeneres() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  })

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  })
}



let imageForm = document.getElementById("imageForm");
const canvas = document.getElementById("imageCanvas");
canvas.style.width = "300px";
canvas.style.height = "375px";

imageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let darkTheme = document.getElementById("dark");
  let lightTheme = document.getElementById("light");

  let longDimension = document.getElementById("long");
  let squareDimension = document.getElementById("square");

  const ctx = canvas.getContext("2d");

  if (lightTheme.checked) {
    if (longDimension.checked) {
      var img = new Image();
      img.src = "file:///C:/Users/freed/Desktop/Sport%20Forecaster.co.uk/Website/images/predictorTables/EPL/202324/EPL_202324_Predictor_white_long.jpg"
      img.onload = function () {
        ctx.drawImage(img, 0, 0);

        ctx.font = "bolder 42px Quicksand";
        for (let i = 0; i < eplListItems.length; i++) {
          var teamNameArray = eplListItems[i].innerText.split(/(?<=^\S+)\s/);
          var teamName = teamNameArray[teamNameArray.length - 1];
          ctx.fillStyle = "#303030";
          ctx.fillText(teamName, 135, (186 + (i*59)));
        }
      }
    }
  } else if (darkTheme.checked) {
    if (longDimension.checked) {
      var img = new Image();
      img.src = "file:///C:/Users/freed/Desktop/Sport%20Forecaster.co.uk/Website/images/predictorTables/EPL/202324/EPL_202324_Predictor_dark_long.jpg"
      img.onload = function () {
        ctx.drawImage(img, 0, 0);

        ctx.font = "bolder 42px Quicksand";
        for (let i = 0; i < eplListItems.length; i++) {
          var teamNameArray = eplListItems[i].innerText.split(/(?<=^\S+)\s/);
          var teamName = teamNameArray[teamNameArray.length - 1];
          ctx.fillStyle = "#f2f2f2";
          ctx.fillText(teamName, 135, (186 + (i*59)));
        }
      }
    }
  }

  var tweet = document.getElementById("tweetForm");
  var tweetString = "https://twitter.com/intent/tweet?via=adzlaird&text=My%20predictions%20for%20the%202023/24%20EPL%20Season%21%0a%0a"
  for (let i = 0; i < 3; i++) {
      var teamNameArray = eplListItems[i].innerText.split(/(?<=^\S+)\s/);
      var teamName = teamNameArray[teamNameArray.length - 1].slice(1);
      tweetString += indexToEmoji[i+1] + "%20-%20%23" + preimerLeagueTeamsHashtags[teamName] + "%0a"
  }
  tweetString += "%20%20%20%20%20%20%20%20%20%20...%0a"
  for (let i = 17; i < 20; i++) {
      var teamNameArray = eplListItems[i].innerText.split(/(?<=^\S+)\s/);
      var teamName = teamNameArray[teamNameArray.length - 1].slice(1);
      tweetString += (i+1) + "%20-%20%23" + preimerLeagueTeamsHashtags[teamName] + "%0a"
  }
  tweetString += "%0a&hashtags=EPL%2CsportSeer"

  tweet.action = tweetString
});
