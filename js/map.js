mapboxgl.accessToken =
  "pk.eyJ1IjoidmljaGkwNiIsImEiOiJjazc2YmRyeDUxM3VsM2d0MDh6ZHBnc2hqIn0.u1mi0Gf1Rs7_-HaiHsKTCw";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  zoom: 4.4,
  hash: true,
  center: [46.54, 2.84]
});

var layerList = document.getElementById("mapMenu");
var inputs = layerList.getElementsByTagName("input");

function switchLayer(layer) {
  var layerId = layer.target.id;
  map.setStyle("mapbox://styles/mapbox/" + layerId);
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
}

function toggle_map() {
  $("#button_toggle").hide();
  $("#map").toggle("slide");
  $("#mapMenu").toggle("slide");
}

function playerInvite() {
  var checkbox = document.getElementById("")
}

$("#Alpha").draggable();
$("#Echo").draggable();
$("#India").draggable();
$("#Charlie").draggable();
