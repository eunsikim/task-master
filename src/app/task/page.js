// this is the task manager homepage

"use client";

import { Alert } from "react-bootstrap";
import React, { useState } from "react";

export default function Page() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState("");
    const [editingId, setEditingId] = useState(null);

    const handleDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleEdit = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        if (taskToEdit) {
            setCurrentTask(taskToEdit.title);
            setEditingId(id);
        }
    };

    const handleAdd = () => {
        if (!currentTask.trim()) return; // Avoid adding empty tasks
        setTasks([...tasks, { id: Date.now(), title: currentTask }]);
        setCurrentTask(""); // Reset input field after task creation
    };

    const handleSave = () => {
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
        <main>
            <Alert key="success" variant="success" dismissible>
                "NO MESSAGE"
            </Alert>
            <input
                type="text"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                placeholder="What Is Your Task?"
            />
            <button onClick={handleAdd}>Create</button>
            <button onClick={() => editingId && handleSave()}>Save</button>
            {tasks.map((task) => (
                <li key={task.id}>
                    {task.title}
                    <button onClick={() => handleDelete(task.id)}>
                        Delete
                    </button>
                    <button onClick={() => handleEdit(task.id)}>Edit</button>
                </li>
            ))}
        </main>
    );
}
