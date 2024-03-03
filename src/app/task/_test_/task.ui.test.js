// src/app/login/__tests__/login.ui.test.js
import {
  render,
  screen,
  fireEvent,
  getByLabelText,
} from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Page from "@/app/task/page";
// ADD IMPORTS AS NEEDED

// ADD MOCK AS NEEDED

describe("Task List", () => {
  test("Add a task", async () => {
    const user = userEvent.setup();
    render(<Page />);

    const createButton = screen.getByText("Create New Task");
    const saveButton = screen.getByText("Save Task");
    fireEvent.click(createButton);
    const taskInput = screen.getByLabelText("What Is Your Task?");
    user.type(taskInput, "Go the Store");
    fireEvent.click(saveButton);

    const result = await screen.findByText("Go the Store");
    expect(result).toBeInTheDocument();
  });

  describe("Edit a Task from the List", () => {
    test("Edit a task", async () => {
      const user = userEvent.setup();
      render(<Page />);
      const originalTask = screen.getByText("Go to the store");
      const editButton = screen.getByText("Edit Task");
      const saveButton = screen.getByText("Save Task");
      fireEvent.click(editButton);
      const editInput = screen.getByLabelText("What Is Your Task?");
      user.type(editedTask, "Go to the mall");
      fireEvent.click(saveButton);
      expect(screen.getByText("Go to the mall")).toBeInTheDocument();
      expect(screen.getByText("Go to the store")).toBeNull();
    });
  });

  describe("Delete a Task from the List", () => {
    test("Delete a task", async () => {
      const user = userEvent.setup();
      render(<Page />);
      const deleteButton = screen.getByText("Delete Task");
      const taskToDelete = screen.queryByText("Go to the store");
      fireEvent.click(deleteButton);
      expect(taskToDelete).toBeNull();
    });
  });
});
