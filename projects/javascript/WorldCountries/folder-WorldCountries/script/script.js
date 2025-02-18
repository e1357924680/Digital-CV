const API_URL = "https://restfulcountries.com/api/v1/countries";
const API_TOKEN = "1796|aRb2usJmeH4THH1nLxM0OucBgwV09D6QKUPt0JbW";

const countriesContainer = document.getElementById("countries-container");
const searchBox = document.getElementById("search-box");
const displayCountry = document.getElementById("country-display");
const countryFlag = document.getElementById("country-flag");
const countryInfo = document.getElementById("country-info");
const modal = document.getElementById("country-details-modal");
const modalContent = document.getElementById("country-details");
const closeModal = document.getElementById("close-modal");

let wishlistBtn = document.getElementById("wishlist-btn");

class Country {
	constructor(name, capital, population, flag, currency, continent, size) {
		this.name = name;
		this.capital = capital;
		this.population = population;
		this.flag = flag;
		this.currency = currency;
		this.continent = continent;
		this.size = size;
	}
}

let countries = [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function fetchCountries() {
	fetch(API_URL, {
		headers: { Authorization: `Bearer ${API_TOKEN}` },
	})
		.then((response) => response.json())
		.then((data) => {
			countries = data.data.map(
				(country) =>
					new Country(
						country.name,
						country.capital || "No information",
						country.population || "No information",
						country.href?.flag || "No information",
						country.currency || "No information",
						country.continent || "No information",
						country.size || "No information"
					)
			);
			displayCountries();
			console.log(countries);
		})
		.catch((error) => {
			console.error("Error fetching countries database: ", error);
		});
}

fetchCountries();

searchBox.addEventListener("input", () => {
	const query = searchBox.value.toLowerCase();
	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(query)
	);
	displayFilteredCountries(filteredCountries);
});

function displayFilteredCountries(filteredCountries) {
	countriesContainer.innerHTML = "";
	if (filteredCountries.length > 0) {
		filteredCountries.forEach((country) => {
			const countryCard = document.createElement("div");
			countryCard.classList.add("country-card");
			let countryName = country.name;
			countryCard.classList.add(countryName.replaceAll(" ", "-"));
			countryCard.innerHTML = `
               <img src="${country.flag}" alt="${country.name}" />
               <h2>${country.name}</h2>
               <div class="btn-container">
               <button class="btn" onclick="showCountryDetails('${
									country.name
								}')">Details</button>
               ${
									wishlist.includes(country.name)
										? `<button class="btn" onclick="updateWishlist('${country.name}')"><i class="fa-solid fa-heart" style="color: #ff0000;"></i></button>`
										: `<button class="btn" onclick="updateWishlist('${country.name}')"><i class="fa-regular fa-heart"></i></button>`
								}
               </div>
          `;
			countriesContainer.appendChild(countryCard);
		});
	} else {
		countriesContainer.innerHTML = "<p>No countries found.</p>";
	}
}

function displayCountries() {
	countriesContainer.innerHTML = "";
	countries.forEach((country) => {
		const countryCard = document.createElement("div");
		countryCard.classList.add("country-card");
		let countryName = country.name;
		countryCard.classList.add(countryName.replaceAll(" ", "-"));
		countryCard.innerHTML = `
               <img src="${country.flag}" alt="${country.name}" />
               <h2>${country.name}</h2>
               <div class="btn-container">
               <button class="btn" onclick="showCountryDetails('${
									country.name
								}')">Details</button>
               ${
									wishlist.includes(country.name)
										? `<button class="btn" onclick="updateWishlist('${country.name}')"><i class="fa-solid fa-heart" style="color: #ff0000;"></i></button>`
										: `<button class="btn" onclick="updateWishlist('${country.name}')"><i class="fa-regular fa-heart"></i></button>`
								}
               </div>
          `;
		countriesContainer.appendChild(countryCard);
	});
}

function showCountryDetails(countryName) {
	const country = countries.find((c) => c.name === countryName);
	if (!country) return;

	countryFlag.innerHTML = `<img src="${country.flag}" alt="${country.name}" />`;
	countryInfo.innerHTML = `
		<h2>${country.name}</h2>
		<p><strong>Capital:</strong> ${country.capital}</p>
		<p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
		<p><strong>Currency:</strong> ${country.currency}</p>
		<p><strong>Continent:</strong> ${country.continent}</p>
		<p><strong>Size:</strong> ${country.size}</p>
		<button id="details-wishlist-btn" class="btn" onclick="updateWishlist('${
			country.name
		}', true)">
			<i class="${
				wishlist.includes(country.name) ? "fa-solid" : "fa-regular"
			} fa-heart" 
			style="color: ${wishlist.includes(country.name) ? "#ff0000" : ""};"></i>
		</button>
	`;

	displayCountry.style.display = "flex";
}

function closeCountryDetails() {
	displayCountry.style.display = "none";
}

document
	.querySelector(".close-btn")
	.addEventListener("click", closeCountryDetails);

function updateWishlist(countryName, updateDetailsView = false) {
	if (!wishlist.includes(countryName)) {
		wishlist.push(countryName);
		localStorage.setItem("wishlist", JSON.stringify(wishlist));
	} else {
		wishlist.splice(wishlist.indexOf(countryName), 1);
		localStorage.setItem("wishlist", JSON.stringify(wishlist));
	}

	displayCountries();

	if (updateDetailsView) {
		const detailsWishlistBtn = document.getElementById("details-wishlist-btn");
		if (detailsWishlistBtn) {
			detailsWishlistBtn.innerHTML = `
				<i class="${
					wishlist.includes(countryName) ? "fa-solid" : "fa-regular"
				} fa-heart" 
				style="color: ${wishlist.includes(countryName) ? "#ff0000" : ""};"></i>
			`;
		}
	}

	const countryCardBtn = document.querySelector(
		`.country-card.${countryName.replaceAll(
			" ",
			"-"
		)} .btn-container button:last-child`
	);
	if (countryCardBtn) {
		countryCardBtn.innerHTML = `
			<i class="${
				wishlist.includes(countryName) ? "fa-solid" : "fa-regular"
			} fa-heart" 
			style="color: ${wishlist.includes(countryName) ? "#ff0000" : ""};"></i>
		`;
	}
}

let isWishlist = false;

document.getElementById("wishlist-toggle-btn").addEventListener("click", () => {
	isWishlist = !isWishlist;
	const buttonText = isWishlist
		? `<i class="fa-solid fa-house"></i>`
		: "Wish List";
	document.getElementById("wishlist-toggle-btn").innerHTML = buttonText;

	displayCountries();
});

function displayCountries() {
	countriesContainer.innerHTML = "";

	const countriesToDisplay = isWishlist
		? countries.filter((country) => wishlist.includes(country.name))
		: countries;

	countriesToDisplay.forEach((country) => {
		const countryCard = document.createElement("div");
		countryCard.classList.add("country-card");
		let countryName = country.name;
		countryCard.classList.add(countryName.replaceAll(" ", "-"));
		countryCard.innerHTML = `
			<img src="${country.flag}" alt="${country.name}" />
			<h2>${country.name}</h2>
			<div class="btn-container">
				<button class="btn" onclick="showCountryDetails('${
					country.name
				}')">Details</button>
				<button class="btn" onclick="updateWishlist('${country.name}')">
					<i class="${
						wishlist.includes(country.name) ? "fa-solid" : "fa-regular"
					} fa-heart" style="color: ${
			wishlist.includes(country.name) ? "#ff0000" : ""
		};"></i>
				</button>
			</div>
		`;
		countriesContainer.appendChild(countryCard);
	});
}
