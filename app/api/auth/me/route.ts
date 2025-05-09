import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { decode } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get Authorization header
    const headersList = await headers();
    const authorization = headersList.get("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract token from Bearer
    const token = authorization.split(" ")[1];

    // Verify and decode the JWT token
    const decoded = decode(token) as { userId: string };

    if (!decoded.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
