import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Login Integratio test", () => {
  it("allow user to login and see welcome messaage", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByPlaceholderText(/enter your username/i),
      "kunal"
    );
    await user.click(screen.getByRole("button", { name: /login/i }));

    //assertion
    expect(await screen.findByText(/Welcome, kunal/i)).toBeInTheDocument();
  });
});
