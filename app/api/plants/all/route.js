import { connectMongoDB } from "@/lib/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const plants = await Plant.find({}).lean();
    return NextResponse.json(plants);
  } catch (error) {
    console.log(error);
  }
}
