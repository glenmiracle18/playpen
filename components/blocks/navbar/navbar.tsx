"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { MobileSidebar } from "../sidebar/mobile-sidebar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { UserNav } from "@/components/user-nav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = () => {
  const { getUser, isAuthenticated } = useKindeBrowserClient();
  const user = getUser();
  return (
    <div className=" h-20 items-center px-6 justify-between flex w-full border-b ">
      {/* user */}
      <div className="lg:flex items-center gap-2 hidden">
        <h1 className="font-medium text-sm tracking-wide flex gap-2 items-center">
          {/* will  have to addd the user Name here from kinde */}
          Welcome back, {user?.given_name}
        </h1>
      </div>
      <div className="md:hidden lg:hidden">
        <Sheet>
          <SheetTrigger>
            <button type="button">
              <HamburgerMenuIcon className="size-8 text-gray-600" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="h-screen">
            <SheetTitle>Menu</SheetTitle>
            <MobileSidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* user section */}
      <div className="flex items-center gap-4 text-sm font-semibold">
        <div>
          <Input
            className="rounded-lg border flex items-center  w-[250px]  placeholder:text-gray-400 placeholder:text-[12px]  relative pl-10 text-sm"
            placeholder="Search folders..."
          />
          <Search className="absolute top-[32px] ml-4 text-gray-400 size-4" />
        </div>
        <div className="font-extralight text-gray-300">|</div>
        {/* this is a server component and is already giving me a headaech */}
        {isAuthenticated && (
          <UserNav
            email={user?.email as string}
            name={user?.given_name as string}
            userImage={
              user?.picture ?? `https://avatar.vercel.sh/${user?.given_name}`
            }
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
