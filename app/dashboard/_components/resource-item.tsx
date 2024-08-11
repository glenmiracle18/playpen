import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  FolderIcon,
  BookmarkIcon,
  EllipsisVertical,
  FileWarning,
  StarIcon,
  Share,
} from "lucide-react";
import { markFavoriteFolderAction, shareFolder } from "@/app/actions/actions";
import { toast } from "@/components/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ShareFolderSheet } from "./shareFolder-sheet";

type ResourceItemProps = {
  name: string;
  url: string;
  folder_id: string;
};

export const ResourceItem = ({ name, url, folder_id }: ResourceItemProps) => {
  const [addedToFav, setAddedToFav] = useState<boolean>(false);
  const [isShared, setIsShared] = useState<boolean>(false);

  const { execute, isExecuting } = useAction(markFavoriteFolderAction, {
    onSuccess() {
      toast({
        description: "💚 folder has been added to favorites",
      });
    },
    onError(error) {
      console.log("error", error);
      toast({
        variant: "destructive",
        description: "failed to add folder to favs",
      });
    },
  });

  const hanldedAddToFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    execute({ folder_id });
    setAddedToFav(true);
  };

  const {
    execute: share,
    isExecuting: isSharing,
    result: sharedLink,
  } = useAction(shareFolder, {
    onSuccess() {
      console.log(sharedLink);
      toast({
        description: "💚 folder has been shared",
      });
    },
    onError(error) {
      console.log("error", error);
      toast({
        variant: "destructive",
        description: "failed to share folder",
      });
    },
  });

  const hanldedShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    share({ folderId: folder_id });
    setIsShared(true);
  };

  return (
    <div className="cursor-pointer p-2 gap-2 w-[280px] md:w-[350px]">
      <div className="hover:bg-gray-400/20 bg-gray-300/20 justify-center items-center py-4 px-2 rounded-xl">
        <div className="flex justify-between items-center px-4">
          <Link href={url} className="flex-grow">
            <span className="flex items-center gap-[8px]">
              <FolderIcon className="size-10 text-red-500 font-medium" />
              <div>
                <h1 className="font-medium text-sm text-black">{name}</h1>
                <h1 className="text-gray-300 text-xs">92MB</h1>
              </div>
            </span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.preventDefault()}>
              <Button
                variant="ghost"
                size="icon"
                className="bg-none text-black hover:text-red-600 transition-colors"
              >
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <BookmarkIcon className="h-4 w-4 mr-2" />
                Save
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Button
                  variant="ghost"
                  className="gap-2 items-center justify-start text-start"
                  onClick={hanldedAddToFav}
                >
                  <StarIcon
                    className={cn("h-4 w-4 mr-2", {
                      "text-red-600 animate-pulse": addedToFav,
                    })}
                  />
                  Add to favorites
                </Button>
              </DropdownMenuItem>

              {/* share folder sheet */}
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <ShareFolderSheet folder_id={folder_id} />
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <FileWarning className="h-4 w-4 mr-2" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
