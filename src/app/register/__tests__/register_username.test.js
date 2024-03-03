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

describe("Username validation", () => {
  test("Requires a @", async () => {
    const user = userEvent.setup();

    render(<Page />);

    const fname = screen.getByLabelText("First Name");
    const lname = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const button = screen.getByText("Login");

    await user.type(fname, "John");
    await user.type(lname, "Doe");
    await user.type(email, "JohnDoe123gmail.com");
    await user.type(password, "pass");
    await fireEvent.click(button);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent("Invalid Email Detected.");

    test("Requires a @", async () => {
      const user = userEvent.setup();

      render(<Page />);

      const fname = screen.getByLabelText("First Name");
      const lname = screen.getByLabelText("Last Name");
      const email = screen.getByLabelText("Email");
      const password = screen.getByLabelText("Password");
      const button = screen.getByText("Login");

      await user.type(fname, "John");
      await user.type(lname, "Doe");
      await user.type(email, "JohnDoe123gmail.com");
      await user.type(password, "pass");
      await fireEvent.click(button);

      const alert = await screen.findByRole("alert");

      expect(alert).toHaveTextContent("Invalid Email Detected.");
    });
  });

  test("For valid username", async () => {
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
