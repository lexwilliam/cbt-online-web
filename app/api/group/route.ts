import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all groups
export async function GET() {
  try {
    const groups = await prisma.group.findMany({
      include: {
        users: true,
        rooms: true,
      },
    });
    return NextResponse.json({
      message: "Groups fetched successfully",
      data: groups
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch groups",
      data: null
    }, { status: 500 });
  }
}

// POST create group
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const group = await prisma.group.create({
      data: json,
    });
    return NextResponse.json({
      message: "Group created successfully",
      data: group
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to create group",
      data: null
    }, { status: 500 });
  }
}