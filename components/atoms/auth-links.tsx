import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";

export function AuthLinks() {
  return (
    <>
      <div className="flex gap-4">
        <Button>
          <LoginLink>Log in</LoginLink>
        </Button>
        <Button variant="secondary">
          <RegisterLink>Sign up</RegisterLink>
        </Button>
      </div>
    </>
  );
}
