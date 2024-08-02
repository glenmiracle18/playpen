import { DropdownMenu } from "@/components/ui/dropdown-menu";
import type { File } from "@prisma/client";
import Link from "next/link";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  BookmarkIcon,
  EllipsisVertical,
  FileWarning,
  StarIcon,
} from "lucide-react";
import Image from "next/image";

interface FileProps {
  data: File;
}

export const IndividualFile = ({ data }: FileProps) => {
  // truncating function
  function truncateTitle(title: string, wordLimit: number) {
    const words = title.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return title;
  }

  const longTitle = `${data.file_name}`;
  const truncatedTitle = truncateTitle(longTitle, 1);

  return (
    <div>
      <div className="relative group overflow-hidden rounded-lg">
        <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
          <span className="sr-only">View</span>
        </Link>
        <Image
          src={data.file_path}
          alt="Image1"
          width={300}
          height={300}
          className="object-cover w-full aspect-square transition-all group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-all" />
        <div className="absolute top-2 right-2 z-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white  transition-colors"
              >
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <BookmarkIcon className="h-4 w-4 mr-2" />
                Save
              </DropdownMenuItem>
              <DropdownMenuItem>
                <StarIcon className="h-4 w-4 mr-2" />
                Add to favorites
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FileWarning className="h-4 w-4 mr-2" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-all">
          <h3 className="text-lg font-semibold text-white">{truncatedTitle}</h3>
        </div>
      </div>
    </div>
  );
};
