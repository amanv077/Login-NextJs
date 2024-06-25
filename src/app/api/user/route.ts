import { hash } from "bcrypt";
import DB from "../../../lib/db";
import { NextResponse } from "next/server";
import zod from "zod";

// Create User Body Validation
const UserSchema = zod.object({
  username: zod.string().min(1, "Username is required").max(100),
  email: zod.string().min(1, "Email is required").email("Invalid email"),
  password: zod
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = UserSchema.parse(body);

    // Finding Unique User by unique email
    const existingUserByEmail = await DB.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exist",
        },
        { status: 409 }
      );
    }

    // Finding Unique User by unique username
    const existingUserByUsername = await DB.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this username already exist",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await DB.user.create({
      data: { username, email, password: hashedPassword },
    });

    return NextResponse.json(
      {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
        message: "User created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { user: null, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
