"use server";
import { uploadAvatar } from "@/lib/actions/uploadToCloudinary";
import dbConnect from "../db/db";
import User from "@/models/Users";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function createUserInMongo(data) {
  const cookieStore = await cookies();

  try {
    await dbConnect();
    let targetUser;

    const existingUser = await User.findOne({ uid: data.uid });

    if (existingUser) {
      // ✅ FIX 1: If they log in again with Google, update their profile pic in DB
      if (data.provider === "google" && data.avatar) {
        existingUser.avatar = data.avatar;
        await existingUser.save();
      }
      targetUser = existingUser;
    } else {
      let avatarUrl = null;

      // ✅ FIX 2: Correctly assign the avatar URL based on the provider
      if (data.provider === "email" && data.avatar) {
        avatarUrl = await uploadAvatar(data.avatar);
      } else if (data.provider === "google" && data.avatar) {
        avatarUrl = data.avatar; // <-- This is what was missing!
      }

      targetUser = await User.create({
        uid: data.uid,
        name: data.name,
        email: data.email,
        age: data.age ?? null,
        state: data.state ?? null,
        avatar: avatarUrl, // Now this will correctly save the Google link!
        provider: data.provider,
      });
    }

    if (targetUser) {
      const token = jwt.sign(
        {
          id: targetUser.uid,
          name: targetUser.name,
          avatar: targetUser.avatar, // The JWT will now have the correct avatar
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

      return {
        success: true,
        message: existingUser
          ? "Logged in successfully"
          : "Signed up successfully",
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error" };
  }
}
