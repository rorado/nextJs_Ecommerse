"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { User } from "@/lib/generated/prisma";

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    image: user.image || "",
    
    password: "",
    confirmPassword: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, ...formData }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen from-blue-50 to-indigo-50 p-6">
      <Card className="w-full max-w-md bg-background shadow-md">
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Profile" : "Profile"}</CardTitle>
          <CardDescription>
            {isEditing
              ? "Update your information below"
              : "View your profile information"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <img
              src={formData.image || "/default-avatar.png"}
              alt={formData.name || "Profile"}
              className="w-32 h-32 rounded-full shadow-md object-cover"
            />
          </div>

          {!isEditing ? (
            <>
              <p className="text-center text-xl font-semibold">{formData.name}</p>
              <p className="text-center text-gray-600">{formData.email}</p>
              <Button
                className="w-full mt-4"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Avatar URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Avatar URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <Button className="w-full mt-4" onClick={handleSubmit}>
                Save
              </Button>
              <Button
                variant="ghost"
                className="w-full mt-2 text-white bg-gray-400 hover:bg-gray-500 cursor-pointer"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </>
          )}
        </CardContent>

        {!isEditing && (
      <CardFooter className="flex flex-col gap-1 text-sm text-muted-foreground">
        <span>Member since: {new Date(user.createdAt).toLocaleDateString()}</span>
        {user.role === "USER" ? (
          <span>Role: Normal User</span>
        ) : (
          <span>Role: Admin</span>
        )}
      </CardFooter>
    )}
      </Card>
    </div>
  );
}
