import { auth } from "@clerk/nextjs/server";
import { createUser } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Use the auth() method from Clerk to get the userId
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userData = await req.json();

    // Create a new user in the database
    const user = await createUser({
      id: userId,
      username: userData.username,
      name: userData.firstName,
      surname: userData.lastName,
      avatar: userData.avatar,
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
