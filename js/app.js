const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");
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
  players.get().then(function(querySnapsot) {
    querySnapsot.forEach(function(doc) {
      if (
        form.username.value == doc.data().username &&
        form.password.value == doc.data().password
      ) {
        var found = true;

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
      }
    });
  });

  if (!found) {
    alert("mauvais identifiant ou mot de passe");
  }
});
