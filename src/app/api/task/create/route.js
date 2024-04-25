// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";
import { v4 } from "uuid";

export async function POST(req) {
    const body = await req.json();

    const { title } = body;

    const id = v4();

    try {
        const task = await query({
            query: `INSERT INTO tasks(id, title) VALUES (?, ?);`,
            values: [id, title],
        });

        let res = new NextResponse(
            JSON.stringify({
                message: "Task Created",
                task: task,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "applications.json",
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
