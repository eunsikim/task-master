import { POST } from "@/app/api/task/create/route";
import { GET } from "@/app/api/task/read/route";
import { PUT } from "@/app/api/task/update/route";
import { DELETE } from "@/app/api/task/delete/route";

jest.mock("uuid", () => ({
    v4: jest.fn(() => "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
}));

jest.mock("@/lib/mysql", () => ({
    query: jest.fn().mockImplementation((req) => {
        const mockDatabase = {
            "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb": {
                id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
                title: "Clean Room",
                location: null,
                note: null,
                deadline: null,
            },
        };

        if (req.query.includes("SELECT * FROM tasks")) {
            const taskId = req.values[0];
            if (mockDatabase[taskId]) {
                return Promise.resolve([mockDatabase[taskId]]);
            } else {
                return Promise.resolve([]);
            }
        } else if (req.query.includes("UPDATE tasks SET")) {
            const taskId = req.values[4];

            if (mockDatabase[taskId]) {
                mockDatabase[taskId].title = req.values[0];
                mockDatabase[taskId].location = req.values[1];
                mockDatabase[taskId].note = req.values[2];
                mockDatabase[taskId].deadline = req.values[3];
                return Promise.resolve({
                    affectedRows: 1,
                    task: mockDatabase[taskId],
                });
            } else {
                return Promise.resolve({
                    affectedRows: 0,
                });
            }
        } else if (req.query.includes("DELETE FROM tasks")) {
            const taskId = req.values[0];

            if (mockDatabase[taskId]) {
                return Promise.resolve({
                    affectedRows: 1,
                });
            } else {
                return Promise.resolve({
                    affectedRows: 0,
                });
            }
        } else if (req.query.includes("INSERT INTO tasks")) {
            return Promise.resolve([
                {
                    id: req.values[0],
                    title: req.values[1],
                    location: req.values[2],
                    note: req.values[3],
                    deadline: req.values[4],
                },
            ]);
        }
    }),
}));

describe("Test CRUD operations for Tasks", () => {
    test("For Task Creation", async () => {
        const req = {
            json: jest.fn().mockResolvedValue({
                title: "Go to the store",
            }),
        };

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe("Task Created");
    });

    test("For Task Read", async () => {
        const taskID = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";

        const res = await GET({ params: { id: taskID } });
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe("Success");
    });

    test("For Task Update", async () => {
        const req = {
            json: jest.fn().mockResolvedValue({
                id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
                title: "Buy groceries",
            }),
        };

        const res = await PUT(req);
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe("Task Updated");
    });

    test("For Invalid Task Update, Task does not exist", async () => {
        const req = {
            json: jest.fn().mockResolvedValue({
                id: "non-existing-ID",
                title: "Buy groceries",
            }),
        };

        const res = await PUT(req);
        const body = await res.json();

        expect(res.status).toBe(404);
        expect(body.message).toBe("Task Not Found");
    });

    test("For Task Deletion", async () => {
        const taskID = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";

        const res = await DELETE({ params: { id: taskID } });
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe("Task Deleted");
    });

    test("For Task Deletion", async () => {
        const taskID = "non-existing-ID";

        const res = await DELETE({ params: { id: taskID } });
        const body = await res.json();

        expect(res.status).toBe(204);
        expect(body.message).toBe("Task No Content");
    });
});

describe("Test Task properties", () => {
    test("For Creating a Task with a Location property", async () => {
        const req = {
            json: jest.fn().mockResolvedValue({
                title: "Go Shopping",
                location: "123 Main Street, Atlanta, Georgia 30080",
            }),
        };

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe("Task Created");
        expect(body.task[0].location).toBe(
            "123 Main Street, Atlanta, Georgia 30080"
        );
    });

    test("For Creating a Task with a Note property", async () => {
        const req = {
            json: jest.fn().mockResolvedValue({
                title: "Go Shopping",
                note: "Buy flowers",
            }),
        };

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe("Task Created");
        expect(body.task[0].note).toBe("Buy flowers");
    });

    test("For Creating a Task with a Deadline property", async () => {
        const d = new Date();
        const deadlineDate = d.toISOString().slice(0, 10);
        const req = {
            json: jest.fn().mockResolvedValue({
                title: "Go Shopping",
                deadline: deadlineDate,
            }),
        };

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe("Task Created");
        expect(body.task[0].deadline).toBe(deadlineDate);
    });

    test("For Updating a Task with a Location property", async () => {
        const req = {
            json: jest.fn().mockResolvedValue({
                id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
                location: "2471 Clement Street, Atlanta, Georgia 30303",
            }),
        };

        const res = await PUT(req);
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe("Task Updated");
        expect(body.task.task.location).toBe(
            "2471 Clement Street, Atlanta, Georgia 30303"
        );
    });

    test("For Updating a Task with a Note property", async () => {
        const req = {
            json: jest.fn().mockResolvedValue({
                id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
                note: "Buy a diamond ring",
            }),
        };

        const res = await PUT(req);
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe("Task Updated");
        expect(body.task.task.note).toBe("Buy a diamond ring");
    });

    test("For Updating a Task with a Deadline property", async () => {
        const req = {
            json: jest.fn().mockResolvedValue({
                id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
                deadline: "2000-01-01",
            }),
        };

        const res = await PUT(req);
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe("Task Updated");
        expect(body.task.task.deadline).toBe("2000-01-01");
    });
});
