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

		const createButton = screen.getByText("Create");
		const taskInput = screen.getByPlaceholderText("What Is Your Task?");
		await user.type(taskInput, "Go the Store");
		await fireEvent.click(createButton);

		const result = await screen.findByText("Go the Store");
		expect(result).toBeInTheDocument();
	});
});

describe("Edit a Task from the List", () => {
	test("Edit a task", async () => {
		const user = userEvent.setup();

		render(<Page />);

		// Setup
		const createButton = screen.getByText("Create");
		const taskInput = screen.getByPlaceholderText("What Is Your Task?");
		await user.type(taskInput, "Go the Store");
		await fireEvent.click(createButton);

		const editButton = screen.getByText("Edit");
		const saveButton = screen.getByText("Save");
		await fireEvent.click(editButton);

		await user.clear(taskInput);
		await user.type(taskInput, "Go the Mall");
		await fireEvent.click(saveButton);

		const result = await screen.findByText("Go the Mall");

		expect(result).toBeInTheDocument();
		expect(screen.queryByText("Go to the store")).not.toBeInTheDocument();
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
