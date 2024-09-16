import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Admins } from "@/lib/Modals/AdminModal";

export async function POST(req: Request) {
  try {
    await connect();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Remove the admin
    await Admins.deleteOne({ email });

    // Fetch the updated list of admins
    const admins = await Admins.find().lean();

    return NextResponse.json({ message: 'Admin removed successfully', admins });
  } catch (error) {
    console.error('Error removing admin:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}