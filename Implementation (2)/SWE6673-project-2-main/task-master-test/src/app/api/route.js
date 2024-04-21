import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Simple SELECT from Task query
export async function GET(req, res) {
	const tasks = await query({
		query: "SELECT * FROM users",
		values: [],
	});

	return NextResponse.json({
		tasks: tasks,
	});
}

export async function POST(req, res) {
	const body = await req.json();

	console.log(body);

	return NextResponse.json({
		hello: "world",
	});
}
