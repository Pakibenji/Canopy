import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const { id } = params;
  try {
    await connectMongoDB();
    const body = await req.json();
    const oldPassword = await body.oldPassword;
    const user = await User.findOne({ _id: id });
    const passwordsMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordsMatch) {
      return NextResponse.json(
        { error: "Old password is incorrect" },
        { status: 400 }
      );
    }
    const newPassword = await body.newPassword;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ _id: id }, { password: hashedPassword });
    return NextResponse.json({ message: "Password updated" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while updating the password" },
      { status: 500 }
    );
  }
};
