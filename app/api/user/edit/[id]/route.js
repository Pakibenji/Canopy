import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const body = await req.json();
  try {
    await connectMongoDB();
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true },
    );
    return NextResponse.json("User successfully edited", { status: 200 });
  } catch (error) {
    return new NextResponse.json(error.message, { status: 500 });
  }
};
