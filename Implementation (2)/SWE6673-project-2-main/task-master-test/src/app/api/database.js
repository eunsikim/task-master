'use server'
import mysql from "mysql2/promise";
import fs from "fs";

// REGION: User table data queries

// Returns true or false, where true = email/password combo exists in DB
export async function Login(email, password) {
    const response = await query({
        query: "SELECT * FROM users WHERE email = '"+email+"' AND password = '"+password+"'",
        values: [],
    })
    if (response.length !== 0) {
        return true;
    }
    return false;
}

// Returns true or false in a SQL OK packet, where true = registration successful
export async function Register(fname, lname, email, password) {
    const response = await query({
        query: "INSERT INTO users (fname, lname, email, password) VALUES ('"+fname+"', '"+lname+"', '"+email+"', '"+password+"')",
        values: [],
    })
    return response;
}
// Returns true or false, where true = email already exists in DB
export async function DoesEmailExist(email) {
    const response = await query({
        query: "SELECT * FROM users WHERE email = '" + email + "'",
        values: [],
    });
    if (response.length === 0) {
        return false;
    }
    return true;
}

// Gets the first name and last name 
export async function GetUserInfo(email) {
    const user = await query({
        query: "SELECT fname, lname, email FROM users WHERE email = '" + email +"'",
        values: [],
    })
    return user;
}

// ENDREGION
// REGION: Task table data queries

// Create task
export async function CreateTask(title) {
    const resposne = await query({
		query: "INSERT INTO tasks (title) values (title = '" + title + "')",
		values: [],
	});
    return resposne;
}

// Get all tasks
export async function GetTasks(id) {
    const resposne = await query({
		query: "SELECT * FROM tasks",
		values: [],
	});
    return resposne;
}

// Update task
export async function UpdateTask(id, title) {
    const resposne = await query({
		query: "UPDATE tasks SET title = '" + title + "' WHERE id = '" + id + "'",
		values: [],
	});
    return resposne;
}

// Delete task by id
export async function DeleteTask(id) {
    const resposne = await query({
		query: "DELETE FROM tasks WHERE id = '" + id + "'",
		values: [],
	});
    return resposne;
}

// Does task exist with id
export async function DoesTaskExist(id) {
    const response = await query({
        query: "SELECT * FROM tasks WHERE id = '" + id + "'",
        values: [],
    })
    if (response.length !== 0) {
        return true;
    }
    return false;
}
// ENDREGION

// Execute a query on the DB.
// NOTE: this is a localhost DB using MySQL Community Server.
// Change credentials as needed.
export async function query({query, values = []}){
    const dbconnection = await mysql.createConnection({
        host: "localhost",
        database: "swe6673_tasks",
        user: "root",
        password: "Keyto_mysql_123#",
    });
    try{
        const [res] = await dbconnection.execute(query, values);
        dbconnection.end();
        return res;
    }
    catch(error){
        throw Error(error.message);
        return { error };
    }
}