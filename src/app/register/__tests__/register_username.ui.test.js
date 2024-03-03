// src/app/register/__tests__/register_username.test.js
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
// User's email address will be the username for TaskMaster.

//Test cases to ensure username is valid (email address meets standard criteria)
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
    await user.type(email, "JohnDoe123gmail.com"); //mising the @
    await user.type(password, "password123!");
    await fireEvent.click(button);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent("Invalid Email Detected.");

    test("Requires a period after a @", async () => {
      const user = userEvent.setup();

      render(<Page />);

      const fname = screen.getByLabelText("First Name");
      const lname = screen.getByLabelText("Last Name");
      const email = screen.getByLabelText("Email");
      const password = screen.getByLabelText("Password");
      const button = screen.getByText("Login");

      await user.type(fname, "John");
      await user.type(lname, "Doe");
      await user.type(email, "JohnDoe123@gmailcom"); //missing the period after @
      await user.type(password, "password123!");
      await fireEvent.click(button);

      const alert = await screen.findByRole("alert");

      expect(alert).toHaveTextContent("Invalid Email Detected.");
    });

    test("Error if there are special characters (besides @) in the email address", async () => {
      const user = userEvent.setup();

      render(<Page />);

      const fname = screen.getByLabelText("First Name");
      const lname = screen.getByLabelText("Last Name");
      const email = screen.getByLabelText("Email");
      const password = screen.getByLabelText("Password");
      const button = screen.getByText("Login");

      await user.type(fname, "John");
      await user.type(lname, "Doe");
      await user.type(email, "JohnDoe!#3@gmailcom"); //contains special characters
      await user.type(password, "password123!");
      await fireEvent.click(button);

      const alert = await screen.findByRole("alert");

      expect(alert).toHaveTextContent("Invalid Email Detected.");
    });

    test("Error if multiple periods in a row", async () => {
      const user = userEvent.setup();

      render(<Page />);

      const fname = screen.getByLabelText("First Name");
      const lname = screen.getByLabelText("Last Name");
      const email = screen.getByLabelText("Email");
      const password = screen.getByLabelText("Password");
      const button = screen.getByText("Login");

      await user.type(fname, "John");
      await user.type(lname, "Doe");
      await user.type(email, "JohnDoe123@gmail..com"); // 2 periods in a row
      await user.type(password, "password123!");
      await fireEvent.click(button);

      const alert = await screen.findByRole("alert");

      expect(alert).toHaveTextContent("Invalid Email Detected.");
    });

    test("Error if multiple @ in email address", async () => {
      const user = userEvent.setup();

      render(<Page />);

      const fname = screen.getByLabelText("First Name");
      const lname = screen.getByLabelText("Last Name");
      const email = screen.getByLabelText("Email");
      const password = screen.getByLabelText("Password");
      const button = screen.getByText("Login");

      await user.type(fname, "John");
      await user.type(lname, "Doe");
      await user.type(email, "JohnDoe123@@gmail..com"); // 2 @ in email address
      await user.type(password, "password123!");
      await fireEvent.click(button);

      const alert = await screen.findByRole("alert");

      expect(alert).toHaveTextContent("Invalid Email Detected.");
    });

    test("Requires a complete email domain", async () => {
      const user = userEvent.setup();

      render(<Page />);

      const fname = screen.getByLabelText("First Name");
      const lname = screen.getByLabelText("Last Name");
      const email = screen.getByLabelText("Email");
      const password = screen.getByLabelText("Password");
      const button = screen.getByText("Login");

      await user.type(fname, "John");
      await user.type(lname, "Doe");
      await user.type(email, "JohnDoe123@gmail."); //missing text after the period (i.e should be .com, .org, .edu, etc.,)
      await user.type(password, "password123!");
      await fireEvent.click(button);

      const alert = await screen.findByRole("alert");

      expect(alert).toHaveTextContent("Invalid Email Detected.");
    });
    test("Error when field is empty", async () => {
      const user = userEvent.setup();

      render(<Page />);

      const fname = screen.getByLabelText("First Name");
      const lname = screen.getByLabelText("Last Name");
      const email = screen.getByLabelText("Email");
      const password = screen.getByLabelText("Password");
      const button = screen.getByText("Login");

      await user.type(fname, "John");
      await user.type(lname, "Doe");
      await user.type(email, ""); //no  email address
      await user.type(password, "password123!");
      await fireEvent.click(button);

      const alert = await screen.findByRole("alert");

      expect(alert).toHaveTextContent(
        "Missing Email. Please Fill Out All Fields"
      );
    });
  });

  test("For valid username conditions are met", async () => {
    const user = userEvent.setup();

    render(<Page />);

    const fname = screen.getByLabelText("First Name");
    const lname = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const button = screen.getByText("Login");

    await user.type(fname, "John");
    await user.type(lname, "Doe");
    await user.type(email, "JohnDoe123@gmailcom"); // all conditions have been met!
    await user.type(password, "password123!");
    await fireEvent.click(button);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent("Registration Success");
  });
});
