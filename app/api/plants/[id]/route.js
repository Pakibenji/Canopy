import { NextResponse } from "next/server"
import Plant from "@/models/plant";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(request, context) 
 {
    const { id } = context.params;
    const { db } = await connectMongoDB();
    const plant = Plant.find((plant) => plant._id === id);
    return NextResponse.json({
        plant,
        msg: `retrieved param from end point ${id}`,
    });

} 
