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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markFavoriteFilesAction } from "@/app/actions/actions";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";

interface FileProps {
  file: File;
}

export const IndividualFile = ({ file }: FileProps) => {
  const [addedToFav, setAddedToFav] = useState<boolean>(false);
  // truncating function
  function truncateTitle(title: string, wordLimit: number) {
    const words = title.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(` `) + `...`;
    }
    return title;
  }

  const longTitle = file.file_name as string;
  const truncatedTitle = truncateTitle(longTitle, 1);

  const file_id = file.file_id;

  // add to fav
  const { execute, isExecuting } = useAction(markFavoriteFilesAction, {
    onSuccess() {
      toast({
        description: "💚 file has been added to favorites",
      });
    },
    onError(error) {
      console.log("error", error);
      toast({
        variant: "destructive",
        description: "failed to add file to favs",
      });
    },
  });

  const hanldedAddToFav = () => {
    execute({ file_id });
    setAddedToFav(true);
  };

  return (
    <div>
      <div className="relative group overflow-hidden rounded-lg">
        <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
          <span className="sr-only">View</span>
        </Link>
        <Image
          src={file.file_path}
          alt="Image"
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
              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  onClick={() => hanldedAddToFav()}
                  disabled={isExecuting || addedToFav}
                >
                  <StarIcon
                    className={cn("h-4 w-4 mr-2", {
                      "text-red-600 animate-pulse": addedToFav,
                    })}
                  />
                  Add to favorites
                </Button>
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
