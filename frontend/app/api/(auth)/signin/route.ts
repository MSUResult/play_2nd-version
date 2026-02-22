import { NextResponse } from "next/server";
import { uploadAvatar } from "@/lib/actions/uploadToCloudinary";
import dbConnect from "@/lib/db/db";
import User from "@/models/Users";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await dbConnect();
    const cookieStore = await cookies();

    // Determine if the incoming request is FormData or JSON
    const contentType = request.headers.get("content-type") || "";
    let data = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    } else {
      data = await request.json();
    }

    let targetUser;
    const existingUser = await User.findOne({ uid: data.uid });

    if (existingUser) {
      // If Google login AND avatar exists → update DB
      if (data.provider === "google" && data.avatar) {
        existingUser.avatar = data.avatar;
        await existingUser.save();
      }

      targetUser = existingUser;
    } else {
      let avatarUrl = null;

      // Handle Avatar upload if provider is email and file exists
      if (data.provider === "email" && data.avatar instanceof File) {
        avatarUrl = await uploadAvatar(data.avatar);
      } else if (data.provider === "google") {
        // If Google provides a photo URL, you can save it here
        avatarUrl = data.avatar;
      }

      targetUser = await User.create({
        uid: data.uid,
        name: data.name,
        email: data.email,
        age: data.age || null,
        state: data.state || null,
        avatar: avatarUrl,
        provider: data.provider,
      });
    }

    if (targetUser) {
      const token = jwt.sign(
        {
          id: targetUser.uid,
          name: targetUser.name,
          avatar: targetUser.avatar,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json(
        {
          success: true,
          message: existingUser
            ? "Logged in successfully"
            : "Signed up successfully",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { success: false, message: "User processing failed" },
      { status: 400 },
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
