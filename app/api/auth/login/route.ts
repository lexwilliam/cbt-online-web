import { prisma } from "../../../../lib/prisma";
import { verifyPassword } from "../../../../lib/auth";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid credentials: Email not found",
          data: [],
        },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        {
          message: "Invalid credentials: Password is incorrect",
          data: [],
        },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "8h" }
    );

    // Create response
    const response = NextResponse.json({
      message: "Login successful",
      data: [
        {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        },
      ],
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
        data: [],
      },
      { status: 500 }
    );
  }
}
