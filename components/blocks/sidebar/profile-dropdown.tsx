import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronsUpDown,
  GitPullRequestDraft,
  HelpCircle,
  RotateCwSquare,
} from "lucide-react";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProfileDropdownProps {
  withMinimal?: boolean;
}

export function ProfileDropdown({ withMinimal }: ProfileDropdownProps) {
  return (
    <div className="w-full cursor-pointer flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <div className="border rounded-md w-full p-2 flex items-center justify-between">
            <div className="flex items-center">
              <Avatar
                className={cn(withMinimal ? `size-8` : `size-10`, `rounded-md`)}
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              {withMinimal ? null : (
                <div className="flex flex-col justify-between p-2 text-start">
                  <h1 className="text-sm">Glen Corp Team</h1>
                  <p className="text-gray-400 text-[12px]">
                    glen@glencorps.com
                  </p>
                </div>
              )}
            </div>
            {withMinimal ? null : (
              <ChevronsUpDown className="text-gray-500 font-ligh  size-4" />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          className={cn("p-2 flex flex-col ", {
            "items-center justify-center border-none shadow-none my-4  w-auto dark:bg-none bg-none":
              withMinimal,
          })}
        >
          <div className="flex items-center">
            <div className="bg-gray-100 flex justify-center items-center p-4 size-16 rounded-md text-gray-600">
              HR
            </div>

            {!withMinimal ? (
              <div className="flex flex-col justify-between p-2 text-start">
                <h1>Role Name</h1>
                <p className="text-gray-400">Roles</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <hr className="border-t border-gray-300 my-4 w-full" />
          <div className="flex flex-col gap-4">
            <Link className="flex gap-2" href="#">
              <HelpCircle size="20" />
              {!withMinimal ? <h1 className="text-sm">Team Support</h1> : ""}
            </Link>
            <Link className="flex gap-2" href="#">
              <GitPullRequestDraft />
              {!withMinimal ? <h1 className="text-sm">Request</h1> : ""}
            </Link>
            <Link className="flex gap-2 text-red-600" href="#">
              <RotateCwSquare />
              {!withMinimal ? <h1 className="text-sm">Switch Team</h1> : ""}
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
