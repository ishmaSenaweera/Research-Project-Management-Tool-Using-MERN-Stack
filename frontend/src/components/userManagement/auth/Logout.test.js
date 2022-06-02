import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import LogOut from "./Logout";

test("renders the Logout button page", () => {
  render(
    <BrowserRouter>
      <LogOut />
    </BrowserRouter>
  );
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the Logout button of the Logout page", () => {
  render(
    <BrowserRouter>
      <LogOut />
    </BrowserRouter>
  );
  const element = screen.getByText("Log out");
  expect(element).toBeInTheDocument();
});
