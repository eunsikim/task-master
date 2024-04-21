import { DoesEmailExist, Register } from "../../database";

// src/app/api/auth/register/route.js
export async function POST(req) {
	// Register function
	// request should have a first_name, last_name, email, password.
	// Check for empty fields - if any fields are empty,
	if ((!req.first_name || !req.last_name) || (!req.email || !req.password)) {
		let res = {
			status: 400,
			message: "All fields are required and cannot be empty."
		};
		return res;
	}
	// Otherwise if email already exists,
	if (await DoesEmailExist(req.email)) {
		let res = {
			status: 409,
			message: "Email already in use"
		};
		return res;
	}
	// Otherwise add account to the DB
	await Register(req.first_name, req.last_name, req.email, req.password);
	let res = {
		status: 200,
		message: "Success"
	};
	return res;
}
