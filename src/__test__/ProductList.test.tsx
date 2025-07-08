import { screen } from "@testing-library/react";
import { renderWithProvider } from "./test-utils";
import ProductList from "../components/shopping/ProductList";

jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(),
}));

describe("ProductList Component", () => {
  it("renders product list with products", () => {
    renderWithProvider(<ProductList />);

    expect(screen.getByTestId("product-list")).toBeInTheDocument();
    expect(screen.getByText("Available Products")).toBeInTheDocument();
  });
});
