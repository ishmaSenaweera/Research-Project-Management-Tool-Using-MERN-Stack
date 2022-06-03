import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

test("renders the login page", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
});

// ────────────────────────────────────────────────────────────────────────────────

test("password input should have a type as password", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const password = screen.getByPlaceholderText("Password");
  expect(password).toHaveAttribute("type", "password");
});

// ────────────────────────────────────────────────────────────────────────────────

test("email input should have a type as email", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const email = screen.getByPlaceholderText("E-mail");
  expect(email).toHaveAttribute("type", "email");
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the heading of the login page", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const element = screen.getByText("Log in");
  expect(element).toBeInTheDocument();
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the email of the login page", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const element = screen.getByText("E-mail");
  expect(element).toBeInTheDocument();
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the password of the login page", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const element = screen.getByText("Password");
  expect(element).toBeInTheDocument();
});