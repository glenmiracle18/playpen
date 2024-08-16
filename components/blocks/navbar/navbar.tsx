import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Bell, EllipsisVertical, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const { setTheme } = useTheme();

  return (
    <div className=" h-20 items-center px-6 justify-between flex w-full border-b ">
      {/* user */}
      <div className="flex items-center gap-2">
        <h1 className="font-medium tracking-wide">Welcome back</h1>
      </div>

      {/* search bar */}

      {/* user section */}
      <div className="flex items-center gap-4 text-sm font-semibold">
        <div>
          <Input
            className="rounded-lg border flex items-center  w-[250px]  placeholder:text-gray-400 placeholder:text-[12px]  relative pl-10 text-sm"
            placeholder="Search files..."
          />
          <Search className="absolute top-[32px] ml-4 text-gray-400 size-4" />
        </div>

        <div className="font-extralight text-gray-300">|</div>

        {user ? (
          <div className="flex items-center gap-2 ">
            <UserNav
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
            <p className="text-sm">{user.given_name}</p>
            <div className="ml-4 size-10 text-gray-400  flex items-center text-center justify-center gap-2">
              <Bell />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
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

export default Navbar;
