/**
 * @description A React registration form card with name, email, and password inputs, including password confirmation and social sign-up options.
 * @opening Sign-up forms are the gateway to user onboarding. This registration card balances simplicity and completeness, providing name, email, and password fields, along with a social authentication option and a link to log in if the user already has an account. Built with shadcn/ui, it’s ideal for onboarding, account creation modals, or full-page registration flows.
 * @related [{"href":"/patterns/card-login-1","title":"Login Card","description":"Card with email/password login and social authentication"},{"href":"/patterns/dialog-standard-1","title":"Dialog Form","description":"Modal dialog with form inputs"},{"href":"/patterns/card-standard-1","title":"Standard Card","description":"Basic card with title, content, and actions"}]
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { userRegister } from "@/server/actions/userRegister";
import { RegisterSchema } from "@/lib/validation/authSchema";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import SocialProviders from "@/components/SocialProviders";


export const title = "Register Card";

const RegisterCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false)
  const [isVisible1, setIsVisible1] = useState(false)

  const router = useRouter();
  const handleSubmit = async() => {
    const validation = RegisterSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (validation.success)
    router.push('/login')
  else if (!validation.success) {
    console.log("Validation errors:", validation.error.format());
    return;
  }
  const result = await userRegister({name, email, password, confirmPassword});
  console.log(result);
  }

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
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              value={name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              type="email"
              value={email}
            />
          </div>

          <div className='space-y-2'>
            <Label >Password</Label>
            <div className='relative'>
              <Input type={isVisible ? 'text' : 'password'} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsVisible(prevState => !prevState)}
                className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
              >
                {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
              </Button>
          </div>
        </div>
          <div className='space-y-2'>
            <Label >Confirm password</Label>
            <div className='relative'>
              <Input type={isVisible1 ? 'text' : 'password'} placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)} />
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsVisible1(prevState => !prevState)}
                className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
              >
                {isVisible1 ? <EyeOffIcon /> : <EyeIcon />}
                <span className='sr-only'>{isVisible1 ? 'Hide password' : 'Show password'}</span>
              </Button>
          </div>
        </div>

          <Button className="w-full cursor-pointer" onClick={handleSubmit}>Create Account</Button>
           <SocialProviders/>
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
