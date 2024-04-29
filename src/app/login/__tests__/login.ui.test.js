// src/app/login/__tests__/login.ui.test.js
import {
  render,
  screen,
  fireEvent,
  getByLabelText,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Page from "@/app/login/page";

// ADD IMPORTS AS NEEDED

// ADD MOCK AS NEEDED
// Mock
global.fetch = jest.fn((http, req) => {
  const { email, password } = JSON.parse(req.body);

  let message;

  if (email === "JohnDoe123@gmail.com" && password === "Password123!") {
    message = "Login Successful";
  } else {
    message = "ERROR";
  }

  const res = {
    json: jest.fn().mockResolvedValue({
      message: message,
    }),
  };

  return res;
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: "/mock-path",
    query: {},
  }),
}));

jest.mock("@/lib/auth", () => ({
  login: jest.fn().mockImplementation((req) => {
    return true;
  }),
}));

describe("Test for valid account", () => {
  test("error message with invalid sign-in credentials", async () => {
    const user = userEvent.setup();

    render(<Page />);

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const button = screen.getByText("Login");

    await user.type(email, "JohnDough123@gmail.com");
    await user.type(password, "paddwrd123"); //invalid password, expect to return alert message
    await fireEvent.click(button);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent("ERROR");
  });

  test("successful login message with valid login credentials", async () => {
    const user = userEvent.setup();

    render(<Page />);

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const button = screen.getByText("Login");

    await user.type(email, "JohnDoe123@gmail.com");
    await user.type(password, "Password123!");
    await fireEvent.click(button);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent("Login Successful");
  });
});
