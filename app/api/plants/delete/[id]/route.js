import { connectMongoDB } from "@/lib/mongodb";
import Plant from "@models/plant";
import { NextResponse } from "next/server";

export default async function DELETE({ params }) {
    const id = params.id;
  try {
    await connectMongoDB();
    const plant = await Plant.findByIdAndDelete(id);
    return new NextResponse.json("plant deleted");
  } catch (error) {
    return new NextResponse.json("plant not deleted");
  }
}
