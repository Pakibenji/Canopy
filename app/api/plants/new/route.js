import { connectMongoDB } from "@/lib/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectMongoDB();
    const { name, plantImage, type, description, city, userId, proprietary } =
      await req.json();
    const plant = await Plant.create({
      name,
      plantImage,
      type,
      description,
      location: city,
      userId,
      proprietary,
    });
    return NextResponse.json(plant);
  } catch (error) {
    console.log(error);
  }
};
