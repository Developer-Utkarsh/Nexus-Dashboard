import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Admins } from "@/lib/Modals/AdminModal";
import { User } from "@/lib/Modals/userModal";

export async function POST(req: Request) {
  try {
    await connect();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if the user is already an admin
    const existingAdmin = await Admins.findOne({ email });

    if (existingAdmin) {
      return NextResponse.json({ error: 'User is already an admin' }, { status: 400 });
    }

    // Add the user to the admins collection
    await Admins.create({ email, addedAt: new Date() });

    // Fetch the updated list of admins
    const admins = await Admins.find().lean();

    return NextResponse.json({ message: 'Admin added successfully', admins });
  } catch (error) {
    console.error('Error adding admin:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}