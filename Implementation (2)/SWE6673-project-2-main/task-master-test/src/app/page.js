"use client";
import { useEffect, useState, useRef } from "react";
import { GetAllUsers } from "./api/database";

export default function Home() {
  const [userString, setUserString] = useState("");
  const handleGetUsers = async (e) => {
    GetAllUsers().then(
      function (value) {
        //success
        console.log(value);
        for (let k = 0; k < value.length; k = k + 1) {
          setUserString(
            userString +
              value[k].id +
              " " +
              value[k].fname +
              " " +
              value[k].lname +
              " " +
              value[k].email +
              "\n"
          );
        }
      },
      function (error) {
        //failure
        console.log("Error occurred with GetAllUsers ... o.O");
      }
    );
  };

  const [Tasks, SetTasks] = useState([]);

  async function getTasks() {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api`, postData);

    const response = await res.json();

    SetTasks(response.tasks);

    console.log(response);
    console.log(Tasks);
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <main>
      <div className="text-center mt-4 col-md-6 mx-auto">
        <h1>Tasks:</h1>
        <div>
          {Tasks.map((item, index) => {
            return (
              <div key={item.task_id}>
                <hr></hr>
                <span>task_id</span>: {item.task_id} <br />{" "}
                <span>task_title</span>: {item.task_title} <hr></hr>
              </div>
            );
          })}
        </div>
      </div>
      <p>All users</p>
      <button onClick={handleGetUsers}>Refresh</button>
      {userString}
    </main>
  );
}
