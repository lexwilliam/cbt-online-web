import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });
    return NextResponse.json({
      message: "Users fetched successfully",
      data: [users],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch users",
        data: [],
      },
      { status: 500 }
    );
  }
}
