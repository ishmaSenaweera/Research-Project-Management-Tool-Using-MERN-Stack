import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import FileUploadScreen from "../templates/fileUploadScreen";
import { unmountComponentAtNode } from "react-dom";

test("Check File Upload Page Renders Without Crashing", () => {
  render(
    <BrowserRouter>
      <FileUploadScreen />
    </BrowserRouter>
  );
});

test("Checking File Upload component is Working", () => {
  const div = document.createElement("div");
  render(
    <BrowserRouter>
      <FileUploadScreen />
    </BrowserRouter>,
    div
  );
  unmountComponentAtNode(div);
});

test("Checking File Upload component is Working", () => {
  const div = document.createElement("div");
  render(
    <BrowserRouter>
      <FileUploadScreen />
    </BrowserRouter>,
    div
  );
  unmountComponentAtNode(div);
});

