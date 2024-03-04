// src/app/register/page.js
"use client";

import { Alert } from "react-bootstrap";

// function will check if user's input email address meets the following requirements
// - contains a @ and a period in the email domain
// - contains text after the period in the email domain (i.e .com, .edu, etc.,)
// - errors will occur if there is the above conditions are not met, and/or if there are additional special characters, repeating periods or @
function emailValidationChecker(emailAddress) {
	return emailAddress;
}

//function will check that user input is not blank
function filledInField(emailAddress) {
	return emailAddress;
}

export default function Page() {
	const handleLogin = async (e) => {
		e.preventDefault();
	};

	return (
		<main>
			<Alert key="success" variant="success" dismissible>
				"NO MESSAGE"
			</Alert>
			<form
				onSubmit={handleLogin}
				className="p-4 my-5 d-flex flex-column"
				method="post"
				id="form"
			>
				<label htmlFor="fname-input">First Name</label>
				<input id="fname-input" />

				<label htmlFor="lname-input">Last Name</label>
				<input id="lname-input" />

				<label htmlFor="email-input">Email</label>
				<input id="email-input" />

				<label htmlFor="password-input">Password</label>
				<input id="password-input" />

				<button type="submit">Login</button>
			</form>
		</main>
	);
}
