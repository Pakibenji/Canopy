
import { connectMongoDB } from "@/lib/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { name, plantImage, type , userId } = await req.json();
    const plant = await Plant.create({ name, plantImage, type , userId });
    console.log("plant: ", plant);
    return NextResponse.json(plant);
  } catch (error) {
    console.log(error);
  }
}