import { CreateTask } from '../../database';
// src/app/api/auth/login/route.js
export async function POST(req) {
	// Create task method

	// If task has no title,
	if (!req.title) {
		let res = {
			status: 204,
			message: "Task No Content",
		};
		return res;
	}
	// Otherwise, insert task into DB
	await CreateTask(req.title);
	let res = {
		status: 200,
		message: "Task Created",
	};
	return res;
}
