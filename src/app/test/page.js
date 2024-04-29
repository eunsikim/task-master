"use client";
// Import necessary hooks and components from React and Next.js
import { useState } from "react";

export default function TaskManager() {
	const [tasks, setTasks] = useState([]);
	const [currentTask, setCurrentTask] = useState("");
	const [editingId, setEditingId] = useState(null);

	const createTask = () => {
		if (!currentTask.trim()) return; // Avoid adding empty tasks
		setTasks([...tasks, { id: Date.now(), title: currentTask }]);
		setCurrentTask(""); // Reset input field after task creation
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	const startEdit = (id) => {
		const taskToEdit = tasks.find((task) => task.id === id);
		if (taskToEdit) {
			setCurrentTask(taskToEdit.title);
			setEditingId(id);
		}
	};

	const saveTask = () => {
		setTasks(
			tasks.map((task) => {
				if (task.id === editingId) {
					return { ...task, title: currentTask };
				}
				return task;
			})
		);
		setEditingId(null);
		setCurrentTask("");
	};

	return (
		<div>
			<input
				type="text"
				value={currentTask}
				onChange={(e) => setCurrentTask(e.target.value)}
				placeholder="Enter task title"
			/>
			<button onClick={createTask}>Create</button>
			<button onClick={() => editingId && saveTask()}>Save</button>
			{tasks.map((task) => (
				<li key={task.id}>
					{task.title}
					<button onClick={() => deleteTask(task.id)}>Delete</button>
					<button onClick={() => startEdit(task.id)}>Edit</button>
				</li>
			))}
		</div>
	);
}
