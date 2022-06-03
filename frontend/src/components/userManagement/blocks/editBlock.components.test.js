import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import BlockEdit from "./editBlock.components";

// ────────────────────────────────────────────────────────────────────────────────

test("renders the edit block page component", () => {
  const data = {};
  render(
    <BrowserRouter>
      <BlockEdit data={data} heading="Edit Student" loggedIn="Student" />
    </BrowserRouter>
  );
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the edit block page component heading and button", () => {
  const data = {};
  render(
    <BrowserRouter>
      <BlockEdit data={data} heading="Edit Student" loggedIn="Student" />
    </BrowserRouter>
  );
  const element = screen.getAllByText("Edit Student");
  expect(element).toHaveLength(2);
});

// ────────────────────────────────────────────────────────────────────────────────

test("email input should have a type as email", () => {
  const data = {};
  render(
    <BrowserRouter>
      <BlockEdit data={data} heading="Edit Student" loggedIn="Student" />
    </BrowserRouter>
  );
  const email = screen.getByPlaceholderText("E-mail");
  expect(email).toHaveAttribute("type", "email");
});

// ────────────────────────────────────────────────────────────────────────────────

test("DoB input should have a type as date", () => {
  const data = {};
  render(
    <BrowserRouter>
      <BlockEdit data={data} heading="Edit Student" loggedIn="Student" />
    </BrowserRouter>
  );
  const email = screen.getByPlaceholderText("dob");
  expect(email).toHaveAttribute("type", "date");
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the SLIIT ID when the loggedIn equal to Student", () => {
  const data = {};
  render(
    <BrowserRouter>
      <BlockEdit data={data} heading="Edit Student" loggedIn="Student" />
    </BrowserRouter>
  );
  const element = screen.getAllByText("SLIIT ID:");
  expect(element).toHaveLength(1);
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the Name when the loggedIn equal to Admin", () => {
  const data = {};
  render(
    <BrowserRouter>
      <BlockEdit data={data} heading="Edit Student" loggedIn="Admin" />
    </BrowserRouter>
  );
  const element = screen.getAllByText("Name:");
  expect(element).toHaveLength(1);
});
