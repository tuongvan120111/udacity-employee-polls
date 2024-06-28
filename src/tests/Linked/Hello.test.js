import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HelloWorld from "./Hello";

test("it renders a login button", async () => {
  render(<HelloWorld />);

  // Use React Testing Library's queryByText to find the login button
  const loginButton = screen.queryByText("Login");

  // Assert that the login button exists
  expect(loginButton).toBeInTheDocument();
});
