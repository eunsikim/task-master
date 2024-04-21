import { UpdateTask, DoesTaskExist } from '../../database';

// src/app/api/auth/login/route.js
export async function PUT(req) {
	// Update task method

	// If id or title are empty
	if (!req.id || !req.title) {
		let res = {
			status: 404,
			message: "Task Not Found",
		};
		return res;
	}

	// If task does not exist
	if (!(await DoesTaskExist(req.id))) {
		let res = {
			status: 404,
			message: "Task Not Found",
		};
		return res;
	}
	// Otherwise (task does exist) update task
	await UpdateTask(req.id, req.title);
	let res = {
		status: 200,
		message: "Task Updated",
	};
	return res;
}
