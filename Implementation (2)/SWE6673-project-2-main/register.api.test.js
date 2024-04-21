// src/app/api/aut/register/__tests__/register.api.test.js
import { POST } from "@/app/api/auth/register/route";
// ADD IMPORTS AS NEEDED

// ADD MOCK AS NEEDED

describe("Test Register API responses", () => {
	test("For registering with email already in use", async () => {
		const req = {
			first_name: "John",
			last_name: "Doe",
			email: "JohnDoe123@gmail.com",
			password: "password123!",
		};

		const res = await POST(req);

		expect(res.status).toBe(409);
		expect(res.message).toBe("Email already in use");
	});

	test("For empty input fields", async () => {
		const req = {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
		};

		const res = await POST(req);

		expect(res.status).toBe(400);
		expect(res.message).toBe(
			"All fields are required and cannot be empty."
		);
	});

	test("For valid registration", async () => {
		const req = {
			first_name: "John",
			last_name: "Doe",
			email: "JohnDoe456@gmail.com",
			password: "password123!",
		};

		const res = await POST(req);

		expect(res.status).toBe(200);
		expect(res.message).toBe("Success");
	});
});
