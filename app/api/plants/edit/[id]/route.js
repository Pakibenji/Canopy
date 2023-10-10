import Plant from "@/models/plant";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const body = await req.json();
  try {
    await connectMongoDB();
    const updatedPlant = await Plant.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
    return NextResponse.json("Plant successfully edited", { status: 200 });
  } catch (error) {
    return new NextResponse.json(error.message, { status: 500 });
  }
};
