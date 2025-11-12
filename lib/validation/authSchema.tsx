import { z } from "zod";

export const LoginSchema = z.object({
    email : z.string().email("invalide email"),
    password: z.string().min(6),
})

// export const userSchema = z.object({
//     name: z.string().min(2, "Name must be at least 2 characters"),
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     phone: z.string().optional(),
//     streetAddress: z.string().optional(), 
//     country: z.string().optional(),
//   });

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });