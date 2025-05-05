import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET single room
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const room = await prisma.room.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        group: true,
        info: true,
      },
    });
    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch room" }, { status: 500 });
  }
}

// PUT update room
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json();
    const room = await prisma.room.update({
      where: { id: parseInt(params.id) },
      data: json,
      include: {
        group: true,
        info: true,
      },
    });
    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
  }
}

// DELETE room
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.room.delete({
      where: { id: parseInt(params.id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete room" }, { status: 500 });
  }
}