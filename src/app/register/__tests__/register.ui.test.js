// src/app/login/__tests__/login.ui.test.js
import {
	render,
	screen,
	fireEvent,
	getByLabelText,
} from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Page from "@/app/register/page";
// ADD IMPORTS AS NEEDED

// ADD MOCK AS NEEDED

describe("Password validation", () => {
	test("For at least 1 special character", async () => {
		const user = userEvent.setup();

		render(<Page />);

		const fname = screen.getByLabelText("First Name");
		const lname = screen.getByLabelText("Last Name");
		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const button = screen.getByText("Login");

		await user.type(fname, "John");
		await user.type(lname, "Doe");
		await user.type(email, "JohnDoe123@gmail.com");
		await user.type(password, "pass");
		await fireEvent.click(button);

		const alert = await screen.findByRole("alert");

		expect(alert).toHaveTextContent(
			"Password requires at least 1 special character (e.g !@#$%^&*)"
		);
	});

	test("For at least 1 number", async () => {
		const user = userEvent.setup();

		render(<Page />);

		const fname = screen.getByLabelText("First Name");
		const lname = screen.getByLabelText("Last Name");
		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const button = screen.getByText("Login");

		await user.type(fname, "John");
		await user.type(lname, "Doe");
		await user.type(email, "JohnDoe123@gmail.com");
		await user.type(password, "pass!");
		await fireEvent.click(button);

		const alert = await screen.findByRole("alert");

		expect(alert).toHaveTextContent("Password requires at least 1 number");
	});

	test("For password length greater than 8", async () => {
		const user = userEvent.setup();

		render(<Page />);

		const fname = screen.getByLabelText("First Name");
		const lname = screen.getByLabelText("Last Name");
		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const button = screen.getByText("Login");

		await user.type(fname, "John");
		await user.type(lname, "Doe");
		await user.type(email, "JohnDoe123@gmail.com");
		await user.type(password, "pass123!");
		await fireEvent.click(button);

		const alert = await screen.findByRole("alert");

		expect(alert).toHaveTextContent(
			"Password requires to have a length greater than 8"
		);
	});

	test("For valid password", async () => {
		const user = userEvent.setup();

		render(<Page />);

		const fname = screen.getByLabelText("First Name");
		const lname = screen.getByLabelText("Last Name");
		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const button = screen.getByText("Login");

		await user.type(fname, "John");
		await user.type(lname, "Doe");
		await user.type(email, "JohnDoe123@gmail.com");
		await user.type(password, "password123!");
		await fireEvent.click(button);

		const alert = await screen.findByRole("alert");

		expect(alert).toHaveTextContent("Registration Success");
	});
});
