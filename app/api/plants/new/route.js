import { connectMongoDB } from "@/lib/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { name, plantImage, type, description, userId, proprietary } =
      await req.json();
    const plant = await Plant.create({
      name,
      plantImage,
      type,
      description,
      userId,
      proprietary,
    });
    console.log("plant: ", plant);
    return NextResponse.json(plant);
  } catch (error) {
    console.log(error);
  }
}
