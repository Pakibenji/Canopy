import { connectMongoDB } from "@/lib/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectMongoDB();
    const plants = await Plant.find({}).lean();
    return NextResponse.json(plants);
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
};
