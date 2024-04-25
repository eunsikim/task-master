// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";

export async function GET({ params }) {
    const { id } = params;

    try {
        const task = await query({
            query: `SELECT * FROM tasks WHERE id = ?;`,
            values: [id],
        });

        if (task.length === 0) {
            // No task found with the provided ID
            let res = new NextResponse(
                JSON.stringify({
                    message: "Task not found",
                }),
                {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return res;
        }

        let res = new NextResponse(
            JSON.stringify({
                message: "Success",
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
        let message = "An unexpected error occured";
        let status = 500;

        let res = new NextResponse(
            JSON.stringify({
                error_code: err.code,
                message: message,
                error_number: err.errno,
            }),
            {
                status: status,
                headers: {
                    "Content-Type": "application.json",
                },
            }
        );
        return res;
    }
}
