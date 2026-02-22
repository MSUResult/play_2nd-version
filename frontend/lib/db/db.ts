import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  try {
    // 1️⃣ If already connected → return
    if (cached.conn) return cached.conn;

    // 2️⃣ If no promise → create connection
    if (!cached.promise) {
      cached.promise = mongoose.connect(process.env.MONGO_URI, {
        dbName: "Dating",
        bufferCommands: false,
      });
    }

    // 3️⃣ Wait for connection
    cached.conn = await cached.promise;

    return cached.conn;
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
    throw error;
  }
}
