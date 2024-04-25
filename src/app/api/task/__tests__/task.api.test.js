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
            const taskId = req.values[1];

            if (mockDatabase[taskId]) {
                mockDatabase[taskId].title = req.values[0];
                return Promise.resolve({
                    affectedRows: 1,
                    message: "Task Updated",
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
        } else {
            return Promise.resolve([
                {
                    id: req.values[0],
                    title: req.values[1],
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
