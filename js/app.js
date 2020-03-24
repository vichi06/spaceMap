const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

var nbPlayer = 0;

// create element and render cafe
/*
function renderCafe(doc) {
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

	cafeList.appendChild(li);

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
// 			renderCafe(doc);
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
				renderCafe(change.doc);
			} else if (change.type == "removed") {
				let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
				cafeList.removeChild(li);
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

form.addEventListener("submit", e => {
	e.preventDefault();
	var players = db.collection("players");
	var found = false;
	if (document.getElementById("guestCheckBox").checked == true) {
		nbPlayer++;
		found = true;
		let li = document.createElement("li");
		let name = document.createElement("span");
		let score = document.createElement("span");
		let cross = document.createElement("div");

		li.setAttribute("data-id", "0");
		name.textContent = form.username.value;
		score.textContent = "highest score: " + "none";
		cross.textContent = "x";

		li.appendChild(name);
		li.appendChild(score);
		li.appendChild(cross);

		cafeList.appendChild(li);

		cross.addEventListener("click", e => {
			nbPlayer--;
			e.parentNode.removeChild(e);
		});
	} else {
		players.get().then(function(querySnapsot) {
			querySnapsot.forEach(function(doc) {
				if (
					form.username.value == doc.data().username &&
					form.password.value == doc.data().password
				) {
					found = true;
					nbPlayer++;

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

					cafeList.appendChild(li);

					cross.addEventListener("click", e => {
						nbPlayer--;
						cross.parentNode.parentNode.removeChild(li);
					});
				}
			});
		});
	}
	if (!found) {
		alert("mauvais identifiant ou mot de passe");
	}
});

var guestCheckbox = document.querySelector("input[name=guestCheckBox]");

guestCheckbox.addEventListener("change", function() {
	var password = document.getElementById("password");
	if (this.checked) {
		password.disabled = true;
		password.value = "";
	} else {
		password.disabled = false;
	}
});

function play() {
	if (nbPlayer > 0 && nbPlayer < 5) {
		form.parentNode.removeChild(form);
		cafeList.disabled = true;
		var playButton = document.getElementById("playButton");
		playButton.parentNode.removeChild(playButton);
	} else {
		alert("You need at least 1 player and maximum 4");
	}
}

var selectSatellite = document.querySelector("button[name=selectSatellite]");

selectSatellite.addEventListener("click", e => {
	alert("you have selected" + e.name);
});

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
