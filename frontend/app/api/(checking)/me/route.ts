import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Force Next.js to treat this as a dynamic route
export const dynamic = "force-dynamic";

export async function GET(req) {
  console.log("🟣 [Server] GET /api/me called");

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log("🟣 [Server] token found:", token ? "Yes (HIDDEN)" : "No");

    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Return the user object inside a "user" key to match your Context Provider
    return NextResponse.json({ user: decoded });
  } catch (error) {
    console.log("🔴 [Server] Auth Error:", error.message);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
