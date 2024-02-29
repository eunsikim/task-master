import {
	render,
	screen,
	fireEvent,
	getByLabelText,
} from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Page from "@/app/login/page";
// ADD IMPORTS AS NEEDED

// ADD MOCK AS NEEDED

describe("Test", () => {
	test("invalid", async () => {
		const user = userEvent.setup();

		render(<Page />);

		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const button = screen.getByText("Login");

		await user.type(email, "JohnDough123@gmail.com");
		await user.type(password, "paddwrd123");
		await fireEvent.click(button);

		const alert = await screen.findByRole("alert");

		expect(alert).toHaveTextContent("ERROR");
	});

	test("valid", async () => {
		const user = userEvent.setup();

		render(<Page />);

		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const button = screen.getByText("Login");

		await user.type(email, "JohnDough123@gmail.com");
		await user.type(password, "password123");
		await fireEvent.click(button);

		const alert = await screen.findByRole("alert");

		expect(alert).toHaveTextContent("Login Successful");
	});
});
