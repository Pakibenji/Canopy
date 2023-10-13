import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectMongoDB();
    const user = await User.findById(params.id);
    const { password, ...rest } = user._doc;
    return NextResponse.json(rest, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
};
