import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "USER"
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
      data: [users]
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch users",
      data: []
    }, { status: 500 });
  }
}

// POST create user
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const hashedPassword = await hashPassword(json.password);
    
    const user = await prisma.user.create({
      data: {
        ...json,
        created_at: new Date(),
        password: hashedPassword,
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
      message: "User created successfully",
      data: user
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to create user",
      data: []
    }, { status: 500 });
  }
}