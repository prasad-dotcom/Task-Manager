import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

test("renders TaskFlow", () => {
  render(<App />);
  const el = screen.getByText(/taskflow/i);
  expect(el).toBeInTheDocument();
});
