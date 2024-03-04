import { POST } from "@/app/api/task/create/route";
import { GET } from "@/app/api/task/read/route";
import { PUT } from "@/app/api/task/update/route";
import { DELETE } from "@/app/api/task/delete/route";

describe("Test CRUD operations for Tasks", () => {
	test("For Task Creation", async () => {
		const req = {
			title: "Go the store",
		};

		const res = await POST(req);

		expect(res.status).toBe(200);
		expect(res.message).toBe("Task Created");
	});

	test("For Task Read", async () => {
		const res = await GET();

		expect(res.status).toBe(200);
	});

	test("For Task Update", async () => {
		const req = {
			id: 1,
			title: "Buy groceries",
		};

		const res = await PUT(req);

		expect(res.status).toBe(200);
		expect(res.message).toBe("Task Updated");
	});

	test("For Invalid Task Update, Task does not exist", async () => {
		const req = {
			id: 1123123123,
			title: "Buy groceries",
		};

		const res = await PUT(req);

		expect(res.status).toBe(404);
		expect(res.message).toBe("Task Not Found");
	});

	test("For Task Deletion", async () => {
		const req = {
			id: 1,
		};

		const res = await DELETE(req);

		expect(res.status).toBe(200);
		expect(res.message).toBe("Task Deleted");
	});

	test("For Task Deletion", async () => {
		const req = {
			id: 111123,
		};

		const res = await DELETE(req);

		expect(res.status).toBe(204);
		expect(res.message).toBe("Task No Content");
	});
});
