import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all rooms
export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        group: true,
        info: true,
      },
    });
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}

// POST create room
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const room = await prisma.room.create({
      data: json,
      include: {
        group: true,
        info: true,
      },
    });
    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create room" }, { status: 500 });
  }
}