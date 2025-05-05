import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all info
export async function GET() {
  try {
    const infos = await prisma.info.findMany({
      include: {
        room: true,
      },
    });
    return NextResponse.json(infos);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch info" }, { status: 500 });
  }
}

// POST create info
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const info = await prisma.info.create({
      data: json,
      include: {
        room: true,
      },
    });
    return NextResponse.json(info, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create info" }, { status: 500 });
  }
}