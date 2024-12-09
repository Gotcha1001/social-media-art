// app/users/route.ts

import prisma from "@/lib/client";
import { NextResponse } from "next/server";

// Define the server action
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  if (!query) {
    return NextResponse.json({ users: [] });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          { name: { contains: query, mode: "insensitive" } },
          { surname: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        username: true,
        name: true,
        surname: true,
        avatar: true,
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error querying users:", error);
    return NextResponse.error();
  }
}
