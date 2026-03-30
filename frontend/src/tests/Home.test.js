import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/Home";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "Test Property",
            description: "Nice place",
            price_per_night: 100,
          },
        ]),
    })
  );
});

test("renders properties", async () => {
  render(<Home />);

  expect(screen.getByText(/properties/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Test Property")).toBeInTheDocument();
  });
});