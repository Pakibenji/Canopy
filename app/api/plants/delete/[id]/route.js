import { connectMongoDB } from "@/lib/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    await connectMongoDB();
    const plant = await Plant.findByIdAndDelete(params.id);
    return NextResponse.redirect("/", { status: 303 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
}
