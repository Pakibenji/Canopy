import { connectMongoDB } from "@/lib/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";
import { getNextServerSession } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getNextServerSession();
  const userId = session?.user?._id;
  try {
    await connectMongoDB();
    const plants = await Plant.find({ userId: userId });
    return NextResponse.json(plants);
  } catch (error) {
    console.log(error);
  }
}
