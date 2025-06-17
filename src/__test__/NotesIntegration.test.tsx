import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Notes Integration Test", () => {
  it("allow user to login and add test", async () => {
    const user = userEvent.setup();

    render(<App />);
    await user.type(
      screen.getByPlaceholderText(/enter your username/i),
      "testUser"
    );

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/welcome, testuser/i)).toBeInTheDocument();

    expect(screen.getByTestId("no-notes-message")).toBeInTheDocument();

    await user.type(screen.getByTestId("note-input"), "Integration test note");
    await user.click(screen.getByTestId("add-note-button"));

    expect(screen.getByText(/integration test note/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /logout/i }));

    expect(
      screen.getByPlaceholderText(/enter your username/i)
    ).toBeInTheDocument();
  });
});
