import { connect } from "@/lib/db";
import { NextResponse } from "next/server";
import { Admins } from "@/lib/Modals/AdminModal";

export async function POST(req: Request) {
	try {
		await connect();

		const { email } = await req.json();

		// Check if email is provided

		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		// Check if the email exists in the admins collection
		const admin = await Admins.findOne({ email });

		if (admin) {
			return NextResponse.json({ exists: true, message: "Admin found" });
		} else {
			return NextResponse.json({ exists: false, message: "Admin not found" });
		}
	} catch (error) {
		console.error("Database operation error:", error);
		return NextResponse.json(
			{ error: "Failed to perform database operation" },
			{ status: 500 },
		);
	}
}
