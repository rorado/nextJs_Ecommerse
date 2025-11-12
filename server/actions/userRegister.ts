"use server";

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validation/authSchema";
import bcrypt from "bcryptjs";

interface UserRegister {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export const userRegister = async (info: UserRegister) => {
  const validation = RegisterSchema.safeParse(info);
  if (!validation.success) {
    console.error("Validation failed:", validation.error);
    return { success: false, error: validation.error.format() };
  }

  const { email, password, name, confirmPassword } = validation.data;

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Internal server error" };
  }
};
