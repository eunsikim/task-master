import { DoesEmailExist, Login } from "../../database";
// src/app/api/auth/login/route.js
export async function POST(req) {
	// Login function
	// request should have a email, password.
	// Check for empty fields - if any fields are empty,
	if ((!req.email || !req.password)) {
		let res = {
			status: 400,
			message: "All fields are required and cannot be empty."
		};
		return res;
	}
	// Otherwise if email doesn't exist,
	if (!(await DoesEmailExist(req.email))) {
		let res = {
			status: 401,
			message: "Email does not exist"
		};
		return res;
	}
	// Otherwise attempt login
	if (await Login(req.email, req.password)) {
		// success
		let res = {
			status: 200,
			message: "Login Successful"
		};
		return res;
	}
	else {
		// failed
		let res = {
			status: 401,
			message: "Incorrect password"
		};
		return res;
	}
}
