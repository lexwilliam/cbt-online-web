import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET single group
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const group = await prisma.group.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        users: true,
        rooms: true,
      },
    });
    return NextResponse.json(group);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch group" }, { status: 500 });
  }
}

// PUT update group
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json();
    const group = await prisma.group.update({
      where: { id: parseInt(params.id) },
      data: json,
    });
    return NextResponse.json(group);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update group" }, { status: 500 });
  }
}

// DELETE group
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.group.delete({
      where: { id: parseInt(params.id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete group" }, { status: 500 });
  }
}