import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        group_id: true,
        created_at: true,
        group: true,
      },
    });
    return NextResponse.json({
      message: "Users fetched successfully",
      data: users
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
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        group_id: true,
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

// PUT update user
export async function PUT(request: Request) {
  try {
    const json = await request.json();
    const user = await prisma.user.update({
      data: json,
      where: {
        id: json.id,
      },
    });
    return NextResponse.json({
      message: "User updated successfully",
      data: user
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to update user",
      data: []
    }, { status: 500 });
  }
}