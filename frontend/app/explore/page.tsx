import ExplorePage from "@/component/(explore)/ExplorePage";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const metadata = {
  title: "This is the explore page.",
  description: "Here you can find more people like you.",
};

const Page = async () => {
  const page = 1;

  console.log("---- EXPLORE PAGE START ----");

  // 🍪 Get cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("Token from cookie:", token);

  let currentUserId = null;

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      console.log("Decoded JWT:", decoded);

      currentUserId = decoded.id;
      console.log("Current User ID:", currentUserId);
    } catch (err) {
      console.log("JWT ERROR:", err);
    }
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/explore?page=${page}&userId=${currentUserId}`;

  console.log("Fetching URL:", url);

  const res = await fetch(url);

  console.log("API Status:", res.status);

  if (!res.ok) {
    throw new Error("API FAILED");
  }

  const data = await res.json();

  console.log("Users received:", data.users.length);
  console.log("Total users:", data.total);

  console.log("---- EXPLORE PAGE END ----");

  return (
    <main>
      <ExplorePage users={data.users} />
    </main>
  );
};

export default Page;