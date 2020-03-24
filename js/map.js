// Leaflet
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
setInterval(getISS, 1000);

var satellite;

// SATELLITES
function chooseSatellite(satelliteName) {
  document.getElementById("about").scrollIntoView();
  satellite = satelliteName;
  switch (satelliteName) {
    case "India":
      India();
      break;
    case "Echo":
      Echo();
      break;
    case "Charlie":
      Charlie();
      break;
    case "Delta":
      Delta();
      break;
  }

  /*
    let img = document.createElement("img");
    var src = "images/satellites/" + satelliteName + ".png";
    img.setAttribute("src", src);
    img.setAttribute("id", "draggable");
    document.getElementById("mapView").appendChild(img);
  */

  function India(e) {
    var clickCircle1 = L.circle(e.latlng, 688888 * 3, {
      iconUrl: "images/satellites/India.png",
      color: "#6CFF33",
      fillOpacity: 0,
      opacity: 0.5
    }).addTo(map);
  }

  function Charlie() {}

  function Echo() {}

  function Delta() {}
}
