import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export function AuthLinks() {
  const { user, isAuthenticated } = useKindeBrowserClient();
  return (
    <>
      {isAuthenticated ? (
        <UserNav
          email={user?.email as string}
          name={user?.given_name as string}
          userImage={
            user?.picture ?? `https://avatar.vercel.sh/${user?.given_name}`
          }
        />
      ) : (
        <div className="flex gap-4">
          <Button>
            <LoginLink>Log in</LoginLink>
          </Button>
          <Button variant="secondary">
            <RegisterLink>Sign up</RegisterLink>
          </Button>
        </div>
      )}
    </>
  );
}
