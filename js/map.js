// Leaflet
var map = L.map("carte").setView([48.8534, 2.3488], 6);
L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20
  }
).addTo(map);

// ISS
/*
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
setInterval(getISS, 1000);
*/

// SATELLITES
var satellite;
var satelliteIndia;
var satelliteEcho1;
var satelliteEcho2;
var satelliteCharlie1;
var satelliteCharlie2;
var satelliteDelta1;
var satelliteDelta2;

var playerNumber = 1;

function onMapClick(e) {
  switch (satellite) {
    case "India":
      India(e);
      break;
    case "Echo":
      Echo(e);
      break;
    case "Charlie":
      Charlie(e);
      break;
    case "Delta":
      Delta(e);
      break;
  }
}

map.on("click", onMapClick);

function chooseSatellite(satelliteName) {
  document.getElementById("about").scrollIntoView();
  // disable buttons
  var elems = document.getElementsByName("selectSatellite");
  changeButtonChoicesState(false);
  satellite = satelliteName;
}

function changeButtonChoicesState(state) {
  for (var i = 0; i < elems.length; i++) {
    elems[i].disabled = state;
  }
}

var indiaIcon;
var markerIndia;
function India(e) {
  if (satelliteIndia != undefined) {
    map.removeLayer(satelliteIndia);
    map.removeLayer(markerIndia);
  }

  indiaIcon = L.icon({
    iconUrl: "images/satellites/India.png",
    iconSize: [50, 32]
  });
  markerIndia = L.marker(e.latlng, { icon: indiaIcon }).addTo(map);

  satelliteIndia = L.circle(e.latlng, 688888 * 3, {
    color: "#000000",
    fillOpacity: 0,
    opacity: 0.5
  }).addTo(map);
}

function Charlie() {}

var markerEcho1;
var markerEcho2;
var nbEcho;
function Echo(e) {
  if (satelliteEcho2 != undefined) {
    map.removeLayer(satelliteEcho2);
    map.removeLayer(markerEcho2);
  }

  echoIcon = L.icon({
    iconUrl: "images/satellites/Echo.png",
    iconSize: [50, 32]
  });

  markerEcho1 = L.marker(e.latlng, { icon: echoIcon }).addTo(map);

  satelliteEcho1 = L.circle(e.latlng, 688888 * 3, {
    color: "#000000",
    fillOpacity: 0,
    opacity: 0.5
  }).addTo(map);

  nbEcho++;
}

function Delta() {}

function nextPlayer() {
  playerNumber++;
  document.getElementById("chooseSatelite").scrollIntoView();
  document.getElementById("instructionChoice").textContent =
    "Player " + playerNumber + " : choose a satellite";
  changeButtonChoicesState(true);
}
