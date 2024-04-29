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
global.fetch = jest.fn((http, req) => {
  const { first_name, last_name, email, password } = JSON.parse(req.body);

  let message;

  function validatePasswordSpecialCase(password) {
    const specialChars = /[!@#$%^&*]/;

    if (specialChars.test(password)) {
      return true;
    } else {
      return false;
    }
  }

  function validatePasswordNumber(password) {
    const specialChars = /[!@#$%^&*]/;

    const digit = /\d/;

    if (specialChars.test(password) && digit.test(password)) {
      return true;
    } else {
      return false;
    }
  }

  function validatePasswordLength(password) {
    if (password.length > 8) {
      return true;
    } else {
      return false;
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    return emailRegex.test(email);
  }

  if (
    !first_name?.trim() ||
    !last_name?.trim() ||
    !email?.trim() ||
    !password?.trim()
  ) {
    message = "All fields are required and cannot be empty.";
  } else if (!validatePasswordSpecialCase(password)) {
    message = "Password requires at least 1 special character (e.g !@#$%^&*)";
  } else if (!validatePasswordNumber(password)) {
    message = "Password requires at least 1 number";
  } else if (!validatePasswordLength(password)) {
    message = "Password requires to have a length greater than 8";
  } else if (email === "JohnDoe123@gmailcom") {
    message = "Email already in use";
  } else if (!validateEmail(email)) {
    message = "Invalid Email Format";
  } else {
    message = "Registration Successful";
  }

  const res = {
    json: jest.fn().mockResolvedValue({
      message: message,
    }),
  };

  return res;
});

describe("Password validation", () => {
  test("For at least 1 special character in password", async () => {
    const user = userEvent.setup();

    render(<Page />);

    const fname = screen.getByLabelText("First Name");
    const lname = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const button = screen.getByText("Login");

    await user.type(fname, "John");
    await user.type(lname, "Dough");
    await user.type(email, "JohnDough123@gmail.com");
    await user.type(password, "pass1"); //password is missing a special character
    await fireEvent.click(button);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent(
      "Password requires at least 1 special character (e.g !@#$%^&*)"
    );
  });

  test("For at least 1 number in password", async () => {
    const user = userEvent.setup();

    render(<Page />);

    const fname = screen.getByLabelText("First Name");
    const lname = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const button = screen.getByText("Login");

    await user.type(fname, "John");
    await user.type(lname, "Dough");
    await user.type(email, "JohnDough123@gmail.com");
    await user.type(password, "pass!"); //password is missing at least 1 number
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
    await user.type(lname, "Dough");
    await user.type(email, "JohnDough123@gmail.com");
    await user.type(password, "pass123!"); //password is too short
    await fireEvent.click(button);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent(
      "Password requires to have a length greater than 8"
    );
  });
});

describe("Email validation", () => {
  test("Incorrect Email Format", async () => {
    const user = userEvent.setup();

    render(<Page />);

    const fname = screen.getByLabelText("First Name");
    const lname = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const button = screen.getByText("Login");

    await user.type(fname, "John");
    await user.type(lname, "Dough");
    await user.type(email, "JohnDough123"); //email is missing the @ and the domain
    await user.type(password, "pass123!!");
    await fireEvent.click(button);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent("Invalid Email Format");
  });

  test("For registering with an email already in use", async () => {
    const user = userEvent.setup();

    render(<Page />);

    const fname = screen.getByLabelText("First Name");
    const lname = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const button = screen.getByText("Login");

    await user.type(fname, "John");
    await user.type(lname, "Doe");
    await user.type(email, "JohnDoe123@gmailcom");
    await user.type(password, "password123!");
    await fireEvent.click(button);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent("Email already in use");
  });
});

describe("Registration validation", () => {
  test("For Empty input fields", async () => {
    const user = userEvent.setup();

    render(<Page />);

    const fname = screen.getByLabelText("First Name");
    const lname = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const button = screen.getByText("Login");

    await user.type(fname, " ");
    await user.type(lname, " ");
    await user.type(email, " ");
    await user.type(password, " ");
    await fireEvent.click(button);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent(
      "All fields are required and cannot be empty."
    );
  });

  test("For valid registration", async () => {
    //all criteria is met with this test
    const user = userEvent.setup();

    render(<Page />);

    const fname = screen.getByLabelText("First Name");
    const lname = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const button = screen.getByText("Login");

    await user.type(fname, "John");
    await user.type(lname, "Dough");
    await user.type(email, "JohnDough123@gmail.com");
    await user.type(password, "password123!");
    await fireEvent.click(button);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent("Registration Success");
  });
});
