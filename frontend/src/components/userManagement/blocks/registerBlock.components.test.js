import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import BlockRegister from "./registerBlock.components";

// ────────────────────────────────────────────────────────────────────────────────

test("renders the register block page component", () => {
  render(
    <BrowserRouter>
      <BlockRegister heading="Register" />
    </BrowserRouter>
  );
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the register block page component heading and button", () => {
  const data = {};
  render(
    <BrowserRouter>
      <BlockRegister heading="Register" />
    </BrowserRouter>
  );
  const element = screen.getAllByText("Register");
  expect(element).toHaveLength(2);
});

// ────────────────────────────────────────────────────────────────────────────────

test("password input should have a type as password", () => {
  render(
    <BrowserRouter>
      <BlockRegister heading="Register" />
    </BrowserRouter>
  );
  const password = screen.getByPlaceholderText("Password");
  expect(password).toHaveAttribute("type", "password");
});

// ────────────────────────────────────────────────────────────────────────────────

test("email input should have a type as email", () => {
  render(
    <BrowserRouter>
      <BlockRegister heading="Register" />
    </BrowserRouter>
  );
  const email = screen.getByPlaceholderText("E-mail");
  expect(email).toHaveAttribute("type", "email");
});

// ────────────────────────────────────────────────────────────────────────────────

test("DoB input should have a type as date", () => {
  render(
    <BrowserRouter>
      <BlockRegister heading="Register" />
    </BrowserRouter>
  );
  const email = screen.getByPlaceholderText("dob");
  expect(email).toHaveAttribute("type", "date");
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the SLIIT ID when the heading equal to Register", () => {
  const data = {};
  render(
    <BrowserRouter>
      <BlockRegister heading="Register" />
    </BrowserRouter>
  );
  const element = screen.getAllByText("SLIIT ID:");
  expect(element).toHaveLength(1);
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the Name when the heading equal to Add Admin", () => {
  const data = {};
  render(
    <BrowserRouter>
      <BlockRegister heading="Add Admin" />
    </BrowserRouter>
  );
  const element = screen.getAllByText("Name:");
  expect(element).toHaveLength(1);
});

