import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all info
export async function GET() {
  try {
    const infos = await prisma.information.findMany({
      select: {
        id: true,
        aturan: true,
        info: true,
        created_at: true,
      },
    });
    if (infos.length === 0) {
      const info = await prisma.information.create({
        data: {
          id: 1,
          aturan: "",
          info: "",
          created_at: new Date(),
        },
        select: {
          id: true,
          aturan: true,
          info: true,
          created_at: true,
        },
      });
      return NextResponse.json({
        message: "Info fetched successfully",
        data: [info],
      });
    }
    return NextResponse.json({
      message: "Info fetched successfully",
      data: infos,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch info", data: [] },
      { status: 500 }
    );
  }
}

// POST create info
export async function PUT(request: Request) {
  try {
    const json = await request.json();
    const info = await prisma.information.update({
      where: {
        id: 1,
      },
      data: json,
    });
    return NextResponse.json(info, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update info", data: [] },
      { status: 500 }
    );
  }
}
