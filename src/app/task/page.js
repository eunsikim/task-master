"use client";

import React, { useState } from "react";
import { Alert } from "react-bootstrap";

export default function Page() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState("");

    const [currentDeadline, setCurrentDeadline] = useState("");
    const [currentLocation, setCurrentLocation] = useState("");
    const [currentNote, setCurrentNote] = useState("");
    const [editingId, setEditingId] = useState(null);

    const handleDelete = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const handleEdit = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        if (taskToEdit) {
            setCurrentTask(taskToEdit.title);
            setCurrentDeadline(taskToEdit.deadline || "");
            setCurrentLocation(taskToEdit.location || "");
            setCurrentNote(taskToEdit.note || "");
            setEditingId(id);
        }
    };

    const handleAdd = () => {
        if (!currentTask.trim()) return;
        setTasks((prevTasks) => [
            ...prevTasks,
            {
                id: Date.now(),
                title: currentTask,
                deadline: currentDeadline || "",
                location: currentLocation || "",
                note: currentNote || "",
            },
        ]);

        setCurrentTask("");
        setCurrentDeadline("");
        setCurrentLocation("");
        setCurrentNote("");
    };

    const handleSave = () => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === editingId) {
                    return {
                        ...task,
                        title: currentTask,
                        deadline: currentDeadline,
                        location: currentLocation,
                        note: currentNote,
                    };
                }
                return task;
            })
        );

        setEditingId(null);
        setCurrentTask("");
        setCurrentDeadline("");
        setCurrentLocation("");
        setCurrentNote("");
    };

    return (
        <main>
            <Alert key="success" variant="success" dismissible>
                NO MESSAGE
            </Alert>
            <input
                type="text"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                placeholder="What Is Your Task?"
            />
            <input
                type="date"
                value={currentDeadline}
                onChange={(e) => setCurrentDeadline(e.target.value)}
                placeholder="Enter Deadline for the Task (Optional)"
            />
            <input
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                placeholder="Enter Location for the Task (Optional)"
            />
            <input
                type="text"
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Enter a Note for the Task (Optional)"
            />
            <button onClick={handleAdd}>Create</button>
            {editingId ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button disabled>Save</button>
            )}
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        {task.deadline && (
                            <div>
                                <p>Deadline: </p>
                                <p>{task.deadline}</p>
                            </div>
                        )}
                        {task.location && (
                            <div>
                                <p>Location: </p>
                                <p>{task.location}</p>
                            </div>
                        )}
                        {task.note && (
                            <div>
                                <p>Note: </p> <p>{task.note}</p>
                            </div>
                        )}
                        <button onClick={() => handleDelete(task.id)}>
                            Delete
                        </button>
                        <button onClick={() => handleEdit(task.id)}>
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
}
