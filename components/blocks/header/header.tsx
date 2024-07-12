import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search, UploadCloud } from "lucide-react";

export const Header = () => {
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

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
