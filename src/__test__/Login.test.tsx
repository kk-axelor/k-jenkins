import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import Login from "../pages/Login";

const renderWithAuth = (component: React.ReactElement) => {
  return render(<AuthProvider>{component}</AuthProvider>);
};

describe("Login Integration Test", () => {
  test("render login form element", () => {
    renderWithAuth(<Login />);
    expect(screen.getByText("Login to Notes App")).toBeInTheDocument();
  });
});
