import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
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
  Music2,
  StarIcon,
  Video,
  FileCog,
} from "lucide-react";
import { markFavoriteFilesAction } from "@/app/actions/actions";
import type { File } from "@prisma/client";

const WORD_LIMIT = 1;

enum FileType {
  Image = "image",
  PDF = "pdf",
  Video = "video",
  Audio = "audio",
  Other = "other",
}

const getFileType = (mimeType: string): FileType => {
  if (mimeType.startsWith("image/")) return FileType.Image;
  if (mimeType === "application/pdf") return FileType.PDF;
  if (mimeType.startsWith("video/")) return FileType.Video;
  if (mimeType.startsWith("audio/")) return FileType.Audio;
  return FileType.Other;
};

const FileContent = ({ file }: { file: File }) => {
  const fileType = getFileType(file.file_type);

  const commonClasses =
    "w-full aspect-square object-cover transition-all group-hover:scale-105";
  const iconContainerClasses =
    "flex items-center justify-center w-full h-full bg-gray-200";
  const iconClasses = "w-1/4 h-1/4"; // Adjust this value to change the icon size relative to the container

  switch (fileType) {
    case FileType.Image:
      return (
        <Image
          src={file.file_path}
          alt={file.file_name}
          width={300}
          height={300}
          className={commonClasses}
        />
      );
    case FileType.PDF:
      return (
        <div className={`${commonClasses} ${iconContainerClasses}`}>
          <FileCog className={`${iconClasses} text-red-500`} />
        </div>
      );
    case FileType.Video:
      return (
        <div className={`${commonClasses} ${iconContainerClasses}`}>
          <Video className={`${iconClasses} text-blue-500`} />
        </div>
      );
    case FileType.Audio:
      return (
        <div className={`${commonClasses} ${iconContainerClasses}`}>
          <Music2 className={`${iconClasses} text-green-500`} />
        </div>
      );
    default:
      return (
        <div className={`${commonClasses} ${iconContainerClasses}`}>
          <FileCog className={`${iconClasses} text-gray-500`} />
        </div>
      );
  }
};

const useFavoriteAction = (file_id: string) => {
  const { execute, isExecuting } = useAction(markFavoriteFilesAction, {
    onSuccess: () => {
      toast({ description: "💚 File has been added to favorites" });
    },
    onError: (error) => {
      console.error("Error adding file to favorites:", error);
      toast({
        variant: "destructive",
        description: "Failed to add file to favorites",
      });
    },
  });

  return { execute: () => execute({ file_id }), isExecuting };
};

const truncateTitle = (title: string, wordLimit: number) => {
  const words = title.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : title;
};

interface FileProps {
  file: File;
}

export const IndividualFile = ({ file }: FileProps) => {
  const [addedToFav, setAddedToFav] = useState(false);
  const { execute: addToFavorites, isExecuting } = useFavoriteAction(
    file.file_id,
  );

  const truncatedTitle = useMemo(
    () => truncateTitle(file.file_name, WORD_LIMIT),
    [file.file_name],
  );

  const handleAddToFav = () => {
    addToFavorites();
    setAddedToFav(true);
  };

  return (
    <div className="relative group overflow-hidden rounded-lg">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View</span>
      </Link>
      <FileContent file={file} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-all" />
      <div className="absolute top-2 right-2 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white transition-colors"
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
                onClick={handleAddToFav}
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
  );
};
