import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header2 from "../components/Header2";

test("Check for Getting Started Text", () => {
  const { getByText } = render(<Header2 />);
  expect(getByText("Food Truck.is")).toBeInTheDocument();
});
