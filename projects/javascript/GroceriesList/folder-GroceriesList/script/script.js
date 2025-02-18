const groceryForm = document.getElementById("grocery-form");
const groceryInput = document.getElementById("grocery-input");
const groceryList = document.getElementById("grocery-list");
const grocerySuggestions = document.getElementById("grocery-suggestions");

const STORAGE_KEY = "groceries";

let groceries = [];
let allGroceries = [];

function fetchGroceries() {
	fetch("./data/groceries.json")
		.then((response) => response.json())
		.then((defaultGroceries) => {
			allGroceries = defaultGroceries.map((item) => item.name);
			commonSuggestions(allGroceries);
			groceries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
			displayGroceries();
		})
		.catch((error) => {
			console.error(error.message);
		});
}

function commonSuggestions(options) {
	grocerySuggestions.innerHTML = options
		.map((option) => `<option value="${option}"></option>`)
		.join("");
}

function saveGroceries() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(groceries));
}

function displayGroceries() {
	groceryList.innerHTML = "";
	groceries.forEach((item, index) => {
		const li = document.createElement("li");
		li.className = item.checked ? "checked" : "";
		li.innerHTML = `
<span class="item-name">${item.name}</span>
<div class="grocery-actions">
${
	item.checked
		? `<button onclick="toggleChecked(${index})"><i class="fa-solid fa-square-xmark"></i></button>`
		: `<button onclick="toggleChecked(${index})"><i class="fa-solid fa-square-check"></i></button>`
}
<button onclick="editGrocery(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
<button onclick="deleteGrocery(${index})"><i class="fa-solid fa-trash-can"></i></button>
</div>
`;
		groceryList.appendChild(li);
	});
}

groceryForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const name = groceryInput.value.trim();
	if (name) {
		groceries.push({ name, checked: false });
		groceryInput.value = "";
		saveGroceries();
		displayGroceries();
		feedbackMessage("added");
	}
});

function toggleChecked(index) {
	groceries[index].checked = !groceries[index].checked;
	saveGroceries();
	displayGroceries();
}

function editGrocery(index) {
	const newName = prompt("Edit the item:", groceries[index].name);
	if (newName !== null && newName.trim() !== "") {
		groceries[index].name = newName.trim();
		saveGroceries();
		displayGroceries();
		feedbackMessage("edited");
	}
}

function feedbackMessage(message) {
	const toastConfig = {
		duration: 3000,
		close: true,
		gravity: "top",
		position: "center",
		stopOnFocus: true,
	};

	switch (message) {
		case "edited":
			Toastify({
				...toastConfig,
				text: "Successfully edited!",
				style: {
					background: "#e08132",
					color: "#fff",
				},
			}).showToast();
			break;

		case "deleted":
			Toastify({
				...toastConfig,
				text: "Successfully deleted!",
				style: {
					background: "#dc3545",
					color: "#fff",
				},
			}).showToast();
			break;

		case "added":
			Toastify({
				...toastConfig,
				text: "Successfully added!",
				style: {
					background: "#28a745",
					color: "#fff",
				},
			}).showToast();
			break;

		default:
			Toastify({
				...toastConfig,
				text: "Something went wrong...",
				style: {
					background: "#6c757d",
					color: "#fff",
				},
			}).showToast();
			break;
	}
}

function deleteGrocery(index) {
	groceries.splice(index, 1);
	saveGroceries();
	displayGroceries();
	feedbackMessage("deleted");
}

fetchGroceries();
