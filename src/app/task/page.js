// this is the task manager homepage

"use client";

import { Alert } from "react-bootstrap";

export default function Page() {
  const handleLogin = async (e) => {
    e.preventDefault();
  };
  return (
    <main>
      <Alert key="success" variant="success" dismissible>
        "NO MESSAGE"
      </Alert>
      <form
        onSubmit={handleLogin}
        className="p-4 my-5 d-flex flex-column"
        method="post"
        id="form"
      >
        <label htmlFor="fname-input">Task Name</label>
        <input id="taskName-input" />
        <button type="submit">Create Task</button>
        <button type="submit">Delete Task</button>
        <button type="submit">Edit Task</button>
        <button type="submit">Save Task</button>
      </form>
    </main>
  );
}
