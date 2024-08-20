import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders dessert card image", () => {
  render(<App />);
  const ImageElement = screen.getByAltText(/Waffle with Berries/i);
  expect(ImageElement).toBeInTheDocument();
});

test("render dessert card heading", () => {
  render(<App />);
  const HeadingElement = screen.getByText(/Waffle with Berries/i);
  expect(HeadingElement).toBeInTheDocument();
});
