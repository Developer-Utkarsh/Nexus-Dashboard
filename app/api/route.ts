import { connect } from "@/lib/db";
import { NextResponse } from "next/server";
import { Admins } from "@/lib/Modals/AdminModal";
import { User } from "@/lib/Modals/userModal";
import { Meeting } from "@/lib/Modals/meetingModal";
import  {Contact}  from "@/lib/Modals/contactModal";

export async function POST(req: Request) {
  try {
    await connect();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const admin = await Admins.findOne({ email });

    if (admin) {
      // Fetch data from all collections
      const [users, meetings, admins, contacts] = await Promise.all([
        User.find().lean(),
        Meeting.find().lean(),
        Admins.find().lean(),
        Contact.find().lean()
      ]);

      return NextResponse.json({
        exists: true,
        message: "Admin found",
        users,
        meetings,
        admins,
        contacts
      });
    } else {
      return NextResponse.json({ exists: false, message: "Admin not found" });
    }
  } catch (error) {
    console.error("Database operation error:", error);
    return NextResponse.json(
      { error: "Failed to perform database operation" },
      { status: 500 }
    );
  }
}