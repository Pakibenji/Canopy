import { NextResponse } from "next/server";
import Plant from "@/models/plant";
import { connectMongoDB } from "@/lib/mongodb";

export const GET = async (req, {params}) => {
  try {
    await connectMongoDB();
    console.log(params.id);
    const plant = await Plant.findById(params.id);
    return NextResponse.json(plant, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
};
