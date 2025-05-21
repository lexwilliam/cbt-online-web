import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET single room
export async function GET(
  request: Request,
  { params }: { params: Promise<{ url: string }> }
) {
  try {
    const { url } = await params;
    const room = await prisma.room.findFirst({
      where: { url: url },
    });
    if (!room) {
      return NextResponse.json(
        {
          message: "Room not found",
          data: [],
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Room fetched successfully",
        data: [room],
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch room",
        data: [],
      },
      { status: 500 }
    );
  }
}
