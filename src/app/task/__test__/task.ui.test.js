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
    //test cases for adding a task; tasks can have an optional deadline, location, and note.
    const user = userEvent.setup();

    render(<Page />);
    //Setup, Create task
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    await user.type(taskInput, "Go to the Store");
    await fireEvent.click(createButton); //task is saved and created

    const result = await screen.findByText("Go to the Store"); //find task, task should be in document
    expect(result).toBeInTheDocument();
  });
  test("Add a deadline (date) to a task", async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Setup, Create task
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    await user.type(taskInput, "Go to the Store");

    //Create deadline
    const deadlineInput = screen.getByPlaceholderText(
      "Enter Deadline for the Task (Optional)"
    );
    const d = new Date();
    const deadlineDate = d.toISOString().slice(0, 10); //turn current date (MM/DD/YYYY) into a string
    fireEvent.change(deadlineInput, { target: { value: deadlineDate } });

    //Event is created
    await fireEvent.click(createButton);

    //Find the task and its deadline

    const taskDeadlineResult = await screen.findByText(deadlineDate);
    expect(taskDeadlineResult).toBeInTheDocument();
  });
  test("Add a location to a task", async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Setup, Create task
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

    // Setup, Create task
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
  //edit tasks, and their location, deadline, and note.
  test("Edit a task", async () => {
    //edit a task name
    const user = userEvent.setup();

    render(<Page />);

    // Setup
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    await user.type(taskInput, "Go to the Store"); //original task name
    await fireEvent.click(createButton);

    const editButton = screen.getByText("Edit");
    const saveButton = screen.getByText("Save");
    await fireEvent.click(editButton); //save original task name

    await user.clear(taskInput);
    await user.type(taskInput, "Go to the Mall"); //new task name
    await fireEvent.click(saveButton); //save new task name

    const result = await screen.findByText("Go to the Mall");

    expect(result).toBeInTheDocument(); //find new task name
    expect(screen.queryByText("Go to the store")).not.toBeInTheDocument(); //expect original task name not to be in document
  });
  test("Edit a deadline (date) to nothing", async () => {
    //remove the deadline of a task
    const user = userEvent.setup();

    render(<Page />);

    // Setup, Create task
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    await user.type(taskInput, "Go to the Store");

    //Create deadline
    const deadlineInput = screen.getByPlaceholderText(
      "Enter Deadline for the Task (Optional)"
    );
    const d = new Date();
    const deadlineDate = d.toISOString().slice(0, 10); //turn current date (MM/DD/YYYY) into a string, original deadline (date)
    fireEvent.change(deadlineInput, { target: { value: deadlineDate } });

    //Event is created
    await fireEvent.click(createButton);

    //User enters Edit Mode for the Task
    const editButton = screen.getByText("Edit");
    const saveButton = screen.getByText("Save");
    await fireEvent.click(editButton);

    await user.clear(deadlineInput); //user makes deadline empty

    await fireEvent.click(saveButton); //task is saved and updated

    expect(deadlineInput == ""); //expect deadline to be empty
    expect(screen.queryByText(deadlineDate)).not.toBeInTheDocument(); //original deadline to be removed
  });
  test("Edit a deadline (date) to another deadline (date)", async () => {
    const user = userEvent.setup();

    render(<Page />);

    // Setup, Create task
    const createButton = screen.getByText("Create");
    const taskInput = screen.getByPlaceholderText("What Is Your Task?");
    await user.type(taskInput, "Go to the Store");

    //Create deadline
    const deadlineInput = screen.getByPlaceholderText(
      "Enter Deadline for the Task (Optional)"
    );
    const d = new Date();
    const deadlineDate = d.toISOString().slice(0, 10); //turn current date (MM/DD/YYYY) into a string; original deadline (date)
    fireEvent.change(deadlineInput, { target: { value: deadlineDate } });

    //Event is created
    await fireEvent.click(createButton);

    //User enters Edit Mode for the Task
    const editButton = screen.getByText("Edit");
    const saveButton = screen.getByText("Save");
    await fireEvent.click(editButton);

    await user.clear(deadlineInput); //user makes deadline empty
    const tomorrowDeadlineDate = new Date(d); //create copy of the original deadline (date)
    tomorrowDeadlineDate.setDate(tomorrowDeadlineDate.getDate() + 1); // original deadline (date) + 1, in other words, deadline is for tomorrow
    const newDeadlineDateString = tomorrowDeadlineDate
      .toISOString()
      .slice(0, 10); //turn new, different deadline into a string
    await fireEvent.click(saveButton); //task is saved and updated

    expect(deadlineInput == newDeadlineDateString); //expect deadline to be empty
    expect(screen.queryByText(deadlineDate)).not.toBeInTheDocument(); //original deadline to be removed
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
    await user.type(locationInput, "123 Main Street, Atlanta, Georgia 30080"); //original location input

    await fireEvent.click(createButton); // Task is created

    //User enters Edit Mode for the Task
    const editButton = screen.getByText("Edit");
    const saveButton = screen.getByText("Save");
    await fireEvent.click(editButton);

    await user.clear(locationInput); //user makes location empty

    await fireEvent.click(saveButton); //task is saved and updated

    expect(locationInput == ""); //expect location to be empty
    expect(
      screen.queryByText("123 Main Street, Atlanta, Georgia 30080")
    ).not.toBeInTheDocument(); //original location to be removed
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
    await user.type(
      locationInput,
      "123 Main Street, Atlanta, Georgia 30080" //original location
    );

    await fireEvent.click(createButton); // Task is created

    //User enters Edit Mode for the Task
    const editButton = screen.getByText("Edit");
    const saveButton = screen.getByText("Save");
    await fireEvent.click(editButton);

    await user.clear(locationInput); //user makes location empty
    await user.type(locationInput, "999 New Street, Tokyo, Japan 100-0000"); //user enters in a new, different location

    await fireEvent.click(saveButton); //task is saved and updated

    const result = await screen.findByText(
      "999 New Street, Tokyo, Japan 100-0000" //find new, different location in the document
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
    await user.type(noteInput, "Buy flowers"); //original note

    await fireEvent.click(createButton); // Task is created

    //User enters Edit Mode for the Task
    const editButton = screen.getByText("Edit");
    const saveButton = screen.getByText("Save");
    await fireEvent.click(editButton);

    await user.clear(noteInput); //user makes note empty

    await fireEvent.click(saveButton); //task is saved and updated

    expect(noteInput == ""); //expect note to be empty
    expect(screen.queryByText("Buy flowers")).not.toBeInTheDocument(); // original note should not be in document
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

    expect(result).toBeInTheDocument(); //expect new, different note/messager to be in document
    expect(screen.queryByText("Buy flowers")).not.toBeInTheDocument(); //original note input should not be in document
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
    await fireEvent.click(deleteButton);//task is deleted 

    expect(screen.queryByText("Go to the store")).not.toBeInTheDocument(); //task name should not be in document
  });
});
