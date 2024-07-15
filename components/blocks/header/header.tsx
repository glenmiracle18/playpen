import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search, UploadCloud } from "lucide-react";
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";

export const Header = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="h-20 items-center px-6 justify-between flex  border-b-2 shadow-sm">
      {/* user */}
      <div className="flex items-center gap-2">
        <h1 className="font-bold tracking-wide">glenmiracle</h1>
        <ChevronDown size="16" />
      </div>

      {/* search bar */}
      <div>
        <Input
          className="rounded-full border shadow-sm w-[650px] h-12 placeholder:text-gray-400 placeholder:text-[16px]  ring-2 ring-offset-2 ring-gray-200 relative pl-12 text-lg"
          placeholder="Ask for anything"
        />
        <Search className="absolute top-[26px] ml-4 text-gray-400" />
      </div>

      {/* user section */}
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span>Inbox</span>
        <div className="font-extralight text-gray-300">|</div>
        <div className="flex items-center gap-2">
          <p>Drop</p>
          <UploadCloud size="13" className="text-gray-400" />
        </div>

        {user ? (
          <UserNav
            email={user.email as string}
            name={user.given_name as string}
            userImage={
              user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
          />
        ) : (
          <div className="flex items-center gap-x-2">
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant="secondary" asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
