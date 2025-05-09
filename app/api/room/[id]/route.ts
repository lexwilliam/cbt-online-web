import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET single room
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const room = await prisma.room.findUnique({
      where: { id: id },
    });
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

// PUT update room
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const json = await request.json();
    const room = await prisma.room.update({
      where: { id: id },
      data: json,
    });
    return NextResponse.json(
      {
        message: "Room updated successfully",
        data: [room],
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to update room",
        data: [],
      },
      { status: 500 }
    );
  }
}

// DELETE room
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.room.delete({
      where: { id: id },
    });
    return NextResponse.json(
      {
        message: "Room deleted",
        data: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to delete room",
        data: [],
      },
      { status: 500 }
    );
  }
}
