import { DeleteTask, DoesTaskExist } from '../../database';

// src/app/api/auth/login/route.js
export async function DELETE(req) {
	// Delete task method
	
	// If id is empty
	if (!req.id) {
		let res = {
			status: 204,
			message: "Task No Content",
		};
		return res;
	}
	// If task does not exist
	if (!(await DoesTaskExist(req.id))) {
		let res = {
			status: 204,
			message: "Task No Content",
		};
		return res;
	}
	// Otherwise (task does exist) update task
	await DeleteTask(req.id);
	let res = {
		status: 200,
		message: "Task Deleted",
	};
	return res;
}
