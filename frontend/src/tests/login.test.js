import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login";

test("login form works", async () => {
  render(<Login />);

  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const button = screen.getByText("Login");

  await userEvent.type(username, "test");
  await userEvent.type(password, "test123");
  await userEvent.click(button);

  expect(username.value).toBe("test");
});