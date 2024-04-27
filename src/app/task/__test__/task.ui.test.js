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
import { DateCalendar } from "@mui/x-date-pickers";
import { element } from "prop-types";
// ADD IMPORTS AS NEEDED

// ADD MOCK AS NEEDED

describe("Task List", () => {
  test("Add a task", async () => {
    const user = userEvent.setup();

    render(<Page />);

    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    await user.type(taskInput, "Go to the Store");
    await fireEvent.click(createButton);

    const result = await screen.findByText("Go to the Store");
    expect(result).toBeInTheDocument();
  });
  test("Add a date/ deadline to a task", async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Setup
    //Create task
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    await user.type(taskInput, "Go to the Store");

    //Create deadline
    const deadlineInput = screen.getByTestId("deadlineInput");
    const d = new Date();
    const deadlineDate = d.toLocaleDateString(); //turn current date (MM/DD/YYYY) into a string
    await user.type(deadlineInput, deadlineDate);

    //Event is created
    await fireEvent.click(createButton);

    //Find the task and its deadline

    const taskDeadlineResult = await screen.findByText(deadlineDate);
    expect(taskDeadlineResult).toBeInTheDocument();
  });
  test("Add a location to a task", async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Setup
    //Create task
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    await user.type(taskInput, "Go to the Store");

    //Create location
    const locationInputFromUser = screen.getByPlaceholderText(
      "Enter Location for the Task (Optional)"
    );
    await user.type(
      locationInputFromUser,
      "123 Main Street, Atlanta, Georgia 30080"
    );

    //Task is created
    await fireEvent.click(createButton);

    //Find the task and its location

    const taskLocationResult = await screen.findByText(
      "123 Main Street, Atlanta, Georgia 30080"
    );
    expect(taskLocationResult).toBeInTheDocument();
  });
  test("Add a note to a task", async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Setup
    //Create task
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    await user.type(taskInput, "Go to the Store");

    //Create a note
    const locationInputFromUser = screen.getByPlaceholderText(
      "Enter a Note for the Task (Optional)"
    );
    await user.type(locationInputFromUser, "Buy flowers");

    //Task is created
    await fireEvent.click(createButton);

    //Find the task and its note

    const taskNoteResult = await screen.findByText("Buy flowers");
    expect(taskNoteResult).toBeInTheDocument();
  });
});

describe("Edit a Task from the List", () => {
  test("Edit a task", async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Setup
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    await user.type(taskInput, "Go to the Store");
    await fireEvent.click(createButton);

    const editButton = screen.getByText("Edit");
    const saveButton = screen.getByText("Save");
    await fireEvent.click(editButton);

    await user.clear(taskInput);
    await user.type(taskInput, "Go to the Mall");
    await fireEvent.click(saveButton);

    const result = await screen.findByText("Go to the Mall");

    expect(result).toBeInTheDocument();
    expect(screen.queryByText("Go to the store")).not.toBeInTheDocument();
  });

  test("Edit a location to nothing", async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Setup
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    const locationInput = screen.getByPlaceholderText(
      "Enter Location for the Task (Optional)"
    );
    await user.type(taskInput, "Go to the Store");
    await user.type(locationInput, "123 Main Street, Atlanta, Georgia 30080");

    await fireEvent.click(createButton); // Task is created

    //User enters Edit Mode for the Task
    const editButton = screen.getByText("Edit");
    const saveButton = screen.getByText("Save");
    await fireEvent.click(editButton);

    await user.clear(locationInput); //user makes location empty

    await fireEvent.click(saveButton); //task is saved and updated

    expect(locationInput == "");
    expect(
      screen.queryByText("123 Main Street, Atlanta, Georgia 30080")
    ).not.toBeInTheDocument();
  });

  test("Edit a location to a different location", async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Setup
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    const locationInput = screen.getByPlaceholderText(
      "Enter Location for the Task (Optional)"
    );
    await user.type(taskInput, "Go to the Store");
    await user.type(locationInput, "123 Main Street, Atlanta, Georgia 30080");

    await fireEvent.click(createButton); // Task is created

    //User enters Edit Mode for the Task
    const editButton = screen.getByText("Edit");
    const saveButton = screen.getByText("Save");
    await fireEvent.click(editButton);

    await user.clear(locationInput); //user makes location empty
    await user.type(locationInput, "999 New Street, Tokyo, Japan 100-0000"); //user enters in a new, different location

    await fireEvent.click(saveButton); //task is saved and updated

    const result = await screen.findByText(
      "999 New Street, Tokyo, Japan 100-0000"
    );

    expect(result).toBeInTheDocument();
    expect(
      screen.queryByText("123 Main Street, Atlanta, Georgia 30080")
    ).not.toBeInTheDocument();
  });

  test("Edit a note to nothing", async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Setup
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    const noteInput = screen.getByPlaceholderText(
      "Enter a Note for the Task (Optional)"
    );
    await user.type(taskInput, "Go to the Store");
    await user.type(noteInput, "Buy flowers");

    await fireEvent.click(createButton); // Task is created

    //User enters Edit Mode for the Task
    const editButton = screen.getByText("Edit");
    const saveButton = screen.getByText("Save");
    await fireEvent.click(editButton);

    await user.clear(noteInput); //user makes note empty

    await fireEvent.click(saveButton); //task is saved and updated

    expect(noteInput == "");
    expect(screen.queryByText("Buy flowers")).not.toBeInTheDocument();
  });

  test("Edit a note to be a new, different note", async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Setup
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    const noteInput = screen.getByPlaceholderText(
      "Enter a Note for the Task (Optional)"
    );
    await user.type(taskInput, "Go to the Store");
    await user.type(noteInput, "Buy flowers"); //original input

    await fireEvent.click(createButton); // Task is created

    //User enters Edit Mode for the Task
    const editButton = screen.getByText("Edit");
    const saveButton = screen.getByText("Save");
    await fireEvent.click(editButton);

    await user.clear(noteInput); //user makes note empty
    await user.type(noteInput, "Buy a diamond ring"); //user enters in a new, different note/message

    await fireEvent.click(saveButton); //task is saved and updated

    const result = await screen.findByText("Buy a diamond ring");

    expect(result).toBeInTheDocument();
    expect(screen.queryByText("Buy flowers")).not.toBeInTheDocument();
  });
});

describe("Delete a Task from the List", () => {
  test("Delete a task", async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Setup
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    await user.type(taskInput, "Go the Store");
    await fireEvent.click(createButton);

    const deleteButton = screen.getByText("Delete");
    await fireEvent.click(deleteButton);

    expect(screen.queryByText("Go to the store")).not.toBeInTheDocument();
  });
});
