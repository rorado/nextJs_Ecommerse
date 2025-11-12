// app/api/login/route.ts
// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import { LoginSchema } from "@/lib/validation/authSchema";

// export async function POST(req: NextRequest) {
//   const { email, password } = await req.json();

//   // Validate input
//   const parsed = LoginSchema.safeParse({ email, password });
//   if (!parsed.success) {
//     return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
//   }

//   try {
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

//     console.log(user)

//     // if (user.password !== password)
//     //   return NextResponse.json({ error: "Invalid password" }, { status: 401 });

//     return NextResponse.json({ data: user });
//   } catch (err) {
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
