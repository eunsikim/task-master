// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";

export async function DELETE({ params }) {
    const { id } = params;

    try {
        const task = await query({
            query: `DELETE FROM tasks WHERE id = ?`,
            values: [id],
        });

        if (task.affectedRows === 0) {
            return new NextResponse(
                JSON.stringify({ message: "Task No Content" }),
                {
                    status: 204,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        let res = new NextResponse(
            JSON.stringify({
                message: "Task Deleted",
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );

        return res;
    } catch (err) {
        let res = new NextResponse(
            JSON.stringify({
                message: "Error deleting task",
                error: err,
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application.json",
                },
            }
        );
        return res;
    }
}
