import dbConnect from "@/lib/db/db";
import User from "@/models/Users";
import { NextResponse } from "next/server";

export async function GET(req: Request) {


  await dbConnect();
  

  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const userId = searchParams.get("userId");

   

    const limit = 12;
    const skip = (page - 1) * limit;

   

    // ✅ Correct Firebase filter
    const query = userId
      ? { uid: { $ne: userId } }
      : {};



    const [users, total] = await Promise.all([
      User.find(query)
        .select("name avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      User.countDocuments(query),
    ]);

 

    return NextResponse.json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}