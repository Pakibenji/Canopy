import Plant from "@models/plant";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";

export async function PATCH({ params, request }) {
  const db = await connectToDb();
  const { id } = params;
  const { name, description } = await request.body.json();

  const plant = await Plant.findOneAndUpdate(
    { _id: id },
    { name, description },
    { new: true }
  );

  return new NextResponse(plant);
}