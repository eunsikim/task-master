// src/app/api/aut/register/__tests__/register.api.test.js
import { POST } from "@/app/api/auth/register/route";
// ADD IMPORTS AS NEEDED

// ADD MOCK AS NEEDED
jest.mock("uuid", () => ({
    v4: jest.fn(() => {
        "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
    }),
}));

jest.mock("bcrypt", () => ({
    genSaltSync: jest.fn((saltRounds) => {
        return saltRounds;
    }),
    hashSync: jest.fn((password, salt) => {
        return password;
    }),
}));

jest.mock("@/lib/mysql", () => ({
    query: jest.fn().mockImplementation((req) => {
        if (req.values[3] == "JohnDoe123@gmail.com") {
            const error = new Error("Duplicate entry");
            error.code = "ER_DUP_ENTRY";
            return Promise.reject(error);
        }

        return Promise.resolve([
            {
                id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                first_name: "John",
                last_name: "Doe",
                email: "JohnDoe123@gmail.com",
                hash: "Password123!",
            },
        ]);
    }),
}));

describe("Test Register API responses", () => {
    test("For registering with email already in use", async () => {
        const req = {
            json: jest.fn().mockResolvedValue({
                first_name: "John",
                last_name: "Doe",
                email: "JohnDoe123@gmail.com",
                password: "password123!",
            }),
        };

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(409);
        expect(body.message).toBe("This email is already being used");
    });

    test("For empty input fields", async () => {
        const req = {
            json: jest.fn().mockResolvedValue({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
            }),
        };

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(400);
        expect(body.message).toBe(
            "All fields are required and cannot be empty."
        );
    });

    test("For valid registration", async () => {
        const req = {
            json: jest.fn().mockResolvedValue({
                first_name: "John",
                last_name: "Doe II",
                email: "JohnDoe456@gmail.com",
                password: "password123!",
            }),
        };

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe("Registration Successful");
    });
});
