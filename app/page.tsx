"use client"

import { useUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    const data = user.data;
    if (data) {
      if (data.role === "ADMIN") {
        router.push("/admin/member");
      } else {
        router.push("/member/room");
      }
    }
  }, [user]);

  return <div></div>;
}
