"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { userRegister } from "@/server/actions/userRegister";
import { RegisterSchema } from "@/lib/validation/authSchema";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import SocialProviders from "@/components/SocialProviders";

// Page metadata (Next.js App Router)
// export const metadata = {
//   title: "Register",
//   description: "Create a new account",
// };

const RegisterCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    // Validate form using zod schema
    const validation = RegisterSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      console.log("Validation errors:", validation.error.format());
      return;
    }

    // Call server action to register
    const result = await userRegister({ name, email, password, confirmPassword });
    console.log(result);

    // Redirect to login on success
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-md bg-background border-none shadow-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              value={name}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              value={email}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible((prev) => !prev)}
                className="absolute inset-y-0 right-0 rounded-l-none text-muted-foreground hover:bg-transparent"
              >
                {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className="sr-only">{isVisible ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <div className="relative">
              <Input
                type={isVisible1 ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible1((prev) => !prev)}
                className="absolute inset-y-0 right-0 rounded-l-none text-muted-foreground hover:bg-transparent"
              >
                {isVisible1 ? <EyeOffIcon /> : <EyeIcon />}
                <span className="sr-only">{isVisible1 ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button className="w-full cursor-pointer" onClick={handleSubmit}>
            Create Account
          </Button>

          {/* Social login */}
          <SocialProviders />
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link className="underline" href="/login">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterCard;
