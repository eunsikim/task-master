// src/app/api/aut/login/__tests__/login.api.test.js
import { POST } from "@/app/api/auth/login/route";
// ADD IMPORTS AS NEEDED

// ADD MOCK AS NEEDED

describe("Test Login API responses", () => {
	test("Invalidate login wrong email", async () => {
		const req = {
			email: "JohnDough1281@gmail.com",
			password: "password123",
		};

		const res = await POST(req);

		expect(res.status).toBe(401);
		expect(res.message).toBe("Email does not exist");
	});

	test("Invalidate login wrong password", async () => {
		const req = {
			email: "JohnDough123@gmail.com",
			password: "paddwrd123",
		};

		const res = await POST(req);

		expect(res.status).toBe(401);
		expect(res.message).toBe("Incorrect password");
	});

	test("Invalidate Empty fields", async () => {
		const req = {
			email: "",
			password: "",
		};

		const res = await POST(req);

		expect(res.status).toBe(400);
		expect(res.message).toBe(
			"All fields are required and cannot be empty."
		);
	});

	test("Validate login", async () => {
		const req = {
			email: "JohnDoe123@gmail.com",
			password: "password123!",
		};

		const res = await POST(req);

		expect(res.status).toBe(200);
		expect(res.message).toBe("Login Successful");
	});
});
