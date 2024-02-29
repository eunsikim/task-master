"use client";

import { Alert } from "react-bootstrap";

export default function Page() {
	const handleLogin = async (e) => {
		console.log("Something");
	};

	return (
		<main>
			<Alert key="success" variant="success" dismissible>
				"NO MESSAGE"
			</Alert>
			<form
				onSubmit={handleLogin}
				className="p-4 my-5 d-flex flex-column"
			>
				<label htmlFor="email-input">Email</label>
				<input id="email-input" />

				<label htmlFor="password-input">Password</label>
				<input id="password-input" />

				<button type="submit">Login</button>
			</form>
		</main>
	);
}
