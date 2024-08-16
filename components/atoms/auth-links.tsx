import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export function AuthLinks() {
  return (
    <>
      <Button>
        <LoginLink>Log in</LoginLink>
      </Button>
      <Button variant="secondary">
        <RegisterLink>Sign up</RegisterLink>
      </Button>
    </>
  );
}
