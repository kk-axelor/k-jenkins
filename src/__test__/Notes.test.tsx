import { render, screen } from "@testing-library/react";
import Notes from "../components/Notes";
import userEvent from "@testing-library/user-event";

describe("Notes Component", () => {
  // it("render empty state Correctly", () => {
  //   render(<Notes />);
  //   //assertion
  //   expect(screen.getByText(/my notes/i)).toBeInTheDocument();
  //   expect(screen.getByTestId("no-notes-message")).toBeInTheDocument();
  //   expect(screen.getByTestId("add-note-button")).toBeInTheDocument();
  // });
  // it("Allow adding new Notes", async () => {
  //   const user = userEvent.setup();
  //   render(<Notes />);
  //   await user.type(screen.getByTestId("note-input"), "New Note 1");
  //   await user.click(screen.getByTestId("add-note-button"));
  //   const notesList = screen.getAllByTestId("note-item");
  //   expect(notesList.length).toBe(1);
  //   expect(screen.getByText("New Note 1")).toBeInTheDocument();
  //   expect(screen.getByTestId("note-input")).toHaveValue("");
  // });
  // it("Allow deleting notes", async () => {
  //   const user = userEvent.setup();
  //   render(<Notes />);
  //   await user.type(screen.getByTestId("note-input"), "My new notes");
  //   await user.click(screen.getByTestId("add-note-button"));
  //   // assertion
  //   expect(screen.getByText("My new notes")).toBeInTheDocument();
  //   await user.click(screen.getByTestId("delete-button"));
  //   expect(screen.queryByText(/my new notes/i)).not.toBeInTheDocument();
  //   expect(screen.getByTestId("no-notes-message")).toBeInTheDocument();
  // });

  it("allow", () => {});
});
