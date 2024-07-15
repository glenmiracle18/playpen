import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold tracking-tighter text-4xl">
        WELCOME TO PLAYPEN!
      </h1>
      <div className="mt-6 flex gap-4">
        <Button>
          <LoginLink>Sign in</LoginLink>
        </Button>
        <Button>
          {" "}
          <RegisterLink>Sign up</RegisterLink>
        </Button>
      </div>
    </main>
  );
}
