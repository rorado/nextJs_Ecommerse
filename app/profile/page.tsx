"use client";

import { useEffect, useState } from "react";
import ProfilePage from "./_components/profilePage";
import { useSession } from "next-auth/react";
import LoadingPage from "../loading";
import { User } from "@/lib/generated/prisma";

export default function ProfileContainer() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user?.email) return;

    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user?id=${session.user.id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data: User = await res.json();
        setUserData(data);
      } catch (err: any) {
        if (err.name !== "AbortError") setError(err.message);
      }
    };

    fetchUser();

    return () => controller.abort();
  }, [session?.user?.email]);

  if (error) return <div className="text-red-500 text-6xl w-full m-auto">{error}</div>;

  if (!userData) return <LoadingPage />;

  return <ProfilePage user={userData} />;
}
