const playerList = document.querySelector("#player-list");
const form = document.querySelector("#add-player-form");

var nbPlayer = 0;

// FORMULAIRE PLAYER
form.addEventListener("submit", e => {
  e.preventDefault();

  nbPlayer++;
  var playerAdded = false;
  var players = db.collection("players");

  if (nbPlayer <= 4) {
    // GUEST PLAYER
    if (document.getElementById("guestCheckBox").checked == true) {
      addPlayerInList("0", form.username.value, "none");
      playerAdded = true;
    }
    // REGISTERED PLAYER
    else {
      players.get().then(function(querySnapsot) {
        querySnapsot.forEach(function(doc) {
          if (
            //VERIFICATION
            form.username.value == doc.data().username &&
            form.password.value == doc.data().password
          ) {
            addPlayerInList(doc.id, doc.data().username, doc.data().password);
            playerAdded = true;
          }
        });
      });
    }
  } else {
    alert("The game supports 4 players maximum and 1 minimum");
  }

  if (!playerAdded) {
    nbPlayer--;
    alert("No player found in database");
  }
});

// ADD A PLAYER TO THE LIST
function addPlayerInList(id, username, record) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let score = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", id);
  name.textContent = username;
  score.textContent = "highest score: " + record;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(score);
  li.appendChild(cross);

  playerList.appendChild(li);
  cross.addEventListener("click", e => {
    nbPlayer--;
    cross.parentNode.parentNode.removeChild(li);
  });
}

var guestCheckbox = document.querySelector("input[name=guestCheckBox]");

// GUEST CHECKBOX
guestCheckbox.addEventListener("change", function() {
  var password = document.getElementById("password");
  if (this.checked) {
    password.disabled = true;
    password.value = "";
  } else {
    password.disabled = false;
  }
});

// PLAY -- AFTER REGISTER PLAYERS
function play() {
  if (hasCorrectNumberOfPlayers()) {
    form.parentNode.removeChild(form);
    playerList.disabled = true;
    var playButton = document.getElementById("playButton");
    playButton.parentNode.removeChild(playButton);
  } else {
    alert("You need at least 1 player and maximum 4");
  }
}

// CHECKING NUMBER OF PLAYERS
function hasCorrectNumberOfPlayers() {
  if (nbPlayer > 0 && nbPlayer < 5) {
    return true;
  } else {
    return false;
  }
}

//Leaflet
var map = L.map("carte").setView([48.8534, 2.3488], 6);
L.tileLayer(
	"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
	{
		maxZoom: 20
	}
).addTo(map);

const issIcon = L.icon({
	iconUrl: "iss200.png",
	iconSize: [50, 32],
	iconAnchor: [25, 16]
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;

async function getISS() {
	const response = await fetch(api_url);
	const data = await response.json();
	const { latitude, longitude } = data;

	marker.setLatLng([latitude, longitude]);
	if (firstTime) {
		map.setView([latitude, longitude], 2);
		firstTime = false;
	}
	document.getElementById("lat").textContent = latitude.toFixed(2);
	document.getElementById("lon").textContent = longitude.toFixed(2);
}

getISS();

// create element and render player
/*
function renderplayer(doc) {
	let li = document.createElement("li");
	let name = document.createElement("span");
	let score = document.createElement("span");
	let cross = document.createElement("div");

	li.setAttribute("data-id", doc.id);
	name.textContent = doc.data().username;
	score.textContent = "highest score: " + doc.data().record;
	cross.textContent = "x";

	li.appendChild(name);
	li.appendChild(score);
	li.appendChild(cross);

	playerList.appendChild(li);

	// deleting data
	cross.addEventListener("click", e => {
		let id = e.target.parentElement.getAttribute("data-id");
		db.collection("players")
			.doc(id)
			.delete();
	});
}
// getting data
// db.collection("players")
// 	.orderBy("username")
// 	.get()
// 	.then(snapshot => {
// 		snapshot.docs.forEach(doc => {
// 			console.log(doc.data());
// 			renderplayer(doc);
// 		});
// 	});

// realTime listener
db.collection("players")
	.orderBy("username")
	.onSnapshot(snapshot => {
		let changes = snapshot.docChanges();
		changes.forEach(change => {
			//console.log(change.doc.data())
			if (change.type == "added") {
				renderplayer(change.doc);
			} else if (change.type == "removed") {
				let li = playerList.querySelector("[data-id=" + change.doc.id + "]");
				playerList.removeChild(li);
			}
		});
	});

// saving data
form.addEventListener("submit", e => {
	e.preventDefault();
	db.collection("players").add({
		username: form.username.value,
		password: form.password.value,
		record: 0
	});
	form.username.value = "";
	form.password.value = "";
});
*/
