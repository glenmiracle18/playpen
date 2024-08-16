"use client";

import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { LandingPage } from "@/components/landing-v0";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <LandingPage />
    </main>
  );
}
