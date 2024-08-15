"use client";
import { useParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  getSharedFolderMetadataAction,
  getSharedFilesAction,
} from "@/app/actions/actions";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ResourceItem } from "@/app/dashboard/_components/resource-item";
import { IndividualFile } from "@/app/dashboard/_components/file";
import { SharedFolders } from "@/components/blocks/shared-folders";

const Shared = () => {
  const pathname = useParams();
  const publicId = `${pathname.publicId}`;

  const { execute, result, isExecuting, hasErrored } = useAction(
    getSharedFolderMetadataAction,
    {
      onSuccess() {
        console.log(result?.data);
      },
    },
  );

  useEffect(() => {
    execute({ publickLinkId: publicId });
  }, [publicId, execute]);

  const folder_id = result?.data?.folder_id;
  const files = result?.data?.files;
  console.log(files);

  // shared folders
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["shared", publicId, folder_id],
    queryFn: async () => {
      if (!folder_id) {
        throw new Error("Folder ID not available");
      }
      const result = await getSharedFilesAction({ folderId: folder_id });
      return result;
    },
    enabled: !!folder_id, // Only run the query when folder_id is available
    staleTime: 60000, // Data will be considered fresh for 1 minute
  });

  const fileCount = `${data?.data?.fileCount}`;
  const sizeInMB = `${data?.data?.totalSizeMB}`;

  if (isLoading || isExecuting) {
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="animate-pulse text-3xl">Loading...</h1>
      </div>
    );
  }

  if (isError || hasErrored) {
    return (
      <div>
        <h1>There was an error</h1>
        <p>{error?.message || "Unknown error occurred"}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-col min-h-screen bg-muted/40">
        <Header folderName={result?.data?.folder_name} />

        <main className="flex-1 container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-4 md:p-6">
          <Sidebar fileCount={fileCount} sizeInMB={sizeInMB} />
          <div className="">
            <div className="mt-4 grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-cols-1 ">
              {data?.data?.data.map((file, idx) => (
                <IndividualFile key={file.file_id} file={file} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const Header = ({ folderName }: { folderName: string }) => {
  return (
    <header className="bg-background border-b p-4 md:p-6">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{folderName}</h1>
            <p className="text-muted-foreground">
              Explore the images shared with you in this folder.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

const Sidebar = ({
  fileCount,
  sizeInMB,
}: {
  fileCount: string;
  sizeInMB: string;
}) => {
  return (
    <div className="bg-background rounded-lg p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Folder Details</h2>
        <div className="text-muted-foreground space-y-2">
          <p>
            <span className="font-medium">Total Files:</span> {fileCount}
          </p>
          <p>
            <span className="font-medium">Total Size:</span> {sizeInMB} MB
          </p>
          <p>
            <span className="font-medium">Folder Owner:</span>
          </p>
          <ul className="space-y-1">
            <li>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                  <AvatarFallback>GM</AvatarFallback>
                </Avatar>
                <div>Glen Miracle</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Shared;
