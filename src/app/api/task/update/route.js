// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";

export async function PUT(req) {
    const body = await req.json();

    const { id, title } = body;

    try {
        const task = await query({
            query: `UPDATE tasks SET title = ? WHER id = ?;`,
            values: [title, id],
        });

        if (task.affectedRows === 0) {
            return new NextResponse(
                JSON.stringify({ message: "Task Not Found" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" }, // Fixed MIME type
                }
            );
        }

        let res = new NextResponse(
            JSON.stringify({
                message: "Task Updated",
                task: task,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application.json",
                },
            }
        );
        return res;
    } catch (err) {
        let res = new NextResponse(
            JSON.stringify({
                message: "Error",
                error: err,
            }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application.json",
                },
            }
        );
        return res;
    }
}
