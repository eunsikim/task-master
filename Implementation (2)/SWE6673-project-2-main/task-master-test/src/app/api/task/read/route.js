import { GetTasks } from '../../database';

// src/app/api/auth/login/route.js
export async function GET() {
	// Read task info method
	
	let tasks = await GetTasks();
	let res = {
		status: 200,
		message: "Tasks Read",
		body: tasks
	};
	return res;
}
