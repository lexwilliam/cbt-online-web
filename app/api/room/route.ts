import { prisma } from "@/lib/prisma";
import { decode } from "jsonwebtoken";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// GET all rooms
export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        url: true,
        exit_key: true,
      },
    });
    return NextResponse.json({
      message: "Rooms fetched successfully",
      data: [rooms],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch rooms", data: [] },
      { status: 500 }
    );
  }
}

// POST create room
export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const authorization = headersList.get("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized", data: [] },
        { status: 401 }
      );
    }

    // Extract token from Bearer
    const token = authorization.split(" ")[1];

    // Verify and decode the JWT token
    const decoded = decode(token) as { userId: string };

    if (!decoded.userId) {
      return NextResponse.json(
        { message: "Invalid token", data: [] },
        { status: 401 }
      );
    }

    const json = await request.json();
    await prisma.room.create({
      data: {
        ...json,
        owner_id: decoded.userId,
        created_at: (new Date()).toISOString(),
      },
      select: {
        id: true,
        url: true,
        exit_key: true,
        owner_id: true,
        created_at: true,
      },
    });
    return NextResponse.json(
      {
        message: "Room created successfully",
        data: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error); 
    return NextResponse.json(
      { message: "Failed to create room", data: [] },
      { status: 500 }
    );
  }
}
