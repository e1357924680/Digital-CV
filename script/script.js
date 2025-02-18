document.addEventListener("DOMContentLoaded", () => {
	const hamburger = document.getElementById("hamburger");
	const navbarLinks = document.getElementById("navbar-links");
	const dropdownToggle = document.getElementById("dropdown-toggle");
	const dropdownMenu = document.getElementById("dropdown-menu");

	hamburger.addEventListener("click", () => {
		navbarLinks.classList.toggle("show");
	});

	dropdownToggle.addEventListener("click", (e) => {
		e.stopPropagation();
		dropdownMenu.classList.toggle("show");
	});

	document.addEventListener("click", () => {
		dropdownMenu.classList.remove("show");
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector(".contact-form form");
	const firstName = document.getElementById("inputFirstName4");
	const lastName = document.getElementById("inputLastName4");
	const email = document.getElementById("inputEmail");
	const phone = document.getElementById("inputPhone");

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		let isValid = true;

		document
			.querySelectorAll(".validation-message")
			.forEach((msg) => (msg.textContent = ""));

		if (!firstName.value.trim()) {
			displayMessage(firstName, "First name is required.");
			isValid = false;
		}

		if (!lastName.value.trim()) {
			displayMessage(lastName, "Last name is required.");
			isValid = false;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email.value.trim()) {
			displayMessage(email, "Email is required.");
			isValid = false;
		} else if (!emailRegex.test(email.value.trim())) {
			displayMessage(email, "Please enter a valid email.");
			isValid = false;
		}

		if (!phone.value.trim()) {
			displayMessage(phone, "Phone number is required.");
			isValid = false;
		} else if (phone.value.trim().length < 9) {
			displayMessage(phone, "Phone number must have at least 9 characters.");
			isValid = false;
		}

		if (isValid) {
			alert("Form submitted successfully!");
			form.reset();
		}
	});

	function displayMessage(input, message) {
		const messageDiv = input.parentElement.querySelector(".validation-message");
		if (messageDiv) {
			messageDiv.textContent = message;
		}
	}
});
